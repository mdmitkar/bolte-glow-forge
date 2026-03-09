import { motion } from "framer-motion";
import { useRef } from "react";
import { Flame, ArrowRight, ShoppingBag, Heart, Eye } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";
import { products } from "@/data/products";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const arrivals = products.filter(p => p.isNew);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.sizes[0] // Default to first size for quick add
    });
    toast.success(`${product.name} added to cart!`, {
      description: `Standard size ${product.sizes[0]} added.`,
      icon: <ShoppingBag className="h-4 w-4 text-primary" />,
    });
  };

  return (
    <section id="collection" className="section-padding overflow-hidden bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary"
            >
              <Flame size={14} className="fill-current" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Trending Now</span>
            </motion.div>
            <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              New <span className="text-gradient">Arrivals</span>
            </h2>
          </div>

          <motion.button
            onClick={() => navigate("/shop")}
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-primary"
          >
            View All Collection <ArrowRight size={18} />
          </motion.button>
        </div>

        <div 
          ref={scrollRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {arrivals.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Image Container */}
              <div 
                className="relative aspect-square cursor-pointer overflow-hidden p-8"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent transition-opacity group-hover:opacity-100" />
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-sm hover:text-primary"
                  >
                    <Heart size={20} />
                  </motion.button>
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-sm hover:text-primary"
                  >
                    <Eye size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{product.category}</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    In Stock
                  </div>
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-foreground">{product.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg font-bold text-primary">₹{product.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground line-through opacity-50">₹{product.originalPrice.toLocaleString()}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg hover:glow-box-subtle"
                  >
                    <ShoppingBag size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.button
            onClick={() => navigate("/shop")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-border px-10 py-4 font-display text-sm font-semibold uppercase tracking-wider text-foreground transition-all hover:border-primary/50 hover:text-primary"
          >
            Load More Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewArrivals;
