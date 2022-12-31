import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { responseGenerated, responseSchema } from "./response.schema";

/**
 * valalidation
 */
const userLoginInput = {
     email: z.string().email(),
     password: z.string().min(6).max(50).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, "Password have to")
}
const userInput = {
     ...userLoginInput,
     name: z.string(),
}

const user = {
     email: z.string().email(),
     name: z.string(),
}

const userGenerated = {
     id: z.string(),
     created_at: z.date(),
     updated_at: z.date()
}
const userResponse = {
     ...user,
     ...userGenerated
};



/**
 * schema
 */
// request schema
const userSchema = z.object({ ...userInput }).strict();
const userLoginSchema = z.object({ ...userLoginInput }).strict();

// response schema
const loginResponseSchema = z.object({
     ...responseGenerated,
     data: z.object({
          accessToken: z.string(),
     })
});

const userTypeSchema = z.object({
     ...userResponse
})

const userResponseSchema = z.object({
     ...responseGenerated,
     data: z.object({
          ...userResponse
     })
});

/**
 * type
 */

// create
export type UserInput = z.infer<typeof userSchema>;

// login
export type UserLoginInput = z.infer<typeof userLoginSchema>;

export type UserResponse = z.infer<typeof userTypeSchema>;



/**
 * build schema
 */
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
     userSchema,
     userLoginSchema,
     userResponseSchema,
     responseSchema,
     loginResponseSchema
}, { $id: "UserSchema" });