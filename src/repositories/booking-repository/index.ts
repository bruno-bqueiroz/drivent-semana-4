import { prisma } from "@/config";

async function findBookings(userId: number) {
  return prisma.booking.findMany({
    where: {
      userId: userId
    },
    include: {
      Room: true
    }
  });
}

const bookingRepository = {
  findBookings,

};

export default bookingRepository;
