import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Check } from "lucide-react";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  const subtotal = 11.98;
  const tax = 1.20;
  const total = 13.18;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
              <span className="font-bold text-lg text-primary">YaanHost</span>
            </Link>
          </div>
        </nav>

        {/* Success Message */}
        <section className="py-20">
          <div className="container max-w-2xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-foreground/70 mb-8">
              Thank you for your order. Your domains and hosting services are being set up.
            </p>
            <Card className="p-8 mb-8 bg-blue-50">
              <div className="text-left space-y-4">
                <div>
                  <p className="text-sm text-foreground/70">Order Number</p>
                  <p className="text-2xl font-bold text-primary">YH-2024-001234</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">${total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Email Confirmation</p>
                  <p className="text-lg text-foreground">{formData.email}</p>
                </div>
              </div>
            </Card>
            <div className="space-y-3">
              <p className="text-foreground/70 mb-6">
                A confirmation email has been sent to your email address with next steps.
              </p>
              <Link href="/dashboard">
                <Button className="btn-primary mr-3">Go to Dashboard</Button>
              </Link>
              <Link href="/">
                <Button className="btn-secondary">Back to Home</Button>
              </Link>
            </div>
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
            <span className="font-bold text-lg text-primary">YaanHost</span>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <h1 className="text-4xl font-bold text-primary">Checkout</h1>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {/* Step Indicator */}
              <div className="flex gap-4 mb-8">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 py-2 px-4 rounded-lg text-center font-semibold transition-colors ${
                      step >= s
                        ? "bg-accent text-white"
                        : "bg-muted text-foreground/70"
                    }`}
                  >
                    Step {s}
                  </div>
                ))}
              </div>

              {/* Step 1: Billing Information */}
              {step === 1 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Billing Information
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="border-border"
                      />
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="border-border"
                      />
                    </div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                    <Input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border-border"
                      />
                      <Input
                        type="text"
                        name="state"
                        placeholder="State/Province"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="border-border"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="zip"
                        placeholder="ZIP/Postal Code"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="border-border"
                      />
                      <Input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="border-border"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    className="btn-primary w-full mt-8"
                  >
                    Continue to Payment
                  </Button>
                </Card>
              )}

              {/* Step 2: Payment Information */}
              {step === 2 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                    <Input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="border-border"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="border-border"
                      />
                      <Input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="border-border"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <Button
                      onClick={() => setStep(1)}
                      className="btn-outline flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="btn-primary flex-1"
                    >
                      Review Order
                    </Button>
                  </div>
                </Card>
              )}

              {/* Step 3: Review Order */}
              {step === 3 && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Review Your Order
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">
                        Billing Information
                      </h3>
                      <p className="text-foreground/70">
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p className="text-foreground/70">{formData.email}</p>
                      <p className="text-foreground/70">{formData.address}</p>
                      <p className="text-foreground/70">
                        {formData.city}, {formData.state} {formData.zip}
                      </p>
                    </div>
                    <div className="border-t border-border pt-6">
                      <h3 className="font-semibold text-foreground mb-3">
                        Items
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-foreground/70">
                          <span>example.com (Domain)</span>
                          <span>$8.99</span>
                        </div>
                        <div className="flex justify-between text-foreground/70">
                          <span>Shared Hosting (1 month)</span>
                          <span>$2.99</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <Button
                      onClick={() => setStep(2)}
                      className="btn-outline flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      className="btn-primary flex-1"
                    >
                      Place Order
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold text-primary mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-foreground/70">example.com</p>
                    <p className="font-semibold text-foreground">$8.99</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-foreground/70">Shared Hosting</p>
                    <p className="font-semibold text-foreground">$2.99/month</p>
                  </div>
                </div>
                <div className="space-y-3 border-t border-border pt-6">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-primary pt-3 border-t border-border">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
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