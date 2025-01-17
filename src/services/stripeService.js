const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.startOnboarding = async (id) => {
  const { email, stripeConnectedAccountId } = await prisma.salon.findUnique({
    where: { id },
  });

  let connectedAccountId = stripeConnectedAccountId;

  if (!connectedAccountId) {
    const { id: newConnectedAccountId } = await stripe.accounts.create({
      country: "FR",
      default_currency: "EUR",
      email,
      type: "standard",
    });

    await prisma.salon.update({
      where: { id },
      data: {
        stripeConnectedAccountId: newConnectedAccountId,
      },
    });

    connectedAccountId = newConnectedAccountId;
  }

  const { url: onboardingUrl } = await stripe.accountLinks.create({
    account: connectedAccountId,
    refresh_url: "https://www.weconnect-rdv.fr/expired-account-link",
    return_url: "https://www.weconnect-rdv.fr/success-account-link",
    type: "account_onboarding",
  });

  return onboardingUrl;
};
