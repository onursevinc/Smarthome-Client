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
  type: UserType;
  created_at: Date;
  updated_at: Date;
}
