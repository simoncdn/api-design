import { z } from "zod";

export const editUpdatePointSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
});

export const createUpdatePointSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	updateId: z.string(),
});
