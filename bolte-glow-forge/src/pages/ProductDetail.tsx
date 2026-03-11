import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";
import { ShoppingBag, ChevronLeft, Star, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || "");

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <button onClick={() => navigate("/")} className="mt-4 text-primary underline">Go back home</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size", {
        description: "Size selection is mandatory for shoes.",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize,
    });

    toast.success(`${product.name} added to cart!`, {
      description: `Size: ${selectedSize}, Color: ${selectedColor}`,
      icon: <ShoppingBag className="h-4 w-4 text-primary" />,
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft size={16} /> Back to explore
        </button>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card p-12"
          >
            <motion.img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain"
              whileHover={{ scale: 1.05, rotate: 5 }}
            />
            {product.isHot && (
              <div className="absolute left-6 top-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                Hot Release
              </div>
            )}
          </motion.div>

          {/* Right - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">{product.category}</p>
            <h1 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">{product.name}</h1>
            
            <div className="mt-6 flex items-center gap-4">
              <span className="font-display text-3xl font-bold text-primary">₹{product.price}</span>
              <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={16} className="fill-current" />
                <span className="text-sm font-bold">4.9 (120 reviews)</span>
              </div>
            </div>

            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mt-10">
              <span className="text-sm font-bold uppercase tracking-wider text-foreground">Select Color</span>
              <div className="mt-4 flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border-2 px-4 py-2 text-xs font-semibold transition-all ${
                      selectedColor === color 
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-10">
              <div className="flex justify-between">
                <span className="text-sm font-bold uppercase tracking-wider text-foreground">Select Size (UK)</span>
                <button className="text-xs text-primary underline">Size Guide</button>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-12 items-center justify-center rounded-xl border-2 font-display text-sm font-bold transition-all ${
                      selectedSize === size 
                        ? "border-primary bg-primary text-primary-foreground" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:glow-box"
            >
              <ShoppingBag size={18} /> Add to Bag
            </motion.button>

            {/* Features */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8">
              <div className="flex flex-col items-center gap-2 text-center">
                <ShieldCheck size={20} className="text-primary" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Genuine</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck size={20} className="text-primary" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RefreshCcw size={20} className="text-primary" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">7-Day Return</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Details */}
        <div className="mt-20 rounded-3xl border border-border bg-card/50 p-8 md:p-12">
          <h3 className="font-display text-2xl font-bold">Product Specifications</h3>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <ul className="space-y-4">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {detail}
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-border bg-background p-6">
              <p className="text-sm leading-relaxed text-muted-foreground italic">
                "Curated for those who don't just walk, but make an impression. Every pair at Dyna Shoes is picked with focus on durability and street readiness."
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-32">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-primary">Recommendations</p>
              <h3 className="mt-2 font-display text-3xl font-bold">You May Also Like</h3>
            </div>
            <button 
              onClick={() => navigate("/shop")}
              className="text-sm font-bold text-primary hover:underline"
            >
              View Shop
            </button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((rp) => (
                <motion.div
                  key={rp.id}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(`/product/${rp.id}`)}
                  className="group cursor-pointer rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/20"
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-secondary/50 p-6">
                    <img 
                      src={rp.image} 
                      alt={rp.name} 
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div className="mt-4">
                    <h4 className="font-display font-bold text-sm text-foreground">{rp.name}</h4>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs font-bold text-primary">₹{rp.price}</span>
                      <span className="text-[10px] uppercase text-muted-foreground">{rp.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
    </PageTransition>
  );
};

export default ProductDetail;
