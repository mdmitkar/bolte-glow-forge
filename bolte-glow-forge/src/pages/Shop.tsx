import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";

const Shop = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const search = searchParams.get("search");
    if (search !== null) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        setSearchParams({ search: searchQuery });
      } else {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("search");
        setSearchParams(newParams);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  const { addToCart } = useCart();

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="font-body text-[11px] uppercase tracking-[0.3em] text-primary">Explore Catalog</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground md:text-6xl">Full Collection</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            From performance runners to everyday street style, discover the perfect pair for your journey.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search sneakers..."
              className="w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-sm transition-all focus:border-primary/50 focus:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="mr-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <SlidersHorizontal size={14} /> Filter:
            </div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-5 py-2.5 text-xs font-semibold transition-all ${
                  selectedCategory === category 
                    ? "border-primary bg-primary text-primary-foreground" 
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5"
              >
                {/* Image Container */}
                <div 
                  className="relative aspect-[4/5] cursor-pointer overflow-hidden p-8"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  />
                  {product.isHot && (
                    <div className="absolute left-6 top-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                      Hot
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{product.category}</span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                      <span>₹{product.price}</span>
                      <span className="text-muted-foreground line-through opacity-50">₹{product.originalPrice}</span>
                    </div>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-foreground">{product.name}</h3>
                  
                  <div className="mt-6 flex gap-3">
                    <button 
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="flex-1 rounded-xl border border-border py-3 text-xs font-bold uppercase tracking-wider text-foreground transition-all hover:border-primary hover:text-primary"
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => {
                        // Quick add with first size
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          quantity: 1,
                          size: product.sizes[0]
                        });
                        toast.success(`${product.name} added to cart`, {
                          description: `Standard size ${product.sizes[0]} selected.`,
                          icon: <ShoppingBag size={14} />
                        });
                      }}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:glow-box-subtle"
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="rounded-full bg-card p-6">
              <Search size={40} className="text-muted-foreground opacity-20" />
            </div>
            <h3 className="mt-6 font-display text-xl font-bold">No results found</h3>
            <p className="mt-2 text-muted-foreground text-sm">Try adjusting your search or filters.</p>
            <button 
              onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
              className="mt-6 text-primary underline text-sm font-bold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
    </PageTransition>
  );
};

export default Shop;
