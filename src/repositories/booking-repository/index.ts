import { prisma } from "@/config";

async function findBookingsWithRoom(userId: number) {
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

async function findBooking(bookingId: number) {
  return await prisma.booking.findFirst({
    where: {
      id: bookingId
    }
  });
}

async function putBooking(bookingId: number, roomId: number) {
  return await prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      roomId: roomId,
    }
  });
}

const bookingRepository = {
  findBookingsWithRoom,
  findBooking,
  insertBookings,
  putBooking

};

export default bookingRepository;
