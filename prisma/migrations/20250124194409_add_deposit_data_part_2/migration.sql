-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Pro" ADD COLUMN     "defaultPaymentOption" "PaymentOption" NOT NULL DEFAULT 'ON_SITE';

-- AlterTable
ALTER TABLE "Salon" ADD COLUMN     "defaultPaymentOption" "PaymentOption" NOT NULL DEFAULT 'ON_SITE';
