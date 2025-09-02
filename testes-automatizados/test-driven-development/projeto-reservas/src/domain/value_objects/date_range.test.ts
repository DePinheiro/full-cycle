import { DateRange } from "./date_range";

describe('DateRange Value Object', () => {

  it("deve lancar erro se a data de termino for antes da data de incio", () => {
    expect(() => {
      new DateRange(new Date("2024-12-25"), new Date('2024-12-20'));
    }).toThrow('A data de termino deve ser maior que a data de inicio');
  });

  it("deve criar uma instancia de DateRange com data de inicio e termino e verificar retorno das datas", () => {
    let startDate = new Date("2024-12-20");
    let endDate = new Date("2024-12-25");
    let dateRange = new DateRange(startDate, endDate);
    expect(dateRange.getStartDate()).toEqual(startDate);
    expect(dateRange.getEndDate()).toEqual(endDate);
  });

  it("deve calcular o total de noite corretamente", () => {
    let startDate = new Date("2024-12-20");
    let endDate = new Date("2024-12-25");
    let dateRange = new DateRange(startDate, endDate);

    let totalNights = dateRange.getTotalNights();

    expect(totalNights).toBe(5);
  });

  // testes para multiplas entradas
  it.each`
      startDate      | endDate        | expectedNights
      ${"2024-12-20"} | ${"2024-12-25"} | ${5}
      ${"2024-01-01"} | ${"2024-01-02"} | ${1}
      ${"2024-03-10"} | ${"2024-03-20"} | ${10}
    `('deve calcular o total de noites de $startDate a $endDate corretamente', ({ startDate, endDate, expectedNights }) => {
    const dateRange = new DateRange(new Date(startDate), new Date(endDate));
    expect(dateRange.getTotalNights()).toBe(expectedNights);
  });

  it("deve verificar se intervalo de datas se sobrepoem", () => {
    let dateRange1 = new DateRange(new Date("2024-12-20"), new Date('2024-12-25'));
    let dateRange2 = new DateRange(new Date("2024-12-2"), new Date('2024-12-28'));

    let overLaps = dateRange1.overLaps(dateRange2);

    expect(overLaps).toBe(true);
  });

  it.each`
    start1       | end1         | start2       | end2         | expected
    ${"2024-12-20"} | ${"2024-12-25"} | ${"2024-12-20"} | ${"2024-12-28"} | ${true} 
    ${"2024-12-20"} | ${"2024-12-25"} | ${"2024-12-24"} | ${"2024-12-28"} | ${true} 
    ${"2024-12-20"} | ${"2024-12-30"} | ${"2024-12-22"} | ${"2024-12-25"} | ${true} 
    ${"2024-12-20"} | ${"2024-12-25"} | ${"2024-12-26"} | ${"2024-12-28"} | ${false} 
    ${"2024-12-20"} | ${"2024-12-25"} | ${"2024-12-15"} | ${"2024-12-19"} | ${false} 
    `('deve verificar se os intervalos $start1-$end1 e $start2-$end2 se sobrepõem', ({ start1, end1, start2, end2, expected }) => {
    const dateRange1 = new DateRange(new Date(start1), new Date(end1));
    const dateRange2 = new DateRange(new Date(start2), new Date(end2));
    expect(dateRange1.overLaps(dateRange2)).toBe(expected);
  });

  it("deve lancar erro se data de inicio e fim forem iguais", () => {
    let date = new Date("2025-12-24");

    expect(() => {
      new DateRange(date, date);
    }).toThrow('A data de termino deve ser maior que a data de inicio');

  });
});