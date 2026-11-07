import Link from "next/link";

export default function BackToDashboard() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary-charcoal px-5 py-2.5 font-semibold text-warm-white transition-colors hover:bg-primary-charcoal/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-yellow"
    >
      <span aria-hidden="true" className="mr-2">
        ←
      </span>
      Kembali ke Dashboard
    </Link>
  );
}
