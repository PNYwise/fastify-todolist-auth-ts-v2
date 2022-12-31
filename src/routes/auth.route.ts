import { FastifyInstance } from "fastify";
import { login, register } from "../app/controllers/auth.controller";
import { $ref } from "../app/schemas/user.schema";


async function authRoutes(app: FastifyInstance) {

     // register
     app.post("register", {
          schema: {
               body: $ref("userSchema"),
               response: { 201: $ref("userResponseSchema") }
          },
     }, register);

     // login
     app.post("login", {
          schema: {
               body: $ref("userLoginSchema"),
               response: { 200: $ref("loginResponseSchema") }
          },
     }, login);
}

export default authRoutes;