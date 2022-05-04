export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Payment = {
  date: Date;
  owed: number;
  paid: number;
  remaining: number;
};

export type CurrencySymbol = {
  major: string;
  minor: string;
};

export type Settings = {
  currency: CurrencySymbol;
  pocketMoneyPerWeek: number;
  payDay: DayOfWeek;
};

export type Child = {
  name: string;
  settings: Settings;
  payments: Payment[];
};

export type State = {
  currentChild: string;
  children: Map<string, Child>;
};
