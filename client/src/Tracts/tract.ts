export interface Tract {
  fid: number;
  geom: string;
  STATEFP: string;
  COUNTYFP: string;
  TRACTCE: string;
  GEOID: string;
  NAME: string;
  NAMELSAD: string;
  MTFCC: string;
  FUNCSTAT: string;
  ALAND: number;
  AWATER: number;
  INTPTLAT: string;
  INTPTLON: string;
}

export type TractKeys = keyof Tract;

export const tractDisplayKeys: TractKeys[] = [
  "STATEFP", "COUNTYFP", "TRACTCE", "GEOID", "MTFCC", "FUNCSTAT", "ALAND", "AWATER", "INTPTLAT", "INTPTLON"
];