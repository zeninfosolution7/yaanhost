import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Check, X, Loader2 } from "lucide-react";

export default function DomainChecker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTld, setSelectedTld] = useState(".com");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const tlds = [
    ".com", ".net", ".org", ".co", ".io", ".dev", ".app", ".info",
    ".biz", ".pro", ".online", ".site", ".tech", ".store", ".shop", ".cloud"
  ];

  const suggestions = [
    "techstartup.com",
    "innovatetech.io",
    "digitalagency.co",
    "webdesign.dev",
    "ecommerce.shop",
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearched(true);

    // Simulate API call to check availability
    setTimeout(() => {
      const mockResults = tlds.map((tld) => ({
        domain: `${searchQuery}${tld}`,
        available: Math.random() > 0.4,
        price: Math.floor(Math.random() * 30) + 5,
      }));
      setResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const parts = suggestion.split(".");
    setSearchQuery(parts[0]);
    setSelectedTld(`.${parts[1]}`);
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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">
              Find Your Perfect Domain
            </h1>
            <p className="text-lg text-foreground/70 text-center mb-12">
              Check availability and register your domain instantly. Fast, secure, and affordable.
            </p>

            {/* Search Bar */}
            <Card className="p-6 shadow-lg mb-8">
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <Input
                  type="text"
                  placeholder="Enter domain name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 h-12 px-4 border-border"
                />
                <select
                  value={selectedTld}
                  onChange={(e) => setSelectedTld(e.target.value)}
                  className="h-12 px-4 border border-border rounded-lg bg-white text-foreground"
                >
                  {tlds.map((tld) => (
                    <option key={tld} value={tld}>
                      {tld}
                    </option>
                  ))}
                </select>
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="btn-primary h-12 px-8"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>

              {/* Quick TLD Selection */}
              <div className="flex flex-wrap gap-2">
                {[".com", ".net", ".org", ".io", ".co", ".dev"].map((tld) => (
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
            </Card>

            {/* Suggestions */}
            {!searched && (
              <div className="text-center">
                <p className="text-foreground/70 mb-4">Popular domain suggestions:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 bg-blue-50 text-primary rounded-lg hover:bg-blue-100 transition-colors font-medium"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {searched && (
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-primary mb-8">
              Results for "{searchQuery}"
            </h2>

            {isSearching ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
                <p className="text-lg text-foreground/70">Checking availability...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                {results.map((result, idx) => (
                  <Card
                    key={idx}
                    className="p-4 flex items-center justify-between hover:shadow-card transition-shadow"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-3">
                        {result.available ? (
                          <Check className="w-6 h-6 text-accent" />
                        ) : (
                          <X className="w-6 h-6 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-lg">
                          {result.domain}
                        </p>
                        <p className="text-sm text-foreground/70">
                          {result.available ? "Available" : "Not available"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-primary text-lg">
                          ${result.price}
                        </p>
                        <p className="text-xs text-foreground/70">/year</p>
                      </div>
                      {result.available && (
                        <Button className="btn-primary">Register</Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-20 bg-blue-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Domain Registration Made Easy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="text-4xl font-bold text-accent mb-4">1</div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Search
              </h3>
              <p className="text-foreground/70">
                Find the perfect domain name for your business or project.
              </p>
            </Card>
            <Card className="p-6">
              <div className="text-4xl font-bold text-accent mb-4">2</div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Register
              </h3>
              <p className="text-foreground/70">
                Complete registration in minutes with our simple checkout process.
              </p>
            </Card>
            <Card className="p-6">
              <div className="text-4xl font-bold text-accent mb-4">3</div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Manage
              </h3>
              <p className="text-foreground/70">
                Manage your domain with our easy-to-use control panel.
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