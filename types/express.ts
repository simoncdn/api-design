export type UserToken = {
	id: string;
	iat: number;
}

declare global {
	namespace Express {
		interface Request {
			user: UserToken;
		}
	}
}
