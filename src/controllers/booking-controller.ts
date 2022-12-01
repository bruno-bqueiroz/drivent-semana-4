import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(Number(userId));
    
    //LEMBRAR DE MUDAR RETORNO (APENAS bookingId COM OBJ Room
    //{ bookingId: booking.id, Room: booking.Room }

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const { roomId } = req.body;

  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const booking = await bookingService.postBooking(Number(userId), Number(roomId));

    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "forbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
}

