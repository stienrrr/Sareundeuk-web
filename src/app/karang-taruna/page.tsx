import BackToDashboard from "@/components/layout/BackToDashboard";
import OrganizationProfile from "@/components/sections/OrganizationProfile";

export default function OrganizationProfilePage() {
  return (
    <main className="min-h-screen">
      <div className="bg-primary-charcoal px-5 pt-8 text-warm-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <BackToDashboard />
        </div>
      </div>
      <OrganizationProfile />
    </main>
  );
}
