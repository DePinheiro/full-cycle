import { Property } from "./property";

describe("Property Entity", () => {
  it("deve criar uma instancia Properties com todos os atributos", () => {
    let idValid = "1";
    let nameValid = "casa de praia";
    let descriptionValid = "uma bela casa de paria";
    let maxGuestsValid = 4;
    let basePricePerNightValid = 200;

    let property = new Property(
      idValid,
      nameValid,
      descriptionValid,
      maxGuestsValid,
      basePricePerNightValid
    );

    expect(property.getId()).toBe(idValid);
    expect(property.getName()).toBe(nameValid);
    expect(property.getDescription()).toBe(descriptionValid);
    expect(property.getMaxGuests()).toBe(maxGuestsValid);
    expect(property.getBasePricePerNight()).toBe(basePricePerNightValid);
  });

  it("deve lancar erro se nome for vazio", () => {
    let idValid = "1";
    let nameInvalid = "";
    let descriptionValid = "uma bela casa de paria";
    let maxGuestsValid = 4;
    let basePricePerNightValid = 200;

    expect(() => {
      new Property(
        idValid,
        nameInvalid,
        descriptionValid,
        maxGuestsValid,
        basePricePerNightValid
      );
    }).toThrow("nome nao pode ser vazio.");
  });

  it("deve lancar erro se o numero maximo de hospedes for menor que 0", () => {
    let idValid = "1";
    let nameValid = "descricao";
    let descriptionValid = "uma bela casa de paria";
    let maxGuestsInvalid = 0;
    let basePricePerNightValid = 200;

    expect(() => {
      new Property(
        idValid,
        nameValid,
        descriptionValid,
        maxGuestsInvalid,
        basePricePerNightValid
      );
    }).toThrow("numero maximo de hospedes tem que ser maior que zero.");
  });


  it.each([
    [0, "deve lancar erro se o numero maximo de hospedes for 0"],
    [-1, "deve lancar erro se o numero maximo de hospedes for negativo"],
    [-100, "deve lancar erro se o numero maximo de hospedes for muito negativo"]
  ])("%s", (maxGuestsInvalid, testDescription) => {
    let idValid = "1";
    let nameValid = "descricao";
    let descriptionValid = "uma bela casa de paria";
    let basePricePerNightValid = 200;

    expect(() => {
      new Property(
        idValid,
        nameValid,
        descriptionValid,
        maxGuestsInvalid,
        basePricePerNightValid
      );
    }).toThrow("numero maximo de hospedes tem que ser maior que zero.");
  });

  it("deve validar numero maximo de hospedes", () => {
    let idValid = "1";
    let nameValid = "descricao";
    let descriptionValid = "uma bela casa de paria";
    let maxGuestsInvalid = 5;
    let basePricePerNightValid = 200;

    let property = new Property(
      idValid,
      nameValid,
      descriptionValid,
      maxGuestsInvalid,
      basePricePerNightValid
    );

    expect(() => {
      property.validateGuestCount(6)
    }).toThrow("ultrapassou numero maximo de hospedes, limite 5.");

  });


});