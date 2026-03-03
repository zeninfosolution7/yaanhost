import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Search } from "lucide-react";

export default function TldPricing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const tlds = [
    { extension: ".com", registration: "$8.99", renewal: "$8.99", category: "Popular" },
    { extension: ".net", registration: "$9.99", renewal: "$9.99", category: "Popular" },
    { extension: ".org", registration: "$9.99", renewal: "$9.99", category: "Popular" },
    { extension: ".co", registration: "$24.99", renewal: "$24.99", category: "Premium" },
    { extension: ".io", registration: "$34.99", renewal: "$34.99", category: "Tech" },
    { extension: ".dev", registration: "$14.99", renewal: "$14.99", category: "Tech" },
    { extension: ".app", registration: "$11.99", renewal: "$11.99", category: "Tech" },
    { extension: ".info", registration: "$9.99", renewal: "$9.99", category: "Popular" },
    { extension: ".biz", registration: "$9.99", renewal: "$9.99", category: "Business" },
    { extension: ".pro", registration: "$9.99", renewal: "$9.99", category: "Business" },
    { extension: ".online", registration: "$24.99", renewal: "$24.99", category: "Premium" },
    { extension: ".site", registration: "$24.99", renewal: "$24.99", category: "Premium" },
    { extension: ".tech", registration: "$29.99", renewal: "$29.99", category: "Tech" },
    { extension: ".store", registration: "$49.99", renewal: "$49.99", category: "E-commerce" },
    { extension: ".shop", registration: "$24.99", renewal: "$24.99", category: "E-commerce" },
    { extension: ".cloud", registration: "$24.99", renewal: "$24.99", category: "Tech" },
  ];

  const filteredTlds = tlds
    .filter((tld) =>
      tld.extension.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.extension.localeCompare(b.extension);
      if (sortBy === "price") {
        const priceA = parseFloat(a.registration);
        const priceB = parseFloat(b.registration);
        return priceA - priceB;
      }
      return 0;
    });

  const categories = ["All", ...Array.from(new Set(tlds.map((t) => t.category)))];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const displayedTlds = filteredTlds.filter(
    (tld) => selectedCategory === "All" || tld.category === selectedCategory
  );

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
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Domain Pricing
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Find the perfect domain extension for your website. Competitive pricing on all popular TLDs.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-blue-50">
        <div className="container">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search domain extensions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-border"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-accent text-white"
                    : "bg-white text-foreground border border-border hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex justify-end mt-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-white text-foreground"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>
      </section>

      {/* TLD Table */}
      <section className="py-20">
        <div className="container">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 border-b-2 border-border">
                  <th className="text-left p-4 font-semibold text-primary">Extension</th>
                  <th className="text-left p-4 font-semibold text-primary">Category</th>
                  <th className="text-center p-4 font-semibold text-primary">Registration</th>
                  <th className="text-center p-4 font-semibold text-primary">Renewal</th>
                  <th className="text-center p-4 font-semibold text-primary">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedTlds.map((tld, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-4 font-semibold text-primary text-lg">
                      {tld.extension}
                    </td>
                    <td className="p-4 text-foreground">{tld.category}</td>
                    <td className="text-center p-4 text-foreground font-medium">
                      {tld.registration}
                    </td>
                    <td className="text-center p-4 text-foreground font-medium">
                      {tld.renewal}
                    </td>
                    <td className="text-center p-4">
                      <Button className="btn-primary text-sm">Register</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {displayedTlds.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/70">
                No domains found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-blue-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Why Register with YaanHost?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Competitive Pricing
              </h3>
              <p className="text-foreground/70">
                Best prices on all popular domain extensions with no hidden fees.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Free DNS Management
              </h3>
              <p className="text-foreground/70">
                Full DNS control and advanced DNS management tools included.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Privacy Protection
              </h3>
              <p className="text-foreground/70">
                Optional WHOIS privacy to protect your personal information.
              </p>
            </Card>
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