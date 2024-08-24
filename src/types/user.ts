export type UserPayload = {
  id: string;
  depositCode?: string;
  email?: string;
  mobile?: string;

  firstName?: string;
  lastName?: string;
  department?: string;
  birthDate?: string | number;
};
