import { Request, Response } from "express";
import prisma from "../db";

export const getAllProducts = async (req: Request, res: Response) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		include: {
			products: true
		}
	});

	res.json({ data: user?.products });
}

export const getProduct = async (req: Request, res: Response) => {
	const product = await prisma.product.findUnique({
		where: {
			id_userId: {
				id: req.params.id,
				userId: req.user.id,
			},
		}
	});

	res.json({ data: product });
}

export const createProduct = async (req: Request, res: Response) => {
	const product = await prisma.product.create({
		data: {
			name: req.body.name,
			userId: req.user.id,
		},
	});

	res.json({ data: product });
}

export const updateProduct = async (req: Request, res: Response) => {
	const product = await prisma.product.update({
		where: {
			id_userId: {
				id: req.params.id,
				userId: req.user.id,
			},
		},
		data: {
			name: req.body.name,
		},
	});

	res.json({ data: product });
}

export const deleteProduct = async (req: Request, res: Response) => {
	const product = await prisma.product.delete({
		where: {
			id_userId: {
				id: req.params.id,
				userId: req.user.id,
			},
		},
	});

	res.json({ data: product });
}
