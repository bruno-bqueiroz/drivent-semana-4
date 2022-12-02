import bookingRepository from "@/repositories/booking-repository";
import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { forbiddenError, notFoundError } from "@/errors";

async function listHotels(userId: number) {
  //Tem enrollment?
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw forbiddenError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }
}

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBookingsWithRoom(userId);
  if(!booking) throw notFoundError();
  return booking;
}

async function postBooking(userId: number, roomId: number, ) {
  await listHotels(userId);

  const temRoom = await hotelRepository.findRoomByRoomId(roomId);

  if(!temRoom) throw notFoundError();
  if(temRoom.Booking.length >= temRoom.capacity) throw forbiddenError();

  const booking = await bookingRepository.insertBookings(userId, roomId);
  
  if(!booking) throw forbiddenError();
  return booking;
}

async function putBooking(userId: number, roomId: number, bookingId: number ) {
  await listHotels(userId);

  const temRoom = await hotelRepository.findRoomByRoomId(roomId);
  if(!temRoom) throw notFoundError();
  if(temRoom.Booking.length >= temRoom.capacity) throw forbiddenError();

  const temBooking = await bookingRepository.findBooking(bookingId);
  if (!temBooking) throw forbiddenError();

  const updateBooking = await bookingRepository.putBooking(bookingId, roomId);
  
  if(!updateBooking) throw forbiddenError();
  
  return updateBooking;
}

const bookingService = {
  getBooking,
  postBooking,
  putBooking
  
};
  
export default bookingService;
  
