export interface salatApiResponse {
  code: number;
  status: string;
  data: Datum[];
}

export interface Datum {
  timings: Timings;
  date: DateClass;
  meta: Meta;
}

export interface DateClass {
  readable: string;
  timestamp: string;
  gregorian: Gregorian;
  hijri: Hijri;
}

export interface Gregorian {
  date: string;
  format: Format;
  day: string;
  weekday: GregorianWeekday;
  month: GregorianMonth;
  year: string;
  designation: Designation;
}

export interface Designation {
  abbreviated: Abbreviated;
  expanded: Expanded;
}

export enum Abbreviated {
  Ad = 'AD',
  Ah = 'AH',
}

export enum Expanded {
  AnnoDomini = 'Anno Domini',
  AnnoHegirae = 'Anno Hegirae',
}

export enum Format {
  DDMmYyyy = 'DD-MM-YYYY',
}

export interface GregorianMonth {
  number: number;
  en: PurpleEn;
}

export enum PurpleEn {
  October = 'October',
}

export interface GregorianWeekday {
  en: string;
}

export interface Hijri {
  date: string;
  format: Format;
  day: string;
  weekday: HijriWeekday;
  month: HijriMonth;
  year: string;
  designation: Designation;
  holidays: string[];
}

export interface HijriMonth {
  number: number;
  en: FluffyEn;
  ar: Ar;
}

export enum Ar {
  رَبيعالأوّل = 'رَبيع الأوّل',
  رَبيعالثاني = 'رَبيع الثاني',
}

export enum FluffyEn {
  RabīAlAwwal = 'Rabīʿ al-awwal',
  RabīAlThānī = 'Rabīʿ al-thānī',
}

export interface HijriWeekday {
  en: string;
  ar: string;
}

export interface Meta {
  latitude: number;
  longitude: number;
  timezone: Timezone;
  method: Method;
  latitudeAdjustmentMethod: LatitudeAdjustmentMethod;
  midnightMode: MidnightMode;
  school: MidnightMode;
  offset: { [key: string]: number };
}

export enum LatitudeAdjustmentMethod {
  None = 'NONE',
}

export interface Method {
  id: number;
  name: Name;
  params: Params;
}

export enum Name {
  MoonsightingCommitteeWorldwideMoonsightingCOM = 'Moonsighting Committee Worldwide (Moonsighting.com)',
}

export interface Params {
  shafaq: Shafaq;
}

export enum Shafaq {
  General = 'general',
}

export enum MidnightMode {
  Standard = 'STANDARD',
}

export enum Timezone {
  EuropeBrussels = 'Europe/Brussels',
}

export interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}
