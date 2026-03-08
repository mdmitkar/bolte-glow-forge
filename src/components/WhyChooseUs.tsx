import { motion } from "framer-motion";
import { Truck, Shield, Headphones, CreditCard, RefreshCw, Award } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Delivery", desc: "Free shipping on orders above ₹999" },
  { icon: Shield, title: "Quality Assured", desc: "100% genuine products guaranteed" },
  { icon: Headphones, title: "24/7 Support", desc: "Call Chirag anytime for assistance" },
  { icon: CreditCard, title: "Easy Payments", desc: "Cash, UPI, and card accepted" },
  { icon: RefreshCw, title: "Easy Returns", desc: "7-day hassle-free return policy" },
  { icon: Award, title: "Best Prices", desc: "Unbeatable prices in Bhiwandi" },
];

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-primary">Why Us</p>
          <h2 className="font-display text-5xl font-bold text-foreground md:text-7xl">
            Why Choose <span className="text-primary">Bolte</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group relative overflow-hidden rounded-2xl gradient-card border border-border p-8 text-center transition-all duration-500 hover:border-primary/50"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />

              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
              >
                <f.icon className="h-7 w-7" />
              </motion.div>

              <h3 className="relative font-display text-xl font-semibold text-foreground">{f.title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{f.desc}</p>

              <motion.div
                className="mx-auto mt-4 h-0.5 w-12 bg-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
