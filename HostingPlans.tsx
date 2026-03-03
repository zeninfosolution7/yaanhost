import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { Link } from "wouter";

export default function HostingPlans() {
  const plans = [
    {
      id: "shared",
      name: "Shared Hosting",
      price: "$2.99",
      period: "/month",
      description: "Perfect for beginners and small websites",
      features: [
        { name: "Domains", value: "1", included: true },
        { name: "Storage", value: "50 GB", included: true },
        { name: "Bandwidth", value: "Unlimited", included: true },
        { name: "Email Accounts", value: "50", included: true },
        { name: "Free SSL", value: true, included: true },
        { name: "24/7 Support", value: true, included: true },
        { name: "Database", value: "MySQL", included: true },
        { name: "Uptime SLA", value: "99.9%", included: true },
        { name: "Staging Environment", value: false, included: false },
        { name: "Dedicated IP", value: false, included: false },
      ],
    },
    {
      id: "vps",
      name: "VPS Hosting",
      price: "$9.99",
      period: "/month",
      description: "For growing websites and applications",
      featured: true,
      features: [
        { name: "Domains", value: "Unlimited", included: true },
        { name: "Storage", value: "100 GB SSD", included: true },
        { name: "Bandwidth", value: "Unlimited", included: true },
        { name: "Email Accounts", value: "Unlimited", included: true },
        { name: "Free SSL", value: true, included: true },
        { name: "24/7 Support", value: true, included: true },
        { name: "Database", value: "Multiple", included: true },
        { name: "Uptime SLA", value: "99.95%", included: true },
        { name: "Staging Environment", value: true, included: true },
        { name: "Dedicated IP", value: true, included: true },
      ],
    },
    {
      id: "dedicated",
      name: "Dedicated Server",
      price: "$49.99",
      period: "/month",
      description: "Maximum performance for enterprise",
      features: [
        { name: "Domains", value: "Unlimited", included: true },
        { name: "Storage", value: "500 GB SSD", included: true },
        { name: "Bandwidth", value: "Unlimited", included: true },
        { name: "Email Accounts", value: "Unlimited", included: true },
        { name: "Free SSL", value: true, included: true },
        { name: "24/7 Support", value: true, included: true },
        { name: "Database", value: "Multiple", included: true },
        { name: "Uptime SLA", value: "99.99%", included: true },
        { name: "Staging Environment", value: true, included: true },
        { name: "Dedicated IP", value: true, included: true },
      ],
    },
  ];

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
            <Link href="/tld-pricing" className="text-foreground hover:text-accent transition-colors">
              Pricing
            </Link>
            <Button className="btn-primary">Sign In</Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Hosting Plans
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Choose the perfect hosting plan for your website. All plans include 24/7 support and a 30-day money-back guarantee.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`flex flex-col transition-all ${
                  plan.featured
                    ? "border-2 border-accent shadow-xl md:scale-105"
                    : "border border-border"
                }`}
              >
                <div className="p-8 flex-1 flex flex-col">
                  {plan.featured && (
                    <div className="mb-4">
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                  <p className="text-foreground/70 mb-6">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-primary">{plan.price}</span>
                    <span className="text-foreground/70">{plan.period}</span>
                  </div>
                  <Button
                    className={`w-full ${
                      plan.featured ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="text-left p-4 font-semibold text-primary border-b border-border">
                      Feature
                    </th>
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        className="text-center p-4 font-semibold text-primary border-b border-border"
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans[0].features.map((feature, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-blue-50">
                      <td className="text-left p-4 font-medium text-foreground">
                        {feature.name}
                      </td>
                      {plans.map((plan) => {
                        const planFeature = plan.features[idx];
                        return (
                          <td
                            key={plan.id}
                            className="text-center p-4 text-foreground"
                          >
                            {typeof planFeature.value === "boolean" ? (
                              planFeature.value ? (
                                <Check className="w-5 h-5 text-accent mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-muted-foreground mx-auto" />
                              )
                            ) : (
                              <span>{planFeature.value}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container text-center">
          <p>&copy; 2024 YaanHost. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}