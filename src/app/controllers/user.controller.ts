import { FastifyReply, FastifyRequest } from "fastify";
import { response, responseData, responseError } from "../../actions/response";
import logger from "../../config/winston";
import { findById } from "../services/user.service";




// userbyid
export async function user(req: FastifyRequest, rep: FastifyReply): Promise<void> {
     try {
          const data = await findById(req.user.id);
          if (data == null) {
               rep.code(404).send(response(404, `data with id  ${req.user.id} not found`));
          }
          rep.code(200).send(responseData(200, "data found", data));
     } catch (error) {
          logger.error(error);
          rep.code(500).send(response(500, "internal server error"));
     }
}