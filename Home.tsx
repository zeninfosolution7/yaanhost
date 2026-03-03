import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Check, Shield, Zap, Clock, Lock, Headphones } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTld, setSelectedTld] = useState(".com");

  const popularTlds = [".com", ".net", ".org", ".co", ".io", ".dev"];

  const trustIndicators = [
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Expert support team available round the clock",
    },
    {
      icon: Shield,
      title: "99.9% Uptime",
      description: "Guaranteed uptime SLA for all services",
    },
    {
      icon: Lock,
      title: "SSL Included",
      description: "Free SSL certificates with all hosting plans",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Global CDN for optimal performance",
    },
    {
      icon: Headphones,
      title: "Expert Help",
      description: "Free migration assistance from our team",
    },
    {
      icon: Check,
      title: "Money Back",
      description: "30-day money-back guarantee",
    },
  ];

  const hostingPlans = [
    {
      name: "Shared Hosting",
      price: "$2.99",
      period: "/month",
      description: "Perfect for beginners",
      features: ["Unlimited Bandwidth", "50 GB Storage", "Free SSL", "24/7 Support"],
      cta: "Get Started",
    },
    {
      name: "VPS Hosting",
      price: "$9.99",
      period: "/month",
      description: "For growing websites",
      features: ["4 GB RAM", "100 GB SSD", "Full Root Access", "24/7 Support"],
      cta: "Get Started",
      featured: true,
    },
    {
      name: "Dedicated Server",
      price: "$49.99",
      period: "/month",
      description: "Maximum performance",
      features: ["16 GB RAM", "500 GB SSD", "Dedicated IP", "24/7 Support"],
      cta: "Get Started",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
            <span className="font-bold text-lg text-primary">YaanHost</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#hosting" className="text-foreground hover:text-accent transition-colors">
              Hosting
            </Link>
            <Link href="#pricing" className="text-foreground hover:text-accent transition-colors">
              Pricing
            </Link>
            <Link href="#features" className="text-foreground hover:text-accent transition-colors">
              Features
            </Link>
            <Button className="btn-primary">Sign In</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Your Domain, Your Future
            </h1>
            <p className="text-xl text-foreground/70 mb-12">
              Register domains and host your website with YaanHost. Fast, reliable, and affordable hosting solutions for everyone.
            </p>

            {/* Domain Search Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Enter your domain name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-12 px-4 border-border"
                />
                <select
                  value={selectedTld}
                  onChange={(e) => setSelectedTld(e.target.value)}
                  className="h-12 px-4 border border-border rounded-lg bg-white text-foreground"
                >
                  {popularTlds.map((tld) => (
                    <option key={tld} value={tld}>
                      {tld}
                    </option>
                  ))}
                </select>
                <Button className="btn-primary h-12">Search</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {popularTlds.map((tld) => (
                  <button
                    key={tld}
                    onClick={() => setSelectedTld(tld)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTld === tld
                        ? "bg-accent text-white"
                        : "bg-muted text-foreground hover:bg-border"
                    }`}
                  >
                    {tld}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button className="btn-primary">Register Domain</Button>
              <Button className="btn-secondary">View Hosting Plans</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16">
            Why Choose YaanHost?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-card transition-shadow"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {indicator.title}
                  </h3>
                  <p className="text-foreground/70">{indicator.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hosting Plans Section */}
      <section id="hosting" className="py-20 bg-blue-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
            Hosting Plans
          </h2>
          <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
            Choose the perfect hosting plan for your needs. All plans include 24/7 support and a 30-day money-back guarantee.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hostingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 flex flex-col transition-all ${
                  plan.featured
                    ? "border-2 border-accent shadow-xl scale-105 md:scale-100"
                    : "border border-border"
                }`}
              >
                {plan.featured && (
                  <div className="mb-4">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                <p className="text-foreground/70 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-foreground/70">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-accent" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={plan.featured ? "btn-primary w-full" : "btn-secondary w-full"}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust YaanHost for their domain and hosting needs.
          </p>
          <Button className="bg-white text-primary hover:bg-blue-50 font-semibold px-8 py-3">
            Register Your Domain Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">About YaanHost</h4>
              <p className="text-white/70 text-sm">
                Providing fast, reliable, and affordable domain and hosting services since 2024.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Domain Registration</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Web Hosting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">VPS Hosting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/70 text-sm">
            <p>&copy; 2024 YaanHost. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}