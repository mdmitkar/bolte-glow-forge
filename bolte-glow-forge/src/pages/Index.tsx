import ScrollChapterDots from "@/components/ScrollChapterDots";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import TrustBanner from "@/components/TrustBanner";
import BrandsStrip from "@/components/BrandsStrip";
import FeaturedCollection from "@/components/FeaturedCollection";
import PromoGrid from "@/components/PromoGrid";
import TrendingNow from "@/components/TrendingNow";
import NewArrivals from "@/components/NewArrivals";
import HowItWorks from "@/components/HowItWorks";
import EnhancedParallaxSection from "@/components/EnhancedParallaxSection";
import DealsSection from "@/components/DealsSection";
import SneakerExplosion from "@/components/SneakerExplosion";
import ProductShowcase from "@/components/ProductShowcase";
import StaffPicks from "@/components/StaffPicks";
import SizeGuide from "@/components/SizeGuide";
import ScrollRevealStats from "@/components/ScrollRevealStats";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FullWidthCTA from "@/components/FullWidthCTA";
import AboutBrand from "@/components/AboutBrand";
import StoreLocation from "@/components/StoreLocation";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import InstagramGallery from "@/components/InstagramGallery";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
      <ScrollChapterDots />
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <TrustBanner />
      <BrandsStrip />
      <FeaturedCollection />
      <SectionDivider variant="gradient" />
      <PromoGrid />
      <TrendingNow />
      <SectionDivider variant="pattern" />
      <NewArrivals />
      <HowItWorks />
      <EnhancedParallaxSection />
      <DealsSection />
      <SneakerExplosion />
      <ProductShowcase />
      <SectionDivider variant="dots" />
      <StaffPicks />
      <SizeGuide />
      <ScrollRevealStats />
      <WhyChooseUs />
      <SectionDivider variant="gradient" />
      <Testimonials />
      <FullWidthCTA />
      <AboutBrand />
      <StoreLocation />
      <FAQ />
      <Newsletter />
      <SectionDivider variant="pattern" />
      <InstagramGallery />
      <Footer />
    </div>
    </PageTransition>
  );
};

export default Index;
