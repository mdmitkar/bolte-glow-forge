import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import sneaker1 from "@/assets/sneaker-1.png";
import sneaker2 from "@/assets/sneaker-2.png";
import sneaker3 from "@/assets/sneaker-3.png";
import sneaker4 from "@/assets/sneaker-4.png";

const words1 = "Designed for comfort.".split(" ");
const words2 = "Built for style.".split(" ");
const words3 = "Engineered for the streets.".split(" ");

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] },
  }),
};

const EnhancedParallaxSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -180]);
  const y4 = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [10, -20]);

  // Animated lines
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const lineRotate = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={sectionRef} className="relative min-h-[120vh] overflow-hidden py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Animated diagonal lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          style={{ scaleX: lineScale, rotate: lineRotate }}
          className="absolute h-[2px] w-[150%] -left-[25%] bg-gradient-to-r from-transparent via-primary/15 to-transparent"
          initial={{ top: `${15 + i * 18}%` }}
        />
      ))}

      {/* Parallax sneaker images */}
      <motion.img src={sneaker1} alt="" style={{ y: y1, rotate: rotate1 }} className="absolute -left-10 top-[10%] w-64 opacity-15 blur-[2px]" />
      <motion.img src={sneaker3} alt="" style={{ y: y2, rotate: rotate2 }} className="absolute -right-10 top-[20%] w-56 opacity-15 blur-[2px]" />
      <motion.img src={sneaker2} alt="" style={{ y: y3 }} className="absolute left-[10%] bottom-[10%] w-48 opacity-10 blur-[3px]" />
      <motion.img src={sneaker4} alt="" style={{ y: y4 }} className="absolute right-[15%] bottom-[5%] w-52 opacity-10 blur-[3px]" />

      {/* Text content */}
      <div className="container relative z-10 mx-auto flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-8 font-body text-sm uppercase text-primary"
        >
          Our Philosophy
        </motion.p>

        {[
          { words: words1, highlight: "comfort", offset: 0 },
          { words: words2, highlight: "style", offset: words1.length },
          { words: words3, highlight: "streets", offset: words1.length + words2.length },
        ].map((line, li) => (
          <div key={li} className={`mb-4 flex flex-wrap justify-center gap-x-4 ${li === 2 ? "mb-8" : ""}`}>
            {line.words.map((word, i) => (
              <motion.span
                key={`w${li}-${i}`}
                custom={i + line.offset}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={wordVariants}
                className={`font-display font-bold ${li < 2 ? "text-5xl md:text-7xl lg:text-8xl" : "text-4xl md:text-6xl lg:text-7xl"} ${word.toLowerCase().includes(line.highlight) ? "text-primary text-glow" : "text-foreground"}`}
              >
                {word}
              </motion.span>
            ))}
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mx-auto max-w-xl text-lg text-muted-foreground"
        >
          Every pair tells a story. From the streets of Bhiwandi to your wardrobe — premium quality at honest prices.
        </motion.p>
      </div>
    </section>
  );
};

export default EnhancedParallaxSection;
