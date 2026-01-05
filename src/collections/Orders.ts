import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    read: async ({ req }) => {
      // Super admins can read all orders
      if (isSuperAdmin(req.user)) return true;
      
      // Regular users can only read orders associated with their tenant
      const userTenantIds = req.user?.tenants
        ?.map(t => typeof t.tenant === 'object' ? t.tenant.id : t.tenant)
        ?.filter(id => id && typeof id === 'string') || [];
      
      if (userTenantIds.length === 0) return false;
      
      // Get the stripe account IDs for the user's tenants
      const payload = req.payload;
      const tenants = await payload.find({
        collection: 'tenants',
        where: {
          id: {
            in: userTenantIds,
          },
        },
        depth: 0,
      });
      
      const userStripeAccountIds = tenants.docs.map(tenant => tenant.stripeAccountId);
      
      return {
        stripeAccountId: {
          in: userStripeAccountIds,
        },
      };
    },
    create: async ({req}) => {
      // Super admins can create all orders
      if (isSuperAdmin(req.user)) return true;
      
      // Regular users can create orders associated with their tenant
      const userTenantIds = req.user?.tenants
        ?.map(t => typeof t.tenant === 'object' ? t.tenant.id : t.tenant)
        ?.filter(id => id && typeof id === 'string') || [];
      
      if (userTenantIds.length === 0) return false;
      
      // Get the stripe account IDs for the user's tenants
      const payload = req.payload;
      const tenants = await payload.find({
        collection: 'tenants',
        where: {
          id: {
            in: userTenantIds,
          },
        },
        depth: 0,
      });
      
      const userStripeAccountIds = tenants.docs.map(tenant => tenant.stripeAccountId);
      
      return {
        stripeAccountId: {
          in: userStripeAccountIds,
        },
      };
    },
    update: async ({req}) => {
      // Super admins can update all orders
      if (isSuperAdmin(req.user)) return true;
      
      // Regular users can only update orders associated with their tenant
      const userTenantIds = req.user?.tenants
        ?.map(t => typeof t.tenant === 'object' ? t.tenant.id : t.tenant)
        ?.filter(id => id && typeof id === 'string') || [];
      
      if (userTenantIds.length === 0) return false;
      
      // Get the stripe account IDs for the user's tenants
      const payload = req.payload;
      const tenants = await payload.find({
        collection: 'tenants',
        where: {
          id: {
            in: userTenantIds,
          },
        },
        depth: 0,
      });
      
      const userStripeAccountIds = tenants.docs.map(tenant => tenant.stripeAccountId);
      
      return {
        stripeAccountId: {
          in: userStripeAccountIds,
        },
      };
    },
    delete: ({req}) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: false,
    },
    {
      name: "stripeCheckoutSessionId",
      type: "text",
      required: true,
      admin: {
        description: "Stripe checkout session associated with the order"
      }
    },
    {
      name: "stripeAccountId",
      type: "text",
      admin: {
        description: "Stripe account associated with order!"
      }
    },
  ],
};
