import { z } from "zod";
export const responseGenerated = {
     message: z.string(),
     code: z.number()
}

export const responseSchema = z.object({ ...responseGenerated });