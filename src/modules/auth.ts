import type { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { handleError } from '../../utils/helper';
import dotenv from 'dotenv';

dotenv.config();

export interface CustomRequest extends Request {
	userId: string | JwtPayload;
}

const privateKey = process.env.JWT_SECRET as string;

export const comparePasswords = (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
}

export const hashPassword = (password: string): Promise<string> => {
	return bcrypt.hash(password, 10);
}

export const createJWT = (userId: string): string => {
	const token = jwt.sign({ id: userId }, privateKey);
	return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		return handleError(res, 401, 'not authorized');
	}

	const [, token] = bearer.split(' ');

	if (!token) {
		return handleError(res, 401, 'not valid token');
	}

	try {
		const user = jwt.verify(token, privateKey);
		(req as CustomRequest).userId = user;
		next();
	} catch (err) {
		return handleError(res, 401, 'not valid token');
	}
}
