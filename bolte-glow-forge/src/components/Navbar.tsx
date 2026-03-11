import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Phone, ShoppingBag, Search } from "lucide-react";
import logo from "@/assets/logo.png";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 50);
    setHidden(latest > prev && latest > 300);
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchVisible(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass border-b border-border shadow-sm" : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src={logo}
              alt="Dyna Shoes"
              className="h-14 w-14 object-contain"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="flex flex-col">
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {["Collection", "Store", "Deals", "About"].map((item) => {
              const isActive = 
                (item === "Collection" && location.pathname === "/shop") ||
                (item === "Store" && location.pathname === "/store") ||
                (item === "Deals" && location.pathname === "/deals") ||
                (item === "About" && location.pathname === "/about");

              return (
                <button
                  key={item}
                  onClick={() => {
                    if (item === "Collection") navigate("/shop");
                    else if (item === "Store") navigate("/store");
                    else if (item === "Deals") navigate("/deals");
                    else if (item === "About") navigate("/about");
                  }}
                  className={`font-display text-[11px] uppercase tracking-[0.2em] font-bold transition-all relative group ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </button>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            {/* Search Bar Desktop */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchVisible && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="absolute right-0 flex items-center overflow-hidden rounded-full bg-secondary/50 border border-border px-3"
                  >
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search premium kicks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent py-2 text-xs font-medium outline-none placeholder:text-muted-foreground/60"
                    />
                    <button type="submit" className="text-muted-foreground hover:text-primary">
                      <Search size={14} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              {!isSearchVisible && (
                <motion.button
                  onClick={() => setIsSearchVisible(true)}
                  whileHover={{ scale: 1.1, color: "var(--primary)" }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50"
                >
                  <Search size={18} />
                </motion.button>
              )}
              {isSearchVisible && (
                <button 
                  onClick={() => setIsSearchVisible(false)}
                  className="relative z-10 ml-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <motion.button
              onClick={() => setIsCartOpen(true)}
              whileHover={{ scale: 1.1, color: "var(--primary)" }}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: totalItems > 0 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground shadow-lg shadow-primary/20">
                  {totalItems}
                </span>
              )}
            </motion.button>
            <a
              href="tel:9607281858"
              className="ml-2 flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-display text-[10px] font-bold uppercase tracking-wider text-primary-foreground transition-all hover:glow-box hover:scale-105"
            >
              <Phone size={13} strokeWidth={2.5} /> Call Now
            </a>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <motion.button 
              onClick={() => setIsCartOpen(true)} 
              animate={{ scale: totalItems > 0 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
              className="relative text-foreground"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-md">
                  {totalItems}
                </span>
              )}
            </motion.button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-background/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm border-l border-border bg-card p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-display font-bold text-xl tracking-tight">EXPLORE</span>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground p-2">
                  <X size={28} />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-8 flex items-center overflow-hidden rounded-2xl bg-muted px-4">
                <Search size={18} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent py-4 pl-3 text-sm font-medium outline-none"
                />
              </form>

              <div className="flex flex-col gap-2">
                {["Home", "Collection", "Store", "Deals", "About"].map((item, i) => {
                  const isActive = 
                    (item === "Home" && location.pathname === "/") ||
                    (item === "Collection" && location.pathname === "/shop") ||
                    (item === "Store" && location.pathname === "/store") ||
                    (item === "Deals" && location.pathname === "/deals") ||
                    (item === "About" && location.pathname === "/about");

                  return (
                    <motion.button
                      key={item}
                      onClick={() => {
                        setIsOpen(false);
                        if (item === "Home") navigate("/");
                        else if (item === "Collection") navigate("/shop");
                        else if (item === "Store") navigate("/store");
                        else if (item === "Deals") navigate("/deals");
                        else if (item === "About") navigate("/about");
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                      className={`border-b border-border/50 py-5 font-display text-3xl font-bold transition-all hover:pl-2 text-left flex items-center justify-between group ${isActive ? "text-primary" : "text-foreground hover:text-primary"}`}
                    >
                      {item}
                      <ArrowRight size={20} className={`${isActive ? "text-primary opacity-100" : "text-primary opacity-0 group-hover:opacity-100"} transition-opacity`} />
                    </motion.button>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12"
              >
                <a
                  href="tel:9607281858"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-5 font-display text-base font-bold uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                >
                  <Phone size={20} fill="currentColor" /> Call Support
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-[70] h-full w-full max-w-md border-l border-border bg-card p-0 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-card/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <ShoppingBag className="text-primary" size={20} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold leading-none">Your Cart</h2>
                    <p className="text-[10px] text-muted-foreground mt-1 font-bold tracking-widest uppercase">
                      {totalItems} {totalItems === 1 ? 'Item' : 'Items'} Ready
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-8">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                      <ShoppingBag size={40} className="text-muted-foreground opacity-50" />
                    </div>
                    <p className="font-display text-xl font-bold mb-2">Cart is empty</p>
                    <p className="text-sm text-muted-foreground mb-8">Premium footwear awaits you in our special collection.</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); navigate("/shop"); }}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-display font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4 group">
                        <div className="h-24 w-24 flex-shrink-0 bg-secondary rounded-2xl overflow-hidden p-3 relative group-hover:scale-105 transition-transform">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-display font-bold text-sm leading-tight text-foreground">{item.name}</h4>
                              <button
                                onClick={() => {
                                  removeFromCart(item.id, item.size);
                                  toast.error("Removed from cart");
                                }}
                                className="text-muted-foreground hover:text-destructive p-1 rounded-md hover:bg-destructive/10 transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                                SIZE: {item.size}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <p className="font-bold text-primary font-display">₹{item.price.toLocaleString()}</p>
                            <div className="flex items-center bg-secondary rounded-lg px-1 py-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-md bg-background shadow-sm transition-all hover:bg-primary hover:text-white"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center font-display text-xs font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-md bg-background shadow-sm transition-all hover:bg-primary hover:text-white"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-border bg-card/80 backdrop-blur-md">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-xs text-muted-foreground font-medium">
                      <span>Bag Subtotal</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground font-medium">
                      <span>Shipping</span>
                      <span className="text-green-500 font-bold">FREE</span>
                    </div>
                    <div className="pt-2 border-t border-border/50 flex justify-between items-center">
                      <span className="font-display font-bold text-lg">Total</span>
                      <span className="font-display font-bold text-2xl text-primary">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    <button 
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate("/checkout");
                      }}
                      className="w-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest py-5 rounded-2xl hover:glow-box transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                      Process Checkout <ArrowRight size={18} />
                    </button>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="w-full text-muted-foreground font-display font-bold uppercase tracking-widest py-2 rounded-xl hover:text-foreground transition-all text-[10px]"
                    >
                      Continue Browsing
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

const Minus = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14" /></svg>
);

const Plus = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5v14M5 12h14" /></svg>
);

const ArrowRight = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
