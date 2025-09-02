export class DateRange {

  private readonly startDate: Date;
  private readonly endDate: Date;

  constructor(startDate: Date, endDate: Date) {
    this.validateDates(startDate, endDate)
    this.startDate = startDate;
    this.endDate = endDate;
  }

  private validateDates(startDate: Date, endDate: Date) {
    if (endDate <= startDate) {
      throw new Error('A data de termino deve ser maior que a data de inicio');
    }
  }


  getStartDate() {
    return this.startDate;
  }

  getEndDate() {
    return this.endDate;
  }

  getTotalNights(): number {
    let diffTime = this.endDate.getTime() - this.startDate.getTime();
    let timeStampForOneDay = 1000 * 3600 * 24;
    return Math.ceil(diffTime / timeStampForOneDay);
  }

  overLaps(other: DateRange): boolean {
    let overLaps: boolean;
    overLaps = this.startDate <= other.getEndDate() && this.endDate >= other.getStartDate()
    return overLaps;
  }

}