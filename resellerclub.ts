/**
 * ResellerClub API Integration
 * Handles all domain and hosting operations with ResellerClub
 */

import axios, { AxiosInstance } from "axios";

interface DomainAvailabilityResult {
  domain: string;
  available: boolean;
  price?: number;
  premiumPrice?: number;
}

interface DomainRegistrationRequest {
  domain: string;
  years: number;
  registrantContactId: string;
  adminContactId: string;
  techContactId: string;
  billingContactId: string;
  nameServers?: string[];
  privacyEnabled?: boolean;
}

interface PricingInfo {
  tld: string;
  registrationPrice: number;
  renewalPrice: number;
  transferPrice: number;
}

class ResellerClubAPI {
  private client: AxiosInstance;
  private resellerEmail: string;
  private apiKey: string;
  private baseURL: string = "https://manage.resellerclub.com/api/domains";

  constructor(resellerEmail: string, apiKey: string) {
    this.resellerEmail = resellerEmail;
    this.apiKey = apiKey;

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      params: {
        auth_userid: resellerEmail,
        api_key: apiKey,
      },
    });
  }

  /**
   * Check domain availability
   * Supports single domain or multiple domains
   */
  async checkAvailability(
    domains: string[]
  ): Promise<DomainAvailabilityResult[]> {
    try {
      const domainString = domains.join(",");
      const response = await this.client.get("/available.json", {
        params: {
          domain: domainString,
        },
      });

      // Parse response and format results
      const results: DomainAvailabilityResult[] = [];

      if (response.data && typeof response.data === "object") {
        for (const domain of domains) {
          const key = domain.toLowerCase();
          const domainData = response.data[key];

          results.push({
            domain,
            available: domainData?.status === "available",
            price: domainData?.price,
            premiumPrice: domainData?.premiumPrice,
          });
        }
      }

      return results;
    } catch (error) {
      console.error("Error checking domain availability:", error);
      throw new Error("Failed to check domain availability");
    }
  }

  /**
   * Get pricing information for TLDs
   */
  async getPricing(tlds: string[]): Promise<PricingInfo[]> {
    try {
      const pricingData: PricingInfo[] = [];

      for (const tld of tlds) {
        const response = await this.client.get("/pricinginfo.json", {
          params: {
            tld: tld.replace(".", ""),
          },
        });

        if (response.data) {
          pricingData.push({
            tld,
            registrationPrice: response.data.registrationPrice || 0,
            renewalPrice: response.data.renewalPrice || 0,
            transferPrice: response.data.transferPrice || 0,
          });
        }
      }

      return pricingData;
    } catch (error) {
      console.error("Error fetching pricing:", error);
      throw new Error("Failed to fetch pricing information");
    }
  }

  /**
   * Register a domain
   */
  async registerDomain(
    request: DomainRegistrationRequest
  ): Promise<{ orderId: string; domain: string; status: string }> {
    try {
      const params = {
        domain: request.domain,
        years: request.years,
        reg_contact_id: request.registrantContactId,
        admin_contact_id: request.adminContactId,
        tech_contact_id: request.techContactId,
        billing_contact_id: request.billingContactId,
        ns: request.nameServers || [],
        privacy: request.privacyEnabled ? "Yes" : "No",
      };

      const response = await this.client.post("/register.json", params);

      return {
        orderId: response.data?.order_id || "",
        domain: request.domain,
        status: response.data?.status || "pending",
      };
    } catch (error) {
      console.error("Error registering domain:", error);
      throw new Error("Failed to register domain");
    }
  }

  /**
   * Get order details
   */
  async getOrderDetails(orderId: string): Promise<any> {
    try {
      const response = await this.client.get("/details.json", {
        params: {
          order_id: orderId,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching order details:", error);
      throw new Error("Failed to fetch order details");
    }
  }

  /**
   * Renew a domain
   */
  async renewDomain(
    orderId: string,
    years: number
  ): Promise<{ orderId: string; status: string }> {
    try {
      const response = await this.client.post("/renew.json", {
        order_id: orderId,
        years,
      });

      return {
        orderId: response.data?.order_id || orderId,
        status: response.data?.status || "pending",
      };
    } catch (error) {
      console.error("Error renewing domain:", error);
      throw new Error("Failed to renew domain");
    }
  }

  /**
   * Add a contact
   */
  async addContact(contactData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }): Promise<{ contactId: string }> {
    try {
      const response = await this.client.post("/contacts/add.json", {
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        address: contactData.address,
        city: contactData.city,
        state: contactData.state,
        zip: contactData.zip,
        country: contactData.country,
        type: "Contact",
      });

      return {
        contactId: response.data?.contact_id || "",
      };
    } catch (error) {
      console.error("Error adding contact:", error);
      throw new Error("Failed to add contact");
    }
  }

  /**
   * Suggest domain names based on keyword
   */
  async suggestDomains(keyword: string): Promise<string[]> {
    try {
      const response = await this.client.get("/suggest.json", {
        params: {
          keyword,
          limit: 10,
        },
      });

      return response.data?.suggestions || [];
    } catch (error) {
      console.error("Error suggesting domains:", error);
      return [];
    }
  }
}

// Export singleton instance (will be initialized with credentials)
let resellerClubAPI: ResellerClubAPI | null = null;

export function initializeResellerClub(
  resellerEmail: string,
  apiKey: string
): ResellerClubAPI {
  resellerClubAPI = new ResellerClubAPI(resellerEmail, apiKey);
  return resellerClubAPI;
}

export function getResellerClubAPI(): ResellerClubAPI {
  if (!resellerClubAPI) {
    throw new Error(
      "ResellerClub API not initialized. Call initializeResellerClub first."
    );
  }
  return resellerClubAPI;
}

export type { DomainAvailabilityResult, DomainRegistrationRequest, PricingInfo };