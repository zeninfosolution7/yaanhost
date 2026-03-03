import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { LogOut, Settings, Globe, Server, FileText, LifeBuoy } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("domains");

  const domains = [
    { name: "example.com", registrar: "YaanHost", expiry: "2025-03-02", status: "Active" },
    { name: "mysite.io", registrar: "YaanHost", expiry: "2026-06-15", status: "Active" },
  ];

  const hostingAccounts = [
    { name: "example.com Hosting", type: "Shared", status: "Active", renewal: "2025-04-02" },
    { name: "mysite.io Hosting", type: "VPS", status: "Active", renewal: "2025-05-15" },
  ];

  const orders = [
    { id: "YH-2024-001234", date: "2024-03-02", amount: "$13.18", status: "Completed" },
    { id: "YH-2024-001233", date: "2024-02-15", amount: "$49.99", status: "Completed" },
  ];

  const navItems = [
    { id: "domains", label: "Domains", icon: Globe },
    { id: "hosting", label: "Hosting", icon: Server },
    { id: "orders", label: "Orders", icon: FileText },
    { id: "support", label: "Support", icon: LifeBuoy },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
            <span className="font-bold text-lg text-primary">YaanHost</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-foreground">Welcome, John Doe</span>
            <Button className="btn-secondary text-sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-accent text-white"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Domains Tab */}
            {activeTab === "domains" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-primary">My Domains</h2>
                  <Link href="/domain-checker">
                    <Button className="btn-primary">Register Domain</Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {domains.map((domain, idx) => (
                    <Card key={idx} className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-primary">
                            {domain.name}
                          </h3>
                          <p className="text-sm text-foreground/70">
                            Registrar: {domain.registrar}
                          </p>
                          <p className="text-sm text-foreground/70">
                            Expires: {domain.expiry}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-accent text-white rounded-full text-sm font-semibold">
                            {domain.status}
                          </span>
                          <div className="flex gap-2 mt-4">
                            <Button className="btn-secondary text-sm">
                              Manage
                            </Button>
                            <Button className="btn-outline text-sm">
                              Renew
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Hosting Tab */}
            {activeTab === "hosting" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-primary">My Hosting</h2>
                  <Link href="/hosting">
                    <Button className="btn-primary">Upgrade Plan</Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {hostingAccounts.map((account, idx) => (
                    <Card key={idx} className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-primary">
                            {account.name}
                          </h3>
                          <p className="text-sm text-foreground/70">
                            Type: {account.type}
                          </p>
                          <p className="text-sm text-foreground/70">
                            Renewal: {account.renewal}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-accent text-white rounded-full text-sm font-semibold">
                            {account.status}
                          </span>
                          <div className="flex gap-2 mt-4">
                            <Button className="btn-secondary text-sm">
                              Manage
                            </Button>
                            <Button className="btn-outline text-sm">
                              Renew
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Order History
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white border-b-2 border-border">
                        <th className="text-left p-4 font-semibold text-primary">
                          Order ID
                        </th>
                        <th className="text-left p-4 font-semibold text-primary">
                          Date
                        </th>
                        <th className="text-left p-4 font-semibold text-primary">
                          Amount
                        </th>
                        <th className="text-left p-4 font-semibold text-primary">
                          Status
                        </th>
                        <th className="text-center p-4 font-semibold text-primary">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, idx) => (
                        <tr
                          key={idx}
                          className="bg-white border-b border-border hover:bg-blue-50"
                        >
                          <td className="p-4 font-semibold text-foreground">
                            {order.id}
                          </td>
                          <td className="p-4 text-foreground">{order.date}</td>
                          <td className="p-4 font-semibold text-primary">
                            {order.amount}
                          </td>
                          <td className="p-4">
                            <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-semibold">
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <Button className="btn-outline text-sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Support Tab */}
            {activeTab === "support" && (
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Support & Help
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      Contact Support
                    </h3>
                    <p className="text-foreground/70 mb-4">
                      Need help? Our support team is available 24/7.
                    </p>
                    <Button className="btn-primary w-full">
                      Open Support Ticket
                    </Button>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      Knowledge Base
                    </h3>
                    <p className="text-foreground/70 mb-4">
                      Find answers to common questions and tutorials.
                    </p>
                    <Button className="btn-secondary w-full">
                      Browse Help Center
                    </Button>
                  </Card>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Account Settings
                </h2>
                <Card className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">
                      Profile Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-foreground/70">
                          Full Name
                        </label>
                        <p className="font-semibold text-foreground">
                          John Doe
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-foreground/70">
                          Email
                        </label>
                        <p className="font-semibold text-foreground">
                          john@example.com
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-foreground/70">
                          Phone
                        </label>
                        <p className="font-semibold text-foreground">
                          +1 (555) 123-4567
                        </p>
                      </div>
                    </div>
                    <Button className="btn-secondary mt-4">
                      Edit Profile
                    </Button>
                  </div>
                  <div className="border-t border-border pt-6">
                    <h3 className="text-xl font-semibold text-primary mb-4">
                      Security
                    </h3>
                    <Button className="btn-secondary">
                      Change Password
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-12">
        <div className="container text-center">
          <p>&copy; 2024 YaanHost. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}