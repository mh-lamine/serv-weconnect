const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createProviderService = async (id, role, data) => {
  const { service, stripeAccountId } = data;
  const ref = role === "PRO" ? "proId" : role === "SALON" ? "salonId" : null;
  let stripePriceId = null;

  if (stripeAccountId) {
    try {
      const { id } = await stripe.prices.create(
        {
          currency: "eur",
          unit_amount: service.price * 100,
          product_data: {
            name: service.name,
          },
        },
        { stripeAccount: stripeAccountId }
      );
      stripePriceId = id;
    } catch (error) {
      console.log(error);
    }
  }

  const body = {
    ...service,
    [ref]: id,
    stripePriceId,
  };

  return await prisma.providerService.create({
    data: { ...body },
  });
};

exports.updateProviderService = async (proId, serviceId, data) => {
  const { providerCategoryId } = data;
  await prisma.providerService.update({
    where: {
      id: serviceId,
      OR: [{ proId }, { salonId: proId }],
    },
    data: {
      ...data,
    },
  });
  const activeServices = await prisma.providerService.findMany({
    where: {
      OR: [{ proId }, { salonId: proId }],
      providerCategoryId,
      isActive: true,
    },
  });
  if (activeServices.length === 0) {
    await prisma.providerCategory.update({
      where: {
        id: providerCategoryId,
        OR: [{ proId }, { salonId: proId }],
      },
      data: {
        isActive: false,
      },
    });
  }
};

exports.deleteProviderService = async (proId, serviceId) => {
  return await prisma.providerService.delete({
    where: {
      id: serviceId,
      OR: [{ proId }, { salonId: proId }],
    },
  });
};
