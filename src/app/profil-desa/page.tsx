import BackToDashboard from "@/components/layout/BackToDashboard";
import VillageProfile from "@/components/sections/VillageProfile";

export default function VillageProfilePage() {
  return (
    <main className="min-h-screen">
      <div className="bg-warm-white px-5 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <BackToDashboard />
        </div>
      </div>
      <VillageProfile />
    </main>
  );
}
