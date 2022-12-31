import { FastifyInstance } from "fastify";
import { user } from "../app/controllers/user.controller";
import { $ref } from "../app/schemas/user.schema";


async function userRoutes(app: FastifyInstance) {

     app.get("/", {
          preHandler: [app.authenticate],
          schema: {
               response: { 200: $ref("userResponseSchema") }
          }
     }, user);
}

export default userRoutes;