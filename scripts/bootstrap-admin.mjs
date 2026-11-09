import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const BOOTSTRAP_ENV_PATH = new URL("../.env.bootstrap.local", import.meta.url);
const APP_ENV_PATH = new URL("../.env.local", import.meta.url);
const ADMIN_EMAIL = "siti@login.sareundeuk.invalid";
const ADMIN_USERNAME = "siti";
const ADMIN_FULL_NAME = "Siti Nurhasanah";
const ADMIN_PROFILE_ROLE = "admin";
const ADMIN_AUTH_ROLE = "admin_utama";

function parseBootstrapEnv(contents) {
  const values = {};
  const supportedKeys = new Set([
    "SUPABASE_URL",
    "SUPABASE_SECRET_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
  ]);

  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!match || !supportedKeys.has(match[1])) continue;

    let value = match[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[match[1]] = value;
  }

  return values;
}

async function loadConfig() {
  let bootstrapContents;
  let appEnvContents;
  try {
    [bootstrapContents, appEnvContents] = await Promise.all([
      readFile(BOOTSTRAP_ENV_PATH, "utf8"),
      readFile(APP_ENV_PATH, "utf8"),
    ]);
  } catch {
    throw new Error(
      "Tidak dapat membaca .env.bootstrap.local atau .env.local. Pastikan keduanya tersedia secara lokal.",
    );
  }

  const values = parseBootstrapEnv(bootstrapContents);
  const appValues = parseBootstrapEnv(appEnvContents);
  const configuredUrl = validateProjectUrl(values.SUPABASE_URL);
  const appUrl = validateProjectUrl(appValues.NEXT_PUBLIC_SUPABASE_URL);

  if (configuredUrl.origin !== appUrl.origin) {
    throw new Error(
      "SUPABASE_URL di .env.bootstrap.local tidak sama dengan URL proyek di .env.local. Secret key tidak digunakan.",
    );
  }

  const secretKeys = [
    values.SUPABASE_SECRET_KEY,
    values.SUPABASE_SERVICE_ROLE_KEY,
  ].filter(Boolean);

  if (secretKeys.length !== 1) {
    throw new Error(
      ".env.bootstrap.local harus berisi tepat satu dari SUPABASE_SECRET_KEY atau SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return {
    supabaseUrl: configuredUrl.origin,
    secretKey: secretKeys[0],
  };
}

function validateProjectUrl(value) {
  if (!value) {
    throw new Error("URL proyek Supabase tidak ditemukan; secret key tidak digunakan.");
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(value);
  } catch {
    throw new Error("URL proyek Supabase tidak valid; secret key tidak digunakan.");
  }

  if (
    parsedUrl.protocol !== "https:" ||
    !parsedUrl.hostname ||
    parsedUrl.username ||
    parsedUrl.password ||
    parsedUrl.pathname !== "/" ||
    parsedUrl.search ||
    parsedUrl.hash
  ) {
    throw new Error("URL harus berupa origin HTTPS proyek Supabase; secret key tidak digunakan.");
  }

  return parsedUrl;
}

async function readEnvUrl(filePath, variableName) {
  const contents = await readFile(filePath, "utf8");
  let result = null;

  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!match || match[1] !== variableName) continue;

    let value = match[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    result = value;
  }

  return result;
}

