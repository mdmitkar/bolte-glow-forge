import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CreditCard, Truck, CheckCircle2, MapPin, User, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);

  if (cart.length === 0 && !isOrdered) {
    return (
      <PageTransition>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
          <Navbar />
          <div className="text-center px-6">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={40} className="text-muted-foreground opacity-50" />
            </div>
            <h1 className="text-3xl font-display font-bold">Your bag is empty</h1>
            <p className="mt-4 text-muted-foreground max-w-sm mx-auto">Add some fire to your cart before checking out! Your next favorite pair is just a click away.</p>
            <button 
              onClick={() => navigate("/shop")} 
              className="mt-10 rounded-full bg-primary px-10 py-4 font-display font-bold text-xs uppercase tracking-widest text-primary-foreground hover:glow-box transition-all"
            >
              Go to Shop
            </button>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    toast.success("Order Placed Successfully!", {
      description: "We've received your order and are processing it.",
    });
    clearCart();
  };

  if (isOrdered) {
    return (
      <PageTransition>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="rounded-full bg-primary/10 p-6 text-primary">
              <CheckCircle2 size={64} />
            </div>
            <h1 className="mt-8 font-display text-4xl font-bold md:text-5xl">Thank You for Your Order!</h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Your order has been confirmed. We'll notify you once your fresh kicks are on the way. Order ID: #BOLTE-{Math.floor(Math.random() * 10000)}
            </p>
            <button 
              onClick={() => navigate("/")}
              className="mt-10 rounded-full bg-primary px-12 py-5 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground hover:glow-box"
            >
              Back to Home
            </button>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-4xl font-bold md:text-6xl mb-4">Checkout</h1>
            <p className="text-muted-foreground mb-12 max-w-2xl">Complete your purchase by providing your shipping and contact details. Currently supporting Cash on Delivery for all orders.</p>
            
            <div className="grid gap-12 lg:grid-cols-12">
              {/* Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handlePlaceOrder} className="space-y-10">
                  <section className="bg-card border border-border rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 bg-primary/10 rounded-xl text-primary">
                        <User size={20} />
                      </div>
                      <h2 className="font-display text-xl font-bold">Contact Information</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</label>
                        <input required className="w-full rounded-2xl border border-border bg-background p-4 text-sm focus:border-primary/50 outline-none transition-all" placeholder="e.g. Rahul Sharma" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</label>
                        <input required type="email" className="w-full rounded-2xl border border-border bg-background p-4 text-sm focus:border-primary/50 outline-none transition-all" placeholder="rahul@example.com" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Phone Number</label>
                        <input required className="w-full rounded-2xl border border-border bg-background p-4 text-sm focus:border-primary/50 outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
                      </div>
                    </div>
                  </section>

                  <section className="bg-card border border-border rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 bg-primary/10 rounded-xl text-primary">
                        <MapPin size={20} />
                      </div>
                      <h2 className="font-display text-xl font-bold">Shipping Address</h2>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Street Address</label>
                        <input required className="w-full rounded-2xl border border-border bg-background p-4 text-sm focus:border-primary/50 outline-none transition-all" placeholder="House No, Building, Street Name" />
                      </div>
                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">City</label>
                          <input required className="w-full rounded-2xl border border-border bg-background p-4 text-sm focus:border-primary/50 outline-none transition-all" placeholder="Bhiwandi" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">State</label>
                          <input required className="w-full rounded-2xl border border-border bg-background p-4 text-sm focus:border-primary/50 outline-none transition-all" placeholder="Maharashtra" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Pincode</label>
                          <input required className="w-full rounded-2xl border border-border bg-background p-4 text-sm focus:border-primary/50 outline-none transition-all" placeholder="421302" />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="bg-card border border-border rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 bg-primary/10 rounded-xl text-primary">
                        <CreditCard size={20} />
                      </div>
                      <h2 className="font-display text-xl font-bold">Payment Method</h2>
                    </div>
                    <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
                      <div className="flex items-center gap-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                          <Truck size={28} />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-lg">Cash on Delivery (COD)</h4>
                          <p className="text-sm text-muted-foreground">Pay securely when your shoes arrive. Simple and safe.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-start gap-3 p-4 bg-muted/50 rounded-2xl border border-border/50">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      <p className="text-[11px] leading-relaxed text-muted-foreground italic">
                        Currently only accepting COD in Bhiwandi and nearby areas to ensure high-speed processing and no-hassle delivery.
                      </p>
                    </div>
                  </section>

                  <button 
                    type="submit"
                    className="w-full rounded-3xl bg-primary py-6 font-display text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground hover:glow-box transition-all active:scale-[0.98] flex items-center justify-center gap-4 shadow-xl shadow-primary/20"
                  >
                    Confirm Order · ₹{(totalPrice + 49).toLocaleString()} <ArrowRight size={20} />
                  </button>
                </form>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-5">
                <div className="sticky top-32 rounded-[2rem] border border-border bg-card p-8 shadow-2xl shadow-primary/5 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                  <h3 className="font-display text-xl font-bold border-b border-border pb-6 relative z-10">Order Summary</h3>
                  
                  <div className="mt-8 space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide relative z-10">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-5 group">
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-border bg-background p-3 transition-transform group-hover:scale-105">
                          <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                          <h4 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{item.name}</h4>
                          <div className="mt-2 flex items-center gap-3">
                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">UK {item.size}</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Qty: {item.quantity}</span>
                          </div>
                          <p className="mt-2 text-sm font-bold text-foreground">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 space-y-4 border-t border-border pt-8 relative z-10">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Order Subtotal</span>
                      <span className="font-bold">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Logistics & Shipping</span>
                      <span className="font-bold text-green-500">₹49</span>
                    </div>
                    <div className="pt-6 border-t border-border/50 flex justify-between items-end">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Amount</span>
                        <span className="font-display font-bold text-3xl text-primary">₹{(totalPrice + 49).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <ShieldCheck size={16} className="text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Checkout;
