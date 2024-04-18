import type { Response } from 'express';

export const handleError = (res: Response, statusCode: number, message: string) => {
	res.status(statusCode);
	res.json({ message });
}