async function runDnsCompare() {
  let configuredUrl;
  let appUrl;

  try {
    [configuredUrl, appUrl] = await Promise.all([
      readEnvUrl(BOOTSTRAP_ENV_PATH, "SUPABASE_URL"),
      readEnvUrl(APP_ENV_PATH, "NEXT_PUBLIC_SUPABASE_URL"),
    ]);
    configuredUrl = validateProjectUrl(configuredUrl);
    appUrl = validateProjectUrl(appUrl);
    if (configuredUrl.origin !== appUrl.origin) throw new Error("Origin mismatch");
  } catch {
    console.log("Hostname sama: tidak dapat ditentukan.");
    console.log("Lookup konfigurasi: gagal; jumlah alamat: tidak tersedia.");
    console.log("Lookup skrip: gagal; jumlah alamat: tidak tersedia.");
    process.exitCode = 1;
    return;
  }

  const requestUrl = new URL("auth/v1/admin/users", `${configuredUrl.origin}/`);
  requestUrl.searchParams.set("page", "1");
  requestUrl.searchParams.set("per_page", "1");
  const configuredHostname = configuredUrl.hostname;
  const requestHostname = requestUrl.hostname;

  let lookup;
  try {
    ({ lookup } = await import("node:dns/promises"));
  } catch {
    console.log(`Hostname sama: ${configuredHostname === requestHostname ? "ya" : "tidak"}.`);
    console.log("Lookup konfigurasi: gagal; jumlah alamat: tidak tersedia.");
    console.log("Lookup skrip: gagal; jumlah alamat: tidak tersedia.");
    process.exitCode = 1;
    return;
  }

  const lookupResult = async (hostname) => {
    try {
      const addresses = await lookup(hostname, { all: true });
      return { status: "berhasil", count: addresses.length };
    } catch {
      return { status: "gagal", count: "tidak tersedia" };
    }
  };

  const configuredResult = await lookupResult(configuredHostname);
  const requestResult = await lookupResult(requestHostname);

  console.log(`Hostname sama: ${configuredHostname === requestHostname ? "ya" : "tidak"}.`);
  console.log(
    `Lookup konfigurasi: ${configuredResult.status}; jumlah alamat: ${configuredResult.count}.`,
  );
  console.log(
    `Lookup skrip: ${requestResult.status}; jumlah alamat: ${requestResult.count}.`,
  );
  if (configuredResult.status === "gagal" || requestResult.status === "gagal") {
    process.exitCode = 1;
  }
}

function safeErrorName(error) {
  return typeof error?.name === "string" && /^[A-Za-z][A-Za-z0-9]{0,63}$/.test(error.name)
    ? error.name
    : "UnknownError";
}

function safeNetworkCauseCode(error) {
  const allowedCodes = new Set([
    "ENOTFOUND",
    "ECONNRESET",
    "ETIMEDOUT",
    "ECONNREFUSED",
    "EAI_AGAIN",
    "CERT_HAS_EXPIRED",
    "ERR_TLS_CERT_ALTNAME_INVALID",
  ]);
  const cause = error?.cause;
  const candidates = [cause?.code, cause?.errno];

  return candidates.find(
    (code) => typeof code === "string" && allowedCodes.has(code),
  ) ?? "tidak tersedia";
}

function safeHttpStatus(error) {
  return typeof error?.status === "number" &&
    Number.isInteger(error.status) &&
    error.status >= 100 &&
    error.status <= 599
    ? String(error.status)
    : "tidak tersedia";
}

function safeErrorDetails(error, page) {
  const safePage = Number.isInteger(page) && page >= 1 ? String(page) : "tidak tersedia";
  return `nama: ${safeErrorName(error)}, status HTTP: ${safeHttpStatus(error)}, kode jaringan: ${safeNetworkCauseCode(error)}, halaman: ${safePage}`;
}

function createAdminClient(supabaseUrl, secretKey) {
  const allowedNetworkCodes = new Set([
    "ENOTFOUND",
    "ECONNRESET",
    "ETIMEDOUT",
    "ECONNREFUSED",
    "EAI_AGAIN",
    "CERT_HAS_EXPIRED",
    "ERR_TLS_CERT_ALTNAME_INVALID",
  ]);

  const diagnosticFetch = async (...args) => {
    try {
      return await globalThis.fetch(...args);
    } catch (error) {
      const cause = error?.cause;
      const networkCode = [cause?.code, cause?.errno].find(
        (code) => typeof code === "string" && allowedNetworkCodes.has(code),
      );
      console.error(`Fetch bootstrap gagal; kode jaringan: ${networkCode ?? "tidak tersedia"}.`);
      throw error;
    }
  };

  return createClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: diagnosticFetch,
    },
  });
}

async function findAuthUserByEmail(supabase) {
  const perPage = 100;
  const maxPages = 100;

  for (let page = 1; page <= maxPages; page += 1) {
    let result;
    try {
      result = await supabase.auth.admin.listUsers({
        page,
        perPage,
      });
    } catch (error) {
      throw new Error(
        `Tidak dapat memeriksa Auth users (${safeErrorDetails(error, page)}).`,
      );
    }

    const { data, error } = result;

    if (error) {
      throw new Error(
        `Tidak dapat memeriksa Auth users (${safeErrorDetails(error, page)}).`,
      );
    }

    const existingUser = data.users.find(
      (user) => user.email?.toLowerCase() === ADMIN_EMAIL,
    );
    if (existingUser) return existingUser;
    if (data.users.length < perPage) return null;
  }

  throw new Error(
    `Pemeriksaan Auth mencapai batas ${maxPages} halaman. Tidak dapat memastikan akun belum ada; tidak ada perubahan yang dilakukan.`,
  );
}

