import { ODataServer, odata } from "odata-v4-server";
import { ConsumerController } from "./controllers/ConsumerController.js";
import { EventController } from "./controllers/EventController.js";
import { ProducerController } from "./controllers/ProducerController.js";

@odata.namespace("odata-api")
@odata.controller(ProducerController, "Producers")
@odata.controller(ConsumerController, "Consumers")
@odata.controller(EventController, "Events")
export class MyODataServer extends ODataServer {}

const PORT = process.env.PORT || 3000;
MyODataServer.create("/odata", Number(PORT));
console.log(`OData service is running at http://localhost:${PORT}/odata`);
