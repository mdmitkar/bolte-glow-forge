import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Zap, Clock } from "lucide-react";
import sneaker5 from "@/assets/sneaker-5.png";
import sneaker2 from "@/assets/sneaker-2.png";

function CountdownTimer() {
  const [time, setTime] = useState({ hours: 23, minutes: 47, seconds: 12 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3">
      {[
        { val: time.hours, label: "HRS" },
        { val: time.minutes, label: "MIN" },
        { val: time.seconds, label: "SEC" },
      ].map((t) => (
        <div key={t.label} className="flex flex-col items-center">
          <motion.div
            key={t.val}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex h-16 w-16 items-center justify-center rounded-xl gradient-card border border-border font-display text-2xl font-bold text-primary"
          >
            {String(t.val).padStart(2, "0")}
          </motion.div>
          <span className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

const DealsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      {/* Animated stripe bg */}
      <motion.div
        style={{ x: bgX }}
        className="absolute inset-0 opacity-[0.03]"
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[200%] w-20 -rotate-12 bg-primary"
            style={{ left: `${i * 8}%`, top: "-50%" }}
          />
        ))}
      </motion.div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left - Deal info */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-display text-xs font-bold uppercase tracking-wider text-primary">Flash Sale</span>
            </div>

            <h2 className="mb-4 font-display text-5xl font-bold text-foreground md:text-7xl">
              Up to <span className="text-glow text-primary">60% OFF</span>
            </h2>

            <p className="mb-8 max-w-md text-lg text-muted-foreground">
              Don't miss out on our biggest sale of the season. Premium sneakers at unbeatable prices — only at No.01 Shoes Bolte.
            </p>

            <div className="mb-8 flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-body text-sm uppercase tracking-wider text-muted-foreground">Ends in</span>
            </div>
            <CountdownTimer />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 magnetic-btn glow-box rounded-full bg-primary px-10 py-4 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground"
            >
              Shop the Sale
            </motion.button>
          </motion.div>

          {/* Right - Stacked deal cards */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 60, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute -top-4 right-8 w-full rounded-2xl gradient-card border border-border p-6 opacity-60"
            >
              <div className="h-64" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="relative overflow-hidden rounded-2xl gradient-card border border-primary/30 glow-box"
            >
              <div className="grid items-center gap-6 p-8 sm:grid-cols-2">
                <motion.img
                  src={sneaker5}
                  alt="Deal sneaker"
                  className="mx-auto h-56 w-56 object-contain"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div>
                  <span className="rounded-full bg-destructive/20 px-3 py-1 text-xs font-semibold text-destructive">-60%</span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-foreground">Daily Flex Max</h3>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-display text-3xl font-bold text-primary">₹799</span>
                    <span className="text-lg text-muted-foreground line-through">₹1,999</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Sold: 87</span>
                      <span>Available: 13</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "87%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-5 w-full rounded-xl bg-primary py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground"
                  >
                    Grab Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
