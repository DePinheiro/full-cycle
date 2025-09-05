import { DateRange } from "../value_objects/date_range";
import { Booking } from "./booking";
import { Property } from "./property";
import { User } from "./user";

// testdata buider

describe("Booking Entity", () => {

  it("deve criar uma instancia de Booking com todos os atributos", () => {
    let idBookingValid = "1";
    let idUserValid = "1";
    let nameUserValid = "nome teste";
    let idValid = "1";
    let nameValid = "casa de praia";
    let descriptionValid = "uma bela casa de paria";
    let maxGuestsValid = 4;
    let basePricePerNightValid = 200;
    let startDate = new Date("2024-12-20");
    let endDate = new Date("2024-12-25");
    let guestValid = 2;

    let user = new User(idUserValid, nameUserValid);
    let dateRange = new DateRange(startDate, endDate);
    let property = new Property(idValid, nameValid, descriptionValid, maxGuestsValid, basePricePerNightValid);


    let booking: Booking = new Booking(idBookingValid, user, property, dateRange, guestValid);

    expect(booking.getId()).toBe(idBookingValid);
    expect(booking.getProperty()).toBe(property);
    expect(booking.getUser()).toBe(user);
    expect(booking.getDateRange()).toBe(dateRange);
    expect(booking.getGuestCounts()).toBe(guestValid);

  });

  it.each`
        idBooking   | idUser | nameUser      | idProperty | nameProperty    | description                | maxGuests | basePrice | startDate       | endDate         | guests
        ${"101"}    | ${"1"} | ${"Ana"}      | ${"p1"}    | ${"Cabana"}     | ${"Bem aconchegante"}      | ${4}      | ${150}    | ${"2025-01-10"} | ${"2025-01-15"} | ${2}
        ${"102"}    | ${"2"} | ${"Bruno"}    | ${"p2"}    | ${"Apartamento"}| ${"Vista para o mar"}      | ${2}      | ${250}    | ${"2025-02-01"} | ${"2025-02-03"} | ${2}
        ${"103"}    | ${"3"} | ${"Carla"}    | ${"p3"}    | ${"Casa Grande"}| ${"Perfeito para família"} | ${10}     | ${500}    | ${"2025-03-20"} | ${"2025-03-22"} | ${8}
    `('deve criar uma instância de Booking com os dados fornecidos: id $idBooking, idUsuario $idUser e idPropriedade $idProperty',
    ({ idBooking, idUser, nameUser, idProperty, nameProperty, description, maxGuests, basePrice, startDate, endDate, guests }) => {

      const user = new User(idUser, nameUser);
      const property = new Property(idProperty, nameProperty, description, maxGuests, basePrice);
      const dateRange = new DateRange(new Date(startDate), new Date(endDate));

      const booking: Booking = new Booking(idBooking, user, property, dateRange, guests);

      expect(booking.getId()).toBe(idBooking);
      expect(booking.getUser()).toBe(user);
      expect(booking.getProperty()).toBe(property);
      expect(booking.getDateRange()).toBe(dateRange);
      expect(booking.getGuestCounts()).toBe(guests);
    });

  // it("deve lancar erro se o numero de hospedes for zero ou menor", () => {

  // });

  it.each`
    idBooking   | idUser | nameUser  | idProperty | nameProperty | description              | maxGuests | basePrice | startDate       | endDate         | guests  | shouldThrowError
    ${"101"}    | ${"1"} | ${"Ana"}  | ${"p1"}    | ${"Cabana"}  | ${"Bem aconchegante"}    | ${5}      | ${150}    | ${"2025-01-10"} | ${"2025-01-15"} | ${0}    | ${true}
    ${"102"}    | ${"2"} | ${"Bruno"}| ${"p2"}    | ${"Apto"}    | ${"Vista para o mar"}    | ${5}      | ${250}    | ${"2025-02-01"} | ${"2025-02-03"} | ${-1}   | ${true}
    ${"103"}    | ${"3"} | ${"Carla"}| ${"p3"}    | ${"Casa"}    | ${"Perfeito p/ família"} | ${5}      | ${500}    | ${"2025-03-20"} | ${"2025-03-22"} | ${5}    | ${false}
    ${"104"}    | ${"4"} | ${"João"} | ${"p4"}    | ${"Chalé"}   | ${"No meio do mato"}     | ${5}      | ${100}    | ${"2025-04-01"} | ${"2025-04-02"} | ${5}    | ${false}
  `('deve lancar erro se o numero de hospedes for zero ou menor: $guests',
    ({ idBooking, idUser, nameUser, idProperty, nameProperty, description, maxGuests, basePrice, startDate, endDate, guests, shouldThrowError }) => {

      const user = new User(idUser, nameUser);
      const property = new Property(idProperty, nameProperty, description, maxGuests, basePrice);
      const dateRange = new DateRange(new Date(startDate), new Date(endDate));

      if (shouldThrowError) {
        expect(() => {
          new Booking(idBooking, user, property, dateRange, guests);
        }).toThrow("numero de hospedes deve ser maior que 0");
      } else {
        expect(() => {
          new Booking(idBooking, user, property, dateRange, guests);
        }).not.toThrow();
      }
    });

  it.each`
    idBooking   | idUser | nameUser  | idProperty | nameProperty | description              | maxGuests | basePrice | startDate       | endDate         | guests  | shouldThrowError
    ${"101"}    | ${"1"} | ${"Ana"}  | ${"p1"}    | ${"Cabana"}  | ${"Bem aconchegante"}    | ${5}      | ${150}    | ${"2025-01-10"} | ${"2025-01-15"} | ${5}    | ${false}
    ${"102"}    | ${"2"} | ${"Bruno"}| ${"p2"}    | ${"Apto"}    | ${"Vista para o mar"}    | ${5}      | ${250}    | ${"2025-02-01"} | ${"2025-02-03"} | ${7}    | ${true}
    ${"103"}    | ${"3"} | ${"Carla"}| ${"p3"}    | ${"Casa"}    | ${"Perfeito p/ família"} | ${5}      | ${500}    | ${"2025-03-20"} | ${"2025-03-22"} | ${7}    | ${true}
    ${"104"}    | ${"4"} | ${"João"} | ${"p4"}    | ${"Chalé"}   | ${"No meio do mato"}     | ${5}      | ${100}    | ${"2025-04-01"} | ${"2025-04-02"} | ${10}   | ${true}
    ${"105"}    | ${"2"} | ${"Bruno"}| ${"p2"}    | ${"Apto"}    | ${"Vista para o mar"}    | ${5}      | ${250}    | ${"2025-02-01"} | ${"2025-02-03"} | ${6}    | ${true}
  `('deve lancar erro se o numero de hospedes acima do permitido invalido: $guests',
    ({ idBooking, idUser, nameUser, idProperty, nameProperty, description, maxGuests, basePrice, startDate, endDate, guests, shouldThrowError }) => {

      const user = new User(idUser, nameUser);
      const property = new Property(idProperty, nameProperty, description, maxGuests, basePrice);
      const dateRange = new DateRange(new Date(startDate), new Date(endDate));

      if (shouldThrowError) {
        expect(() => {
          new Booking(idBooking, user, property, dateRange, guests);
        }).toThrow(`ultrapassou numero maximo de hospedes, limite: ${maxGuests}`);
      } else {
        expect(() => {
          new Booking(idBooking, user, property, dateRange, guests);
        }).not.toThrow();
      }
    });

});
