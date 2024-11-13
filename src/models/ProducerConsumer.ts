import { Edm } from "odata-v4-server";

export class ProducerConsumer {
  @Edm.Int32
  producer_id!: number;

  @Edm.Int32
  consumer_id!: number;
}