async function findProfileByUsername(supabase) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, role")
    .ilike("username", ADMIN_USERNAME)
    .maybeSingle();

  if (error) {
    throw new Error(`Tidak dapat memeriksa profiles (kode: ${safeErrorCode(error)}).`);
  }

  return data;
}

async function inspectExistingRecords(supabase) {
  const [authUser, profile] = await Promise.all([
    findAuthUserByEmail(supabase),
    findProfileByUsername(supabase),
  ]);

  return { authUser, profile };
}

function reportCheckResult({ authUser, profile }) {
  if (!authUser && !profile) {
    console.log("Auth user dan profil siti belum ditemukan; mode --check tidak mengubah data.");
    return;
  }

  const authMatches =
    authUser?.email?.toLowerCase() === ADMIN_EMAIL &&
    authUser?.app_metadata?.role === ADMIN_AUTH_ROLE;
  const profileMatches =
    profile?.id === authUser?.id &&
    profile?.username === ADMIN_USERNAME &&
    profile?.full_name === ADMIN_FULL_NAME &&
    profile?.role === ADMIN_PROFILE_ROLE;

  if (authMatches && profileMatches) {
    console.log("Auth email, app_metadata.role, UUID, dan seluruh field profil sesuai.");
    console.log("Mode --check selesai; tidak ada data yang diubah.");
    return;
  }

  console.error(
    "Auth user atau profil ditemukan tetapi email, role, UUID, username, nama, atau role profil tidak cocok. Tidak ada data yang diubah.",
  );
  process.exitCode = 1;
}

function promptHidden(label) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error("Prompt password tersembunyi memerlukan terminal interaktif.");
  }

  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    let value = "";
    let settled = false;

    const cleanup = () => {
      stdin.removeListener("data", onData);
      stdin.removeListener("end", onEnd);
      if (stdin.isRaw) stdin.setRawMode(false);
      stdin.pause();
      process.stdout.write("\n");
    };

    const finish = (error) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (error) reject(error);
      else resolve(value);
    };

    const onEnd = () => finish(new Error("Input password dihentikan."));

    const onData = (chunk) => {
      for (const character of chunk.toString("utf8")) {
        if (character === "\u0003") {
          finish(new Error("Bootstrap dibatalkan."));
          return;
        }

        if (character === "\r" || character === "\n") {
          finish();
          return;
        }

        if (character === "\u007f" || character === "\b") {
          value = Array.from(value).slice(0, -1).join("");
        } else if (character >= " ") {
          value += character;
        }
      }
    };

    process.stdout.write(label);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("data", onData);
    stdin.on("end", onEnd);
  });
}

async function ensureProfile(supabase, authUserId) {
  const { data: existingProfile, error: profileLookupError } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("id", authUserId)
    .maybeSingle();

  if (profileLookupError) {
    throw new Error(`Auth berhasil, tetapi profil tidak dapat diperiksa (kode: ${safeErrorCode(profileLookupError)}).`);
  }

  const profileValues = {
    username: ADMIN_USERNAME,
    full_name: ADMIN_FULL_NAME,
    role: ADMIN_PROFILE_ROLE,
  };

  if (existingProfile) {
    if (
      existingProfile.username &&
      existingProfile.username.toLowerCase() !== ADMIN_USERNAME
    ) {
      throw new Error("Auth berhasil, tetapi trigger membuat profil dengan username yang berbeda.");
    }

    const { error } = await supabase
      .from("profiles")
      .update(profileValues)
      .eq("id", authUserId);

    if (error) {
      throw new Error(`Auth berhasil, tetapi profil otomatis gagal diselaraskan (kode: ${safeErrorCode(error)}).`);
    }
  } else {
    const { error } = await supabase
      .from("profiles")
      .insert({ id: authUserId, ...profileValues });

    if (error) {
      throw new Error(`Auth berhasil, tetapi profil gagal dibuat (kode: ${safeErrorCode(error)}).`);
    }
  }

  const { data: verifiedProfile, error: verificationError } = await supabase
    .from("profiles")
    .select("id, username, full_name, role")
    .eq("id", authUserId)
    .maybeSingle();

  if (verificationError) {
    throw new Error(`Auth berhasil, tetapi profil tidak dapat diverifikasi (kode: ${safeErrorCode(verificationError)}).`);
  }

  if (
    !verifiedProfile ||
    verifiedProfile.id !== authUserId ||
    verifiedProfile.username !== ADMIN_USERNAME ||
    verifiedProfile.full_name !== ADMIN_FULL_NAME ||
    verifiedProfile.role !== ADMIN_PROFILE_ROLE
  ) {
    throw new Error("Auth berhasil, tetapi profil tersimpan tidak sesuai dengan data bootstrap.");
  }

  return existingProfile
    ? "profil otomatis diverifikasi dan diselaraskan"
    : "profil dibuat dan diverifikasi";
}

