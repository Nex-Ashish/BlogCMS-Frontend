import AboutHero from "../../../../components/Card/AboutHero";
import CTASection from "../../../../components/Card/CTASection";
import TeamSection from "../../../../components/Card/TeamSection";

export default function About() {
  return (
    <div className="bg-white text-slate-800">
      <AboutHero />
      <TeamSection />
      {/* <CTASection /> */}
    </div>
  )
}