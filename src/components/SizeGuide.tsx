import { motion } from "framer-motion";
import { Ruler } from "lucide-react";

const sizes = [6, 7, 8, 9, 10, 11, 12];

const SizeGuide = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl rounded-3xl gradient-card border border-border p-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Ruler className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h3 className="font-display text-3xl font-bold text-foreground">Find Your Perfect Fit</h3>
            <p className="mt-2 text-sm text-muted-foreground">Available sizes — tap to check stock</p>
          </motion.div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {sizes.map((size, i) => (
              <motion.button
                key={size}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-14 w-14 items-center justify-center rounded-xl border border-border font-display text-lg font-bold text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                {size}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SizeGuide;
