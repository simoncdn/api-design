import { UPDATE_STATUS } from "@prisma/client";
import { z } from "zod";

export const createUpdateSchema = z.object({
	productId: z.string(),
	title: z.string(),
	body: z.string(),
	version: z.string().optional(),
	status: z.nativeEnum(UPDATE_STATUS).optional(),
})

export const editUpdateSchema = z.object({
	title: z.string().optional(),
	body: z.string().optional(),
	version: z.string().optional(),
	status: z.nativeEnum(UPDATE_STATUS).optional(),
})
