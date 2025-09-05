import { setCommentRange, transform } from "typescript";
import { DateRange } from "../value_objects/date_range";
import { Booking } from "./booking";

export class Property {
  private readonly id: string;
  private readonly name: string;
  private readonly description: string;
  private readonly maxGuests: number;
  private readonly basePricePerNight: number;
  private readonly bookings: Booking[] = [];

  constructor(
    id: string, name: string,
    description: string, maxGuests: number,
    basePricePerNight: number
  ) {

    if (!name) {
      throw Error("nome nao pode ser vazio.")
    }

    if (maxGuests <= 0) {
      throw Error("numero maximo de hospedes tem que ser maior que zero.")
    }

    this.id = id;
    this.name = name;
    this.description = description;
    this.maxGuests = maxGuests;
    this.basePricePerNight = basePricePerNight;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;

  }

  getMaxGuests(): number {
    return this.maxGuests;
  }

  getBasePricePerNight(): number {
    return this.basePricePerNight;
  }

  validateGuestCount(guestCount: number): void {
    if (guestCount > this.maxGuests) {
      throw Error(`ultrapassou numero maximo de hospedes, limite: ${this.maxGuests}.`);
    }
  }

  calculateTotalPrice(dateRange: DateRange): number {
    let totalNights = dateRange.getTotalNights();
    let totalValue = totalNights * this.basePricePerNight;

    if (totalNights >= 7) {
      totalValue = totalValue * 0.9
    }

    return totalValue;
  }

  isVailable(dateRange: DateRange): boolean {
    return !this.bookings.some(
      (booking) =>
        booking.getStatus() === "CONFIRMADO" &&
        booking.getDateRange().overLaps(dateRange)
    );

  }

  addBooking(booking: Booking): void {
    this.bookings.push(booking);
  }

  getBookings(): Booking[] {
    return [...this.bookings];
  }
}