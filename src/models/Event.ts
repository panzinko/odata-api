import { Edm } from "odata-v4-server";

export class Event {
  @Edm.Key
  @Edm.Int32
  id!: number;

  @Edm.String
  event_name!: string;

  @Edm.Int32
  producer_id!: number;

  @Edm.Int32
  consumer_id!: number;
}
