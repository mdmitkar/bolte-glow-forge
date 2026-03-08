import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />

      {/* Animated floating shapes */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -left-20 top-10 h-40 w-40 rounded-full border border-primary/10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -right-10 bottom-10 h-60 w-60 rounded-full border border-accent/10"
      />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
          >
            <Sparkles className="h-8 w-8 text-primary" />
          </motion.div>

          <h2 className="font-display text-4xl font-bold text-foreground md:text-6xl">
            Get <span className="text-glow text-primary">Exclusive</span> Drops
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Be the first to know about new arrivals, flash sales, and exclusive offers. Join the Bolte family.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex gap-3 sm:flex-row flex-col"
          >
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 rounded-xl border border-border bg-card px-6 py-4 font-body text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground"
            >
              <Send className="h-4 w-4" /> Subscribe
            </motion.button>
          </motion.div>

          <p className="mt-4 text-xs text-muted-foreground">
            Join 2,000+ sneakerheads. No spam, only fire drops 🔥
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
