export class User {
  private readonly name: string;
  private readonly id: string;

  constructor(id: string, name: string) {
    if (!name) {
      throw new Error("nome nao pode ser vazio.")
    }

    if (!id) {
      throw new Error("id nao pode ser vazio.")
    }

    this.id = id;
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  getId(): string {
    return this.id;
  }


}