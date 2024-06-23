// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create categories
  const category1 = await prisma.category.create({
    data: {
      name: "Coiffure",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Esthétique",
    },
  });

  // Create services
  const service1 = await prisma.service.create({
    data: {
      name: "Coupe de cheveux homme",
      categoryId: category1.id,
    },
  });

  const service2 = await prisma.service.create({
    data: {
      name: "Soin du visage",
      categoryId: category2.id,
    },
  });

  // Create users
  const provider1 = await prisma.user.create({
    data: {
      email: "provider1@example.com",
      password: "password123",
      phoneNumber: "1234567890",
      address: "123 Main St",
      isProvider: true,
      firstName: "John",
      lastName: "Doe",
      providerServices: {
        create: [
          {
            serviceId: service1.id,
            duration: 60,
          },
        ],
      },
    },
  });

  const provider2 = await prisma.user.create({
    data: {
      email: "provider2@example.com",
      password: "password321",
      phoneNumber: "0987654321",
      address: "321 Elm St",
      isProvider: true,
      firstName: "Jane",
      lastName: "Smith",
      providerServices: {
        create: [
          {
            serviceId: service2.id,
            duration: 45,
          },
        ],
      },
    },
  });

  const client1 = await prisma.user.create({
    data: {
      email: "client1@example.com",
      password: "password456",
      phoneNumber: "1231231234",
      address: "456 Oak St",
      isProvider: false,
      firstName: "Alice",
      lastName: "Johnson",
    },
  });

  console.log("Database has been seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
