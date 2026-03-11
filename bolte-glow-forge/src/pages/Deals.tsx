import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DealsSection from "@/components/DealsSection";
import PromoGrid from "@/components/PromoGrid";
import PageTransition from "@/components/PageTransition";
import ScrollToTop from "@/components/ScrollToTop";

const Deals = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <ScrollToTop />
        <Navbar />
        
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                Exclusive <span className="text-gradient">Deals</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Discover our best offers on premium kicks. Unbeatable prices for unbeatable style.
              </p>
            </motion.div>
          </div>

          <DealsSection />
          
          <div className="mt-20">
            <PromoGrid />
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Deals;
