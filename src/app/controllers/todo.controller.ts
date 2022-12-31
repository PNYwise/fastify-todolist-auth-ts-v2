import { FastifyReply, FastifyRequest } from "fastify";
import error from "../../actions/errorValidation";
import { response, responseData, responseError } from "../../actions/response";
import { TodoInput, TodoParam, todoQueryStringInput, TodoUpdateInput } from "../schemas/todo.schema";
import { create, destroy, findAll, findId, update } from "../services/todo.service";




export async function createTodo(req: FastifyRequest<{ Body: TodoInput }>, rep: FastifyReply): Promise<void> {
     if (req.validationError) {
          rep.code(400).send(responseError(400, "unvalidated", error(req.validationError.validation)));
     }
     try {
          const todo = await create({ ...req.body, user_id: req.user.id });
          rep.code(201).send(responseData(201, "todo created", todo));

     } catch (error) {
          rep.code(500).send(response(500, "internal server error"));
     }

}

export async function updateTodo(req: FastifyRequest<{ Params: TodoParam, Body: TodoUpdateInput }>, rep: FastifyReply): Promise<void> {
     if (req.validationError) {
          rep.code(400).send(responseError(400, "unvalidated", error(req.validationError.validation)));
     }
     try {
          const data = await findId(req.params);
          if (data == null) {
               rep.code(404).send(response(404, `data with id  ${req.params.id} not found`));
          }
          const todo = await update(req.params, req.body);
          rep.code(200).send(responseData(200, "todo updated", todo));

     } catch (error) {
          rep.code(500).send(response(500, "internal server error"));
     }

}
export async function deleteTodo(req: FastifyRequest<{ Params: TodoParam }>, rep: FastifyReply): Promise<void> {
     if (req.validationError) {
          rep.code(400).send(responseError(400, "unvalidated", error(req.validationError.validation)));
     }
     try {
          const data = await findId(req.params);
          if (data == null) {
               rep.code(404).send(response(404, `data with id  ${req.params.id} not found`));
          }
          await destroy(req.params);
          rep.code(200).send(response(200, "todo deleted"));

     } catch (error) {
          rep.code(500).send(response(500, "internal server error"));
     }

}

export async function todoWithId(req: FastifyRequest<{ Params: TodoParam }>, rep: FastifyReply): Promise<void> {
     try {
          const data = await findId(req.params);
          if (data == null) {
               rep.code(404).send(response(404, `data with id  ${req.params.id} not found`));
          }
          rep.code(200).send(responseData(200, "data found", data));
     } catch (error) {
          rep.code(500).send(response(500, "internal server error"));

     }

}
export async function todos(req: FastifyRequest<{ Querystring: todoQueryStringInput }>, rep: FastifyReply): Promise<void> {
     try {
          const data = await findAll(req.query, req.user.id);
          rep.code(200).send(responseData(200, "success", data));
     } catch (error) {
          console.error(error);
          rep.code(500).send(response(500, "internal server error"));
     }

}