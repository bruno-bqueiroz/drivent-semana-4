import { prisma } from "@/config";

async function findBookings(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId
    },
    include: {
      Room: true
    }
  });
}

async function insertBookings(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId,
    }
  });
}

const bookingRepository = {
  findBookings,
  insertBookings

};

export default bookingRepository;
