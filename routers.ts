import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getResellerClubAPI } from "./resellerclub";

// Mock data for demonstration (replace with real ResellerClub API calls)
const mockTlds = [
  { extension: ".com", registration: 8.99, renewal: 8.99, category: "Popular" },
  { extension: ".net", registration: 9.99, renewal: 9.99, category: "Popular" },
  { extension: ".org", registration: 9.99, renewal: 9.99, category: "Popular" },
  { extension: ".co", registration: 24.99, renewal: 24.99, category: "Premium" },
  { extension: ".io", registration: 34.99, renewal: 34.99, category: "Tech" },
  { extension: ".dev", registration: 14.99, renewal: 14.99, category: "Tech" },
  { extension: ".app", registration: 11.99, renewal: 11.99, category: "Tech" },
];

const mockHostingPlans = [
  {
    id: "shared",
    name: "Shared Hosting",
    price: 2.99,
    period: "month",
    storage: "50 GB",
    bandwidth: "Unlimited",
  },
  {
    id: "vps",
    name: "VPS Hosting",
    price: 9.99,
    period: "month",
    storage: "100 GB SSD",
    bandwidth: "Unlimited",
  },
  {
    id: "dedicated",
    name: "Dedicated Server",
    price: 49.99,
    period: "month",
    storage: "500 GB SSD",
    bandwidth: "Unlimited",
  },
];

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Domain operations
  domains: router({
    /**
     * Check domain availability
     * Supports single or multiple domains with different TLDs
     */
    checkAvailability: publicProcedure
      .input(
        z.object({
          domains: z.array(z.string()),
        })
      )
      .query(async ({ input }) => {
        try {
          // In production, call ResellerClub API:
          // const api = getResellerClubAPI();
          // return await api.checkAvailability(input.domains);

          // Mock response for demonstration
          return input.domains.map((domain) => ({
            domain,
            available: Math.random() > 0.3,
            price: Math.floor(Math.random() * 30) + 5,
          }));
        } catch (error) {
          console.error("Error checking availability:", error);
          throw new Error("Failed to check domain availability");
        }
      }),

    /**
     * Get TLD pricing information
     */
    getTldPricing: publicProcedure
      .input(
        z.object({
          tlds: z.array(z.string()).optional(),
        })
      )
      .query(async ({ input }) => {
        try {
          // In production, call ResellerClub API:
          // const api = getResellerClubAPI();
          // return await api.getPricing(input.tlds || []);

          // Return mock data
          if (input.tlds && input.tlds.length > 0) {
            return mockTlds.filter((t) =>
              input.tlds!.includes(t.extension)
            );
          }
          return mockTlds;
        } catch (error) {
          console.error("Error fetching TLD pricing:", error);
          throw new Error("Failed to fetch TLD pricing");
        }
      }),

    /**
     * Suggest domain names based on keyword
     */
    suggestDomains: publicProcedure
      .input(
        z.object({
          keyword: z.string().min(1),
        })
      )
      .query(async ({ input }) => {
        try {
          // In production, call ResellerClub API:
          // const api = getResellerClubAPI();
          // return await api.suggestDomains(input.keyword);

          // Mock suggestions
          const suggestions = [
            `${input.keyword}.com`,
            `${input.keyword}.net`,
            `${input.keyword}.io`,
            `my${input.keyword}.com`,
            `${input.keyword}online.com`,
          ];
          return suggestions;
        } catch (error) {
          console.error("Error suggesting domains:", error);
          return [];
        }
      }),

    /**
     * Register a domain
     * Requires authentication and customer information
     */
    register: publicProcedure
      .input(
        z.object({
          domain: z.string(),
          years: z.number().min(1).max(10),
          registrantName: z.string(),
          registrantEmail: z.string().email(),
          registrantPhone: z.string(),
          registrantAddress: z.string(),
          registrantCity: z.string(),
          registrantState: z.string(),
          registrantZip: z.string(),
          registrantCountry: z.string(),
          privacyEnabled: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // In production, implement full registration flow:
          // 1. Create contact via ResellerClub API
          // 2. Register domain
          // 3. Store order in database

          return {
            orderId: `YH-${Date.now()}`,
            domain: input.domain,
            status: "pending",
            message: "Domain registration initiated",
          };
        } catch (error) {
          console.error("Error registering domain:", error);
          throw new Error("Failed to register domain");
        }
      }),

    /**
     * Get order details
     */
    getOrderDetails: publicProcedure
      .input(
        z.object({
          orderId: z.string(),
        })
      )
      .query(async ({ input }) => {
        try {
          // In production:
          // const api = getResellerClubAPI();
          // return await api.getOrderDetails(input.orderId);

          return {
            orderId: input.orderId,
            domain: "example.com",
            status: "completed",
            registrationDate: new Date(),
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          };
        } catch (error) {
          console.error("Error fetching order details:", error);
          throw new Error("Failed to fetch order details");
        }
      }),

    /**
     * Renew a domain
     */
    renew: publicProcedure
      .input(
        z.object({
          orderId: z.string(),
          years: z.number().min(1).max(10),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // In production:
          // const api = getResellerClubAPI();
          // return await api.renewDomain(input.orderId, input.years);

          return {
            orderId: input.orderId,
            status: "pending",
            message: "Domain renewal initiated",
          };
        } catch (error) {
          console.error("Error renewing domain:", error);
          throw new Error("Failed to renew domain");
        }
      }),
  }),

  // Hosting operations
  hosting: router({
    /**
     * Get all hosting plans
     */
    getPlans: publicProcedure.query(async () => {
      try {
        return mockHostingPlans;
      } catch (error) {
        console.error("Error fetching hosting plans:", error);
        throw new Error("Failed to fetch hosting plans");
      }
    }),

    /**
     * Get plan details
     */
    getPlanDetails: publicProcedure
      .input(
        z.object({
          planId: z.string(),
        })
      )
      .query(async ({ input }) => {
        const plan = mockHostingPlans.find((p) => p.id === input.planId);
        if (!plan) {
          throw new Error("Plan not found");
        }
        return plan;
      }),

    /**
     * Order a hosting plan
     */
    orderPlan: publicProcedure
      .input(
        z.object({
          planId: z.string(),
          domain: z.string(),
          years: z.number().min(1).max(5),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const plan = mockHostingPlans.find((p) => p.id === input.planId);
          if (!plan) {
            throw new Error("Plan not found");
          }

          return {
            orderId: `YH-${Date.now()}`,
            planId: input.planId,
            domain: input.domain,
            status: "pending",
            message: "Hosting order initiated",
          };
        } catch (error) {
          console.error("Error ordering hosting plan:", error);
          throw new Error("Failed to order hosting plan");
        }
      }),
  }),

  // Shopping cart operations
  cart: router({
    /**
     * Add item to cart
     */
    addItem: publicProcedure
      .input(
        z.object({
          itemId: z.string(),
          itemType: z.enum(["domain", "hosting"]),
          quantity: z.number().min(1),
          price: z.number().positive(),
        })
      )
      .mutation(async ({ input }) => {
        // In production, store in database or session
        return {
          success: true,
          message: "Item added to cart",
        };
      }),

    /**
     * Get cart items
     */
    getCart: publicProcedure.query(async () => {
      // In production, fetch from database or session
      return {
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
      };
    }),
  }),

  // Checkout operations
  checkout: router({
    /**
     * Create order from cart
     */
    createOrder: publicProcedure
      .input(
        z.object({
          items: z.array(
            z.object({
              itemId: z.string(),
              itemType: z.enum(["domain", "hosting"]),
              quantity: z.number(),
              price: z.number(),
            })
          ),
          customerEmail: z.string().email(),
          customerName: z.string(),
          billingAddress: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          return {
            orderId: `YH-${Date.now()}`,
            status: "pending",
            total: input.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
            message: "Order created successfully",
          };
        } catch (error) {
          console.error("Error creating order:", error);
          throw new Error("Failed to create order");
        }
      }),

    /**
     * Process payment
     */
    processPayment: publicProcedure
      .input(
        z.object({
          orderId: z.string(),
          amount: z.number().positive(),
          paymentMethod: z.enum(["credit_card", "paypal", "bank_transfer"]),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // In production, integrate with payment gateway
          return {
            orderId: input.orderId,
            status: "completed",
            transactionId: `TXN-${Date.now()}`,
            message: "Payment processed successfully",
          };
        } catch (error) {
          console.error("Error processing payment:", error);
          throw new Error("Failed to process payment");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;