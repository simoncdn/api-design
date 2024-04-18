import prisma from "../db"
import { Request, Response } from "express"
import { comparePasswords, createJWT, hashPassword } from "../modules/auth"
import { handleError } from "../../utils/helper"

export const createUser = async (req: Request, res: Response) => {
	const user = await prisma.user.create({
		data: {
			username: req.body.username,
			password: await hashPassword(req.body.password)
		}
	})

	const token = createJWT(user.id)
	res.json({ token })
}

export const signIn = async (req: Request, res: Response) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username,
		}
	})

	if (!user) {
		return handleError(res, 404, "User not found");
	}

	const isValid = await comparePasswords(req.body.password, user.password)

	if (!isValid) {
		return handleError(res, 401, "Invalid password");
	}

	const token = createJWT(user.id)
	res.json({ user, token })
}
