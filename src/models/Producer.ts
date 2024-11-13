import { Edm } from "odata-v4-server";

export class Producer {
  @Edm.Key
  @Edm.Int32
  id!: number;

  @Edm.String
  name!: string;
}
