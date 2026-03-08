import { motion } from "framer-motion";

const brands = ["Nike", "Adidas", "Puma", "Reebok", "New Balance", "Skechers", "Asics", "Fila", "Vans", "Converse"];

const BrandsStrip = () => {
  return (
    <section className="relative overflow-hidden border-y border-border py-16">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 text-center font-body text-sm uppercase tracking-[0.4em] text-muted-foreground"
        >
          Brands We Carry
        </motion.p>

        <div className="relative">
          <motion.div
            animate={{ x: [0, -1500] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-16"
          >
            {[...brands, ...brands, ...brands].map((brand, i) => (
              <motion.span
                key={`${brand}-${i}`}
                whileHover={{ scale: 1.2, color: "hsl(27 100% 50%)" }}
                className="shrink-0 cursor-pointer font-display text-3xl font-bold text-foreground/20 transition-colors hover:text-primary md:text-4xl"
              >
                {brand}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandsStrip;
