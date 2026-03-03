import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Trash2, Plus, Minus } from "lucide-react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "example.com", type: "Domain", price: 8.99, quantity: 1 },
    { id: 2, name: "Shared Hosting", type: "Hosting", price: 2.99, quantity: 1, period: "/month" },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax - discount;

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleApplyPromo = () => {
    if (promoCode === "SAVE10") {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
            <span className="font-bold text-lg text-primary">YaanHost</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/hosting" className="text-foreground hover:text-accent transition-colors">
              Hosting
            </Link>
            <Button className="btn-primary">Sign In</Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <h1 className="text-4xl font-bold text-primary">Shopping Cart</h1>
          <p className="text-foreground/70 mt-2">
            Review your items and proceed to checkout
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="container">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Cart Items ({cartItems.length})
                  </h2>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-sm text-foreground/70">{item.type}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 border border-border rounded-lg">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="p-1 hover:bg-muted"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-muted"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right w-20">
                            <p className="font-semibold text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-xs text-foreground/70">
                              ${item.price}{item.period}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 text-destructive hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Promo Code */}
                <Card className="p-6 mt-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Have a promo code?
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="flex-1 px-4 py-2 border border-border rounded-lg"
                    />
                    <Button onClick={handleApplyPromo} className="btn-secondary">
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-foreground/70 mt-2">
                    Try code: SAVE10
                  </p>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Order Summary
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-accent">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-4 flex justify-between font-bold text-lg text-primary">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Link href="/checkout">
                    <Button className="btn-primary w-full mb-3">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button className="btn-outline w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl text-foreground/70 mb-6">
                Your cart is empty
              </p>
              <Link href="/">
                <Button className="btn-primary">Continue Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-12">
        <div className="container text-center">
          <p>&copy; 2024 YaanHost. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}