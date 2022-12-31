import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import { response } from "./actions/response";
import { todoSchemas } from "./app/schemas/todo.schema";
import { userSchemas } from "./app/schemas/user.schema";
import fjwt, { JWT } from "@fastify/jwt";


import AppDataSource from "./config/database";
import authRoutes from "./routes/auth.route";
import todoRoutes from "./routes/todo.route";
import userRoutes from "./routes/user.route";
import app from "./config/app";
import logger from "./config/winston";



declare module "fastify" {
     interface FastifyRequest {
          jwt: JWT;
     }
     export interface FastifyInstance {
          authenticate: any;
     }
}

declare module "@fastify/jwt" {
     interface FastifyJWT {
          user: {
               id: string;
               email: string;
               name: string;
          };
     }
}
function bootstrap() {


     const application = Fastify({ logger: false });

     // auth jwt
     application.register(fjwt, {
          secret: app.appSecret,
     });

     application.decorate("authenticate", async (req: FastifyRequest, rep: FastifyReply) => {
          try {
               await req.jwtVerify();
          } catch (e) {
               rep.code(422).send(response(422, "token invalid"));
          }
     });
     application.addHook("preHandler", (req, reply, next) => {
          req.jwt = application.jwt;
          return next();
     });

     /**
      * schemas
     */
     for (let schemas of [...todoSchemas, ...userSchemas]) {
          application.addSchema(schemas);
     }
     /**
      * routes
     */
     application.get('/api', () => {
          return response(200, "pong");
     });
     application.register(authRoutes, { prefix: "/api/" });
     application.register(userRoutes, { prefix: "/api/user" });
     application.register(todoRoutes, { prefix: "/api/todos" });
     return application;
}

export default bootstrap;