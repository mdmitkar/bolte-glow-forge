import { motion } from "framer-motion";
import { useRef } from "react";
import { Clock, Flame, ArrowRight } from "lucide-react";
import sneaker1 from "@/assets/sneaker-1.png";
import sneaker2 from "@/assets/sneaker-2.png";
import sneaker3 from "@/assets/sneaker-3.png";
import sneaker4 from "@/assets/sneaker-4.png";

const arrivals = [
  { name: "Blaze Runner 2026", price: "₹2,499", oldPrice: "₹3,199", img: sneaker1, badge: "Just Dropped" },
  { name: "Phantom High", price: "₹1,899", oldPrice: "₹2,499", img: sneaker2, badge: "Exclusive" },
  { name: "Volt Surge Pro", price: "₹2,199", oldPrice: "₹2,899", img: sneaker3, badge: "Limited" },
  { name: "Shadow Drift X", price: "₹1,699", oldPrice: "₹2,199", img: sneaker4, badge: "Trending" },
];

const NewArrivals = () => {
  const ref = useRef(null);

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      {/* Animated bg pulse */}
      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5"
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-16 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary">Fresh Drops</p>
            </div>
            <h2 className="font-display text-5xl font-bold text-foreground md:text-7xl">
              New <span className="text-primary">Arrivals</span>
            </h2>
          </motion.div>

          <motion.a
            href="#"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ x: 5 }}
            className="hidden items-center gap-2 font-body text-sm text-primary transition-colors hover:text-accent md:flex"
          >
            View All <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {arrivals.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] }}
              whileHover={{ y: -12 }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl gradient-card border border-border transition-all duration-500 hover:border-primary/50 hover:glow-box"
            >
              {/* Badge */}
              <motion.div
                initial={{ x: -100 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 100 }}
                className="absolute left-0 top-4 z-20 rounded-r-full bg-primary px-4 py-1"
              >
                <span className="font-display text-xs font-bold uppercase tracking-wider text-primary-foreground">
                  {item.badge}
                </span>
              </motion.div>

              {/* Image area */}
              <div className="relative overflow-hidden p-8 pt-14">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <motion.img
                  src={item.img}
                  alt={item.name}
                  className="mx-auto h-52 w-52 object-contain"
                  whileHover={{ scale: 1.2, rotate: -12 }}
                  transition={{ type: "spring", stiffness: 180, damping: 12 }}
                />
              </div>

              {/* Info */}
              <div className="border-t border-border p-5">
                <h3 className="font-display text-lg font-semibold text-foreground">{item.name}</h3>
                <div className="mt-2 flex items-center gap-3">
                  <span className="font-display text-2xl font-bold text-primary">{item.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{item.oldPrice}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full rounded-xl bg-primary/10 py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
