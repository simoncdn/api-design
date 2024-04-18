import type { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export interface CustomRequest extends Request {
	userId: string | JwtPayload;
}

const privateKey = process.env.JWT_SECRET as string;

const handleError = (res: Response, message: string) => {
	res.status(401);
	res.json({ message });
}

export const comparePasswords = (password: string, hashedPassword: string): Promise<boolean> => {
	return bcrypt.compare(password, hashedPassword);
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
		return handleError(res, 'not authorized');
	}

	const [, token] = bearer.split(' ');

	if (!token) {
		return handleError(res, 'not valid token');
	}

	try {
		const user = jwt.verify(token, privateKey);
		(req as CustomRequest).userId = user;
		next();
	} catch (err) {
		return handleError(res, 'not valid token');
	}
}
