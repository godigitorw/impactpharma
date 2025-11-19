import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import AboutServicesContainer from "@/components/AboutServicesContainer";
import ProductCategories from "@/components/ProductCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ClientLogos />
      <AboutServicesContainer />
      <ProductCategories />
      <WhyChooseUs />
      <CTASection />

      {/* Other sections will be added here */}
    </main>
  );
}
