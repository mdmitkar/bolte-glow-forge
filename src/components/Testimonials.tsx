import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Rahul S.", text: "Best sneaker shop in Bhiwandi! The quality is unreal for the price. I've bought 5 pairs already.", rating: 5, tag: "Verified Buyer" },
  { name: "Priya M.", text: "My go-to place for trendy shoes. Chirag always helps me find the perfect pair. Highly recommended!", rating: 5, tag: "Regular Customer" },
  { name: "Arjun K.", text: "Got the Street Runner X1 and it's 🔥. Comfortable, stylish, and affordable. What more do you need?", rating: 5, tag: "Verified Buyer" },
  { name: "Sneha D.", text: "The streetwear collection is insane. Feels like shopping at a premium brand but at local prices!", rating: 4, tag: "New Customer" },
  { name: "Vikram P.", text: "Fast service, amazing quality. I recommended No.01 Shoes Bolte to all my friends.", rating: 5, tag: "Verified Buyer" },
  { name: "Aisha R.", text: "Love the new arrivals section! Always something fresh and trending. Best shoe store hands down.", rating: 5, tag: "Regular Customer" },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-primary">Testimonials</p>
          <h2 className="font-display text-5xl font-bold text-foreground md:text-7xl">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl gradient-card border border-border p-6 transition-all duration-500 hover:border-primary/40"
            >
              <Quote className="absolute -right-2 -top-2 h-20 w-20 text-primary/5 transition-colors group-hover:text-primary/10" />

              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 + j * 0.05 }}
                  >
                    <Star className="h-4 w-4 fill-primary text-primary" />
                  </motion.div>
                ))}
              </div>

              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{t.text}</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-primary">{t.tag}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                  {t.name.charAt(0)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
