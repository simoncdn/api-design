import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { handleError } from '../../utils/helper';
import dotenv from 'dotenv';
import type { UserToken } from '../../types/express';

dotenv.config();

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

export const protect = (req: Request, res: Response, next: NextFunction): void => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		return handleError(res, 401, 'not authorized');
	}

	const [, token] = bearer.split(' ');

	if (!token) {
		return handleError(res, 401, 'not valid token');
	}

	try {
		const userToken = jwt.verify(token, privateKey);
		req.user = userToken as UserToken;
		next();
	} catch (err) {
		return handleError(res, 401, 'not valid token');
	}
}
