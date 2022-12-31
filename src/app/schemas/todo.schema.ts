import { buildJsonSchemas } from "fastify-zod";
import { number, z } from "zod";
import { responseGenerated, responseSchema } from "./response.schema";

/**
 * valalidation
 */
const todoInput = {
     title: z.string().min(2),
     desc: z.string()
}

const todoQueryStringInput = {
     search: z.string(),
     skip: number(),
     take: number(),
     sort: z.enum(['asc', 'desc'])
}

const todoUpdateInput = {
     ...todoInput,
     status: z.boolean()
}

const todoParam = {
     id: z.number(),
}

const todoGenerated = {
     ...todoParam,
     status: z.boolean(),
     created_at: z.date(),
     updated_at: z.date()
}



/**
 * schema
 */
// request schema
const todoSchema = z.object({ ...todoInput }).strict();
const todoUpdateSchema = z.object({ ...todoUpdateInput }).strict();
const todoParamSchema = z.object({ ...todoParam }).strict();
const todoQueryStringSchema = z.object({ ...todoQueryStringInput }).strict();

// response schema
const todoResponseSchema = z.object({
     ...responseGenerated,
     data: z.object({
          ...todoInput,
          ...todoGenerated
     })
});
const todosResponseSchema = z.object({
     ...responseGenerated,
     data: z.array(z.object({
          ...todoInput,
          ...todoGenerated
     }))
});

/**
 * type
 */

// create
export type TodoInput = z.infer<typeof todoSchema>;
// update
export type TodoUpdateInput = z.infer<typeof todoUpdateSchema>;
// param
export type TodoParam = z.infer<typeof todoParamSchema>;
// querystring
export type todoQueryStringInput = z.infer<typeof todoQueryStringSchema>;


/**
 * build schema
 */
export const { schemas: todoSchemas, $ref } = buildJsonSchemas({
     todoSchema,
     todoParamSchema,
     todoUpdateSchema,
     todoResponseSchema,
     todosResponseSchema,
     todoQueryStringSchema,
     responseSchema
}, { $id: "TodoSchema" });