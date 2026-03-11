import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreLocation from "@/components/StoreLocation";
import FAQ from "@/components/FAQ";
import PageTransition from "@/components/PageTransition";
import ScrollToTop from "@/components/ScrollToTop";

const Store = () => {
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
                Our <span className="text-gradient">Store</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Visit us in person to experience the premium quality of Dyna Shoes. We're here to help you find the perfect pair.
              </p>
            </motion.div>
          </div>

          <StoreLocation />
          
          <div className="mt-20">
            <FAQ />
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Store;
