export enum DataTypes {
  Boolean,
  Null,
  Undefined,
  Number,
  String,
  Object
}

export class DeviceDataType {
  type: DataTypes;
  value: any;
}

export class Device {
  _id: string;
  name: string;
  location: string;
  type: string;
  token: string;
  session: string;
  data: DeviceDataType = new DeviceDataType();
  status = false;
}
