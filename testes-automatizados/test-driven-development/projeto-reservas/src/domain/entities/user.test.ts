import { User } from "./user";

describe('User Ententy', () => {
  it("deve cria uma instancia de user com Id e Nome", () => {
    let idValid = "1";
    let nameValid = "nome teste";

    let user = new User(idValid, nameValid);
    expect(user.getId()).toEqual(idValid)
    expect(user.getName()).toEqual(nameValid)
  })

  it("deve lancar erro se nome vazio", () => {
    let idValid = "1";
    let nameInvalid = "";

    expect(() => {
      new User(idValid, nameInvalid);
    }).toThrow("nome nao pode ser vazio.");

  });

  it("deve lancar erro se id vazio", () => {
    let idInvalid = "";
    let nameValid = "teste";

    expect(() => {
      new User(idInvalid, nameValid);
    }).toThrow("id nao pode ser vazio.");

  });
});