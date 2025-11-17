import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";

export default function AboutServicesContainer() {
  return (
    <div className="bg-gradient-to-br from-primary-50 via-blue-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(27,167,212,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(102,209,231,0.08),transparent_40%)]"></div>

      <div className="relative z-10">
        <AboutSection />
        <ServicesSection />
      </div>
    </div>
  );
}
