const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

async function migrateProviders() {
  try {
    const users = await client.user.findMany({
      where: { isProvider: true },
    });

    console.log(`${users.length} utilisateurs trouvés à migrer.`);

    for (const user of users) {
      // Créer un nouveau Provider
      const newProvider = await client.pro.create({
        data: {
          address: user.address,
          email: user.email,
          phoneNumber: user.phoneNumber,
          contactMethods: user.contactMethods,
          password: user.password,
          name: user.providerName,
          bookingTerms: user.bookingTerms,
          isFreeTrial: user.isFreeTrial,
          daysLeftInTrial: user.daysLeftInTrial,
          plan: user.plan,
          isInVacancyMode: user.isInVacancyMode,
          autoAcceptAppointments: user.autoAcceptAppointments,
          profilePicture: user.profilePicture,
          coverImage: user.coverImage,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });

      // Migrer les appointements
      await client.appointment.updateMany({
        where: { providerId: user.id },
        data: { proId: newProvider.id },
      });

      // Migrer les catégories
      await client.providerCategory.updateMany({
        where: { providerId: user.id },
        data: { proId: newProvider.id },
      });

      // Migrer les services
      await client.providerService.updateMany({
        where: { providerId: user.id },
        data: { proId: newProvider.id },
      });

      // Migrer les disponibilités
      await client.availability.updateMany({
        where: { providerId: user.id },
        data: { proId: newProvider.id },
      });

      await client.specialAvailability.updateMany({
        where: { providerId: user.id },
        data: { proId: newProvider.id },
      });

      await client.unavailability.updateMany({
        where: { providerId: user.id },
        data: { proId: newProvider.id },
      });

      console.log(`Utilisateur avec l'ID ${user.id} migré.`);
    }

    console.log("Migration des providers terminée !");
  } catch (error) {
    console.error("Erreur pendant la migration :", error);
    process.exit(1);
  } finally {
    await client.$disconnect();
  }
}

migrateProviders();
