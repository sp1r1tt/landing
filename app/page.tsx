import Header from "@/components/header"
import Hero from "@/components/hero"
import PlayerSection from "@/components/player-section"
import HowToPurchase from "@/components/how-to-purchase"
import BeatLicenses from "@/components/beat-licenses"
import PricingTable from "@/components/pricing-table"
import Features from "@/components/features"
import FAQ from "@/components/faq"
import About from "@/components/about"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pb-[120px] sm:pb-[88px]">
        <Hero />
        <PlayerSection />
        <HowToPurchase />
        <BeatLicenses />
        <PricingTable />
        <Features />
        <FAQ />
        <About />
        <Footer />
      </main>
    </div>
  )
}

