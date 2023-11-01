export enum WeekGrouping {
  Group445,
  Group544,
  Group454,
}
export enum LastDayOfWeek {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}
export enum LastMonthOfYear {
  January = 0,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}
export enum WeekCalculation {
  LastDayBeforeEOM,
  LastDayBeforeEomExceptLeapYear,
  LastDayNearestEOM,
  FirstBOWOfFirstMonth,
  PenultimateDayOfWeekNearestEOM,
}

export enum LeapYearStrategy {
  Restated,
  DropLastWeek,
  AddToPenultimateMonth,
}

export interface RetailCalendarOptions {
  weekGrouping: WeekGrouping
  lastDayOfWeek: LastDayOfWeek
  lastMonthOfYear: LastMonthOfYear | number
  weekCalculation: WeekCalculation
  /**
   * If LeapYearStrategy.Restated, 53rd week will belong to last month in year. First week won't belong to any month.
   * If LeapYearStrategy.DropLastWeek, 53rd week won't belong to any month in year. First week will belong to the first month.
   * Note: restated: true is a deprecated option that is replaced by LeapYearStrategy.Restated
   */
  leapYearStrategy?: LeapYearStrategy
  /** @deprecated use leapYearStrategy field instead */
  restated?: boolean
  beginningMonthIndex?: number
}

export const NRFCalendarOptions: RetailCalendarOptions = {
  weekGrouping: WeekGrouping.Group454,
  lastDayOfWeek: LastDayOfWeek.Saturday,
  lastMonthOfYear: LastMonthOfYear.January,
  weekCalculation: WeekCalculation.LastDayNearestEOM,
  leapYearStrategy: LeapYearStrategy.Restated,
}

export type RetailCalendarConstructor = {
  new (calendarOptions: RetailCalendarOptions, year: number): RetailCalendar
  getRetailCalendar: (
    calendarOptions: RetailCalendarOptions,
    year: number,
  ) => RetailCalendar
}

export interface RetailCalendar {
  leapYearStrategy: LeapYearStrategy
  year: number
  numberOfWeeks: number
  months: RetailCalendarMonth[]
  weeks: RetailCalendarWeek[]
  days: RetailCalendarDay[]
}

export interface RetailCalendarDay {
  weekOfYear: number
  monthOfYear: number // Starts at beginningMonthIndex
  dayOfWeek: number // 1 = First day of week, 7 = Last day of week
  dayOfMonth: number // Starts at 1
  dayOfYear: number // Starts at 1
  gregorianStartDate: Date
  gregorianEndDate: Date
  gregorianMonthOfYear: number // Starts at 1
  gregorianDayOfYear: number // Starts at 1
  gregorianDayOfMonth: number // Starts at 1
}

export interface RetailCalendarWeek {
  weekOfYear: number
  weekOfMonth: number
  weekOfQuarter: number
  monthOfYear: number
  quarterOfYear: number
  gregorianStartDate: Date
  gregorianEndDate: Date
}

export interface RetailCalendarMonth {
  monthOfYear: number
  quarterOfYear: number
  numberOfWeeks: number
  weeks: RetailCalendarWeek[]
  gregorianStartDate: Date
  gregorianEndDate: Date
}

export interface LastDayStrategy {
  getLastDayForGregorianLastDay(
    lastDayOfGregorianYear: Date,
    isoLastDayOfWeek: number,
  ): Date
}

export type WeekOfCalendar = {
  calendar: RetailCalendar
  week: RetailCalendarWeek
}

export {}

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeTheSameWeekAs(expected: any): R
    }
  }
}
