-- AlterTable
ALTER TABLE "Salon" ADD COLUMN     "autoAcceptAppointments" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isInVacancyMode" BOOLEAN NOT NULL DEFAULT false;
