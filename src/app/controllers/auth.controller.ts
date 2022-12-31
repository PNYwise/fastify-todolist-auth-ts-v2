import { FastifyReply, FastifyRequest } from "fastify";
import error from "../../actions/errorValidation";
import { response, responseData, responseError } from "../../actions/response";
import { verifyPassword } from "../../config/jwt";
import { UserInput, UserLoginInput } from "../schemas/user.schema";
import { create, findByEmail } from "../services/user.service";



export async function register(req: FastifyRequest<{ Body: UserInput }>, rep: FastifyReply): Promise<void> {
     if (req.validationError) {
          rep.code(400).send(responseError(400, "unvalidated", error(req.validationError.validation)));
     }
     try {
          const email = await findByEmail(req.body.email);
          if (email) {
               rep.code(400).send(response(400, "email already exist"));
          }
          const data = await create(req.body)
          rep.code(201).send(responseData(201, "registered", data));
     } catch (err) {
          console.log(err);
          rep.code(500).send(response(500, "internal server error"));
     }
}


export async function login(req: FastifyRequest<{ Body: UserLoginInput }>, rep: FastifyReply): Promise<void> {
     if (req.validationError) {
          rep.code(400).send(responseError(400, "unvalidated", error(req.validationError.validation)));
     }
     try {
          const body = req.body;
          // find by email
          const user = await findByEmail(body.email);
          if (user == null) {
               return rep.code(401).send(response(401, "Invalid email or password"));
          }
          // verify password
          const correctPassword = verifyPassword({
               candidatePassword: body.password,
               salt: user.salt,
               hash: user.password,
          });

          if (correctPassword) {
               const { password, salt, todos, ...rest } = user;
               // generate access token
               rep.code(200).send(responseData(200, "login success", {
                    accessToken: req.jwt.sign(rest, {
                         expiresIn: "1d"
                    })
               }));
          }
          rep.code(401).send(response(401, "Invalid email or password"));

     } catch (err) {
          rep.code(500).send(response(500, "internal server error"));
     }
}