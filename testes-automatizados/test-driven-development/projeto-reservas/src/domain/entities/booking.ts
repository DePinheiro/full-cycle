import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";
import { User } from "./user";

export class Booking {
  private readonly id: string;
  private readonly user: User;
  private readonly property: Property;
  private readonly dateRange: DateRange;
  private readonly guestCounts: number;
  private readonly Status: "CONFIRMADO" | "CANCELADO" = "CONFIRMADO";
  private totalPrice: number = 0;

  constructor(id: string, user: User, property: Property, dateRange: DateRange, guestCounts: number) {
    if (guestCounts <= 0) {
      throw new Error("numero de hospedes deve ser maior que 0");
    }

    property.validateGuestCount(guestCounts);

    if (!property.isVailable(dateRange)) {
      throw new Error("propriedade nao disponivel para o periodo selecioando");
    }

    this.id = id;
    this.user = user;
    this.property = property;
    this.dateRange = dateRange;
    this.guestCounts = guestCounts;
    this.totalPrice = property.calculateTotalPrice(dateRange)

    property.addBooking(this);
  }

  getId(): string {
    return this.id;
  }

  getUser(): User {
    return this.user;
  }

  getProperty(): Property {
    return this.property;
  }

  getDateRange(): DateRange {
    return this.dateRange;
  }

  getGuestCounts(): number {
    return this.guestCounts;
  }

  getStatus(): string {
    return this.Status;
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }

}