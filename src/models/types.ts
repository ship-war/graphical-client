export type Primary = number | string | boolean;

export type Nullable<T> = T | null;
export type NullablePrimary = Nullable<Primary>;
export type NullableString = Nullable<string>;
export type NullableNumber = Nullable<number>;
export type NullableBoolean = Nullable<boolean>;

export type Opt<T> = T | undefined;
export type OptPrimary = Opt<Primary>;
export type OptString = Opt<string>;
export type OptNumber = Opt<number>;
export type OptBoolean = Opt<boolean>;

export type NullableOpt<T> = T | null | undefined;

export interface Map<T = any> {
  [key: string]: T;
}

export interface APIError {
  code: string;
  name: string;
  statusCode: number;
  path?: string;
  message: string;
}

export const ZeroVector: Vector<number> = { x: 0, y: 0 };

export interface Vector<T = number> {
  x: T;
  y: T;
}

export type ID = string;
