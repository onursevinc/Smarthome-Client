export enum UserType {
  Device,
  Gateway,
  Operator
}

export class User {
  _id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username?: string;
  admin?: boolean;
  session?: string;
  type: UserType;
  created: Date;
  updated: Date;
}
