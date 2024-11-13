import { Edm } from "odata-v4-server";

export class Consumer {
  @Edm.Key
  @Edm.Int32
  id!: number;

  @Edm.String
  name!: string;
}
