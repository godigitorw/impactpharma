import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import AboutServicesContainer from "@/components/AboutServicesContainer";
import ProductCategories from "@/components/ProductCategories";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ClientLogos />
      <AboutServicesContainer />
      <ProductCategories />

      {/* Other sections will be added here */}
    </main>
  );
}
