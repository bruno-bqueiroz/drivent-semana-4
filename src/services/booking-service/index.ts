import bookingRepository from "@/repositories/booking-repository";
import hotelRepository from "@/repositories/hotel-repository";

import { forbiddenError, notFoundError } from "@/errors";

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBookings(userId);
  if(!booking) throw notFoundError();
  return booking;
}

async function postBooking(userId: number, roomId: number, ) {
  const temRoom = await hotelRepository.findRoomByRoomId(roomId);
  if(!temRoom) throw notFoundError();
  if(temRoom.Booking.length >= temRoom.capacity) throw forbiddenError();
  const booking = await bookingRepository.insertBookings(userId, roomId);
  if(!booking) throw forbiddenError();
  return booking;
}

const bookingService = {
  getBooking,
  postBooking
};
  
export default bookingService;
  
