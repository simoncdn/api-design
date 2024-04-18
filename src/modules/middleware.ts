import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validate = (schema: z.ZodObject<any, any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (err) {
			if (err instanceof z.ZodError) {
				const errorMessages = err.errors.map((issue: any) => ({
					message: `${issue.path.join('.')} is ${issue.message}`,
				}))
				res.status(400)
				res.json({ error: 'Invalid data', details: errorMessages });
			}
			else {
				res.status(500);
				res.json({ errors: "Internal server error" });
			}
		}
	}
}
