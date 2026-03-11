import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutBrand from "@/components/AboutBrand";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import PageTransition from "@/components/PageTransition";
import ScrollToTop from "@/components/ScrollToTop";

const About = () => {
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
                Our <span className="text-gradient">Story</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We are more than just a shoe store. We are a community built around the love for street culture, comfort, and premium quality.
              </p>
            </motion.div>
          </div>

          <AboutBrand />
          
          <div className="py-12 bg-muted/30">
            <WhyChooseUs />
          </div>
          
          <div className="py-12">
            <Testimonials />
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;