async function runCheck(supabase) {
  const records = await inspectExistingRecords(supabase);
  reportCheckResult(records);
  console.log(
    "Mode --check hanya membaca Auth dan profiles. Pemeriksaan trigger auth.users dilakukan terpisah melalui prosedur SQL read-only.",
  );
}

async function runAdminApiDiagnostic(supabase) {
  try {
    const { error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1 });

    if (error) {
      console.error(
        `Diagnostik Admin API: gagal; status HTTP: ${safeHttpStatus(error)}; nama error: ${safeErrorName(error)}; kode jaringan: ${safeNetworkCauseCode(error)}.`,
      );
      process.exitCode = 1;
      return;
    }

    console.log("Diagnostik Admin API: berhasil.");
  } catch (error) {
    console.error(
      `Diagnostik Admin API: gagal; status HTTP: ${safeHttpStatus(error)}; nama error: ${safeErrorName(error)}; kode jaringan: ${safeNetworkCauseCode(error)}.`,
    );
    process.exitCode = 1;
  }
}

async function runDirectAdminFetchDiagnostic(supabaseUrl, secretKey) {
  const allowedNetworkCodes = new Set([
    "ENOTFOUND",
    "ECONNRESET",
    "ETIMEDOUT",
    "ECONNREFUSED",
    "EAI_AGAIN",
    "CERT_HAS_EXPIRED",
    "ERR_TLS_CERT_ALTNAME_INVALID",
  ]);
  const allowedSyscalls = new Set([
    "connect",
    "getaddrinfo",
    "getnameinfo",
    "lookup",
    "queryA",
    "queryAaaa",
    "read",
    "write",
  ]);
  const getSafeCauseDetails = (error) => {
    let current = error;
    let code = "tidak tersedia";
    let syscall = "tidak tersedia";
    let family = "tidak tersedia";
    const visited = new Set();

    for (let depth = 0; current && depth < 6; depth += 1) {
      if ((typeof current !== "object" && typeof current !== "function") || visited.has(current)) {
        break;
      }
      visited.add(current);

      if (code === "tidak tersedia") {
        for (const candidate of [current.code, current.errno]) {
          if (typeof candidate === "string" && allowedNetworkCodes.has(candidate)) {
            code = candidate;
            break;
          }
        }
      }
      if (syscall === "tidak tersedia" && allowedSyscalls.has(current.syscall)) {
        syscall = current.syscall;
      }
      if (family === "tidak tersedia" && (current.family === 4 || current.family === 6)) {
        family = String(current.family);
      }
      current = current.cause;
    }

    return { code, syscall, family };
  };

  let projectOrigin;
  let requestUrl;

  try {
    projectOrigin = new URL(supabaseUrl).origin;
    requestUrl = new URL("auth/v1/admin/users", `${projectOrigin}/`);
    requestUrl.searchParams.set("page", "1");
    requestUrl.searchParams.set("per_page", "1");

    if (requestUrl.origin !== projectOrigin) {
      throw new Error("Origin mismatch");
    }
  } catch {
    console.error(
      "Diagnostik fetch langsung: gagal; status HTTP: tidak tersedia; nama error: OriginValidationError; kode jaringan: tidak tersedia.",
    );
    process.exitCode = 1;
    return;
  }

  let headers;
  try {
    headers = new Headers({
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`,
    });
  } catch (error) {
    const details = getSafeCauseDetails(error);
    console.error(
      `Diagnostik fetch langsung: gagal; status HTTP: ${safeHttpStatus(error)}; nama error: ${safeErrorName(error)}; kode jaringan: ${details.code}; syscall: ${details.syscall}; family: ${details.family}.`,
    );
    process.exitCode = 1;
    return;
  }

  let response;
  try {
    response = await globalThis.fetch(requestUrl, {
      method: "GET",
      headers,
      redirect: "manual",
    });
  } catch (error) {
    const details = getSafeCauseDetails(error);
    console.error(
      `Diagnostik fetch langsung: gagal; status HTTP: ${safeHttpStatus(error)}; nama error: ${safeErrorName(error)}; kode jaringan: ${details.code}; syscall: ${details.syscall}; family: ${details.family}.`,
    );
    process.exitCode = 1;
    return;
  }

  try {
    await response.body?.cancel();
  } catch {
    // Body tidak dibaca; kegagalan membatalkannya tidak mengubah hasil HTTP.
  }

  if (response.type === "opaqueredirect" || (response.status >= 300 && response.status < 400)) {
    console.error(
      `Diagnostik fetch langsung: gagal; status HTTP: ${safeHttpStatus(response)}; nama error: RedirectResponseError; kode jaringan: tidak tersedia.`,
    );
    process.exitCode = 1;
    return;
  }

  if (response.ok) {
    console.log(`Diagnostik fetch langsung: berhasil; status HTTP: ${safeHttpStatus(response)}.`);
    return;
  }

  console.error(
    `Diagnostik fetch langsung: gagal; status HTTP: ${safeHttpStatus(response)}; nama error: HttpResponseError; kode jaringan: tidak tersedia.`,
  );
  process.exitCode = 1;
}

async function runBootstrap(supabase) {
  const records = await inspectExistingRecords(supabase);

  if (records.authUser || records.profile) {
    throw new Error(
      "Auth user atau profil siti sudah ada. Skrip tidak menimpa atau membuat ulang akun.",
    );
  }

  let password = "";
  let passwordConfirmation = "";
  let createResult;

  try {
    password = await promptHidden("Password admin (input tersembunyi): ");
    passwordConfirmation = await promptHidden("Ulangi password admin: ");

    if (!password || password !== passwordConfirmation) {
      throw new Error("Password kosong atau kedua input tidak cocok. Tidak ada akun yang dibuat.");
    }

    try {
      createResult = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password,
        email_confirm: true,
        app_metadata: {
          role: ADMIN_AUTH_ROLE,
        },
      });
    } catch {
      throw new Error(
        "Auth API tidak mengonfirmasi hasil pembuatan. Periksa Auth users sebelum mencoba lagi; skrip tidak mengulang permintaan dan belum mengubah profil.",
      );
    }
  } finally {
    // Mengurangi masa hidup referensi string. JavaScript tidak menjamin
    // penghapusan isi string dari memori; nilainya tidak pernah dicetak/disimpan.
    password = "";
    passwordConfirmation = "";
  }

  const { data, error } = createResult;

  if (error || !data?.user) {
    throw new Error(
      `Auth API tidak mengonfirmasi user baru (kode: ${safeErrorCode(error)}). Periksa Auth users sebelum mencoba lagi; skrip tidak mengubah profil.`,
    );
  }

  const authUserId = data.user.id;

  try {
    const profileResult = await ensureProfile(supabase, authUserId);
    console.log(`Bootstrap admin selesai: ${profileResult}.`);
    console.log(`UUID Auth: ${authUserId}`);
  } catch (error) {
    console.error("Auth user sudah dibuat, tetapi profil belum siap.");
    console.error(`UUID Auth: ${authUserId}`);
    console.error(
      "Jangan jalankan ulang bootstrap dan jangan hapus user Auth. Periksa trigger serta profiles berdasarkan UUID ini, lalu perbaiki profil yang sama dengan role legacy 'admin'.",
    );
    console.error(error instanceof Error ? error.message : "Penyebab profil tidak diketahui.");
    process.exitCode = 1;
  }
}

async function reportNodeEnvironment() {
  console.log(`process.version: ${process.version}`);
  console.log(`process.execPath: ${process.execPath}`);
  console.log(`process.cwd(): ${process.cwd()}`);

  try {
    const dns = await import("node:dns");
    console.log(`DNS server count: ${dns.getServers().length}`);
    console.log(`DNS default result order: ${dns.getDefaultResultOrder()}`);
  } catch {
    console.log("DNS server count: tidak tersedia");
    console.log("DNS default result order: tidak tersedia");
  }

  const environmentNames = [
    "HTTP_PROXY",
    "HTTPS_PROXY",
    "ALL_PROXY",
    "NO_PROXY",
    "http_proxy",
    "https_proxy",
    "all_proxy",
    "no_proxy",
    "NODE_USE_ENV_PROXY",
    "NODE_OPTIONS",
    "NODE_EXTRA_CA_CERTS",
    "SSL_CERT_FILE",
    "SSL_CERT_DIR",
    "NODE_TLS_REJECT_UNAUTHORIZED",
    "npm_config_proxy",
    "npm_config_https_proxy",
  ];

  for (const name of environmentNames) {
    console.log(`${name}: ${Object.hasOwn(process.env, name) ? "tersedia" : "tidak tersedia"}`);
  }

  const hasProxyFlag = (args) =>
    args.some((arg) => arg === "--use-env-proxy" || arg.startsWith("--use-env-proxy="));
  const nodeOptions = process.env.NODE_OPTIONS ?? "";
  const optionsHaveProxyFlag = /(?:^|\s)--use-env-proxy(?:\s|=|$)/.test(nodeOptions);
  const hasPreloadFlag = (args) =>
    args.some((arg) =>
      arg === "-r" || arg === "--require" || arg === "--import" ||
      arg.startsWith("--require=") || arg.startsWith("--import="),
    );
  const optionsHavePreloadFlag = /(?:^|\s)(?:-r|--require|--import)(?:\s|=|$)/.test(nodeOptions);

  console.log(
    `Flag proxy pada argumen Node: ${hasProxyFlag(process.execArgv) || optionsHaveProxyFlag ? "terdeteksi" : "tidak terdeteksi"}`,
  );
  console.log(
    `Flag preload pada argumen Node: ${hasPreloadFlag(process.execArgv) || optionsHavePreloadFlag ? "terdeteksi" : "tidak terdeteksi"}`,
  );
}

async function main() {
  const args = process.argv.slice(2);
  const diagnoseDnsCompare = args.length === 1 && args[0] === "--diagnose-dns-compare";
  const diagnoseNodeEnvironment = args.length === 1 && args[0] === "--diagnose-node-environment";
  const checkOnly = args.length === 1 && args[0] === "--check";
  const diagnoseAdminApi = args.length === 1 && args[0] === "--diagnose-admin-api";
  const diagnoseAdminFetch = args.length === 1 && args[0] === "--diagnose-admin-fetch";
  const triggerChecked = args.length === 1 && args[0] === "--trigger-checked";

  if (
    !diagnoseDnsCompare && !diagnoseNodeEnvironment && !checkOnly && !diagnoseAdminApi &&
    !diagnoseAdminFetch && !triggerChecked
  ) {
    throw new Error(
      "Bootstrap memerlukan pemeriksaan trigger read-only terlebih dahulu. Jalankan prosedur pemeriksaan trigger, lalu gunakan --trigger-checked. Gunakan --check untuk pemeriksaan akun read-only.",
    );
  }

  if (diagnoseDnsCompare) {
    await runDnsCompare();
    return;
  }

  if (diagnoseNodeEnvironment) {
    await reportNodeEnvironment();
    return;
  }

  let config;
  try {
    config = await loadConfig();
  } catch (error) {
    if (!diagnoseAdminFetch) throw error;

    console.error(
      `Diagnostik fetch langsung: gagal; status HTTP: ${safeHttpStatus(error)}; nama error: ${safeErrorName(error)}; kode jaringan: ${safeNetworkCauseCode(error)}.`,
    );
    process.exitCode = 1;
    return;
  }

  const { supabaseUrl, secretKey } = config;
  if (diagnoseAdminFetch) {
    await runDirectAdminFetchDiagnostic(supabaseUrl, secretKey);
    return;
  }

  const supabase = createAdminClient(supabaseUrl, secretKey);

  if (checkOnly) await runCheck(supabase);
  else if (diagnoseAdminApi) await runAdminApiDiagnostic(supabase);
  else await runBootstrap(supabase);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Bootstrap gagal.");
  process.exitCode = 1;
});
