import { Request, Response } from "express";
import prisma from "../db";

export const getAllUpdate = async (req: Request, res: Response) => {
	const products = await prisma.product.findMany({
		where: {
			userId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.map((product) => product.updates).flat();
	res.json({ data: updates });
}

export const getUpdate = async (req: Request, res: Response) => {
	const update = await prisma.update.findUnique({
		where: {
			id: req.params.id,
		}
	});

	res.json({ data: update });
}

export const createUpdate = async (req: Request, res: Response) => {
	const product = await prisma.product.findUnique({
		where: {
			id: req.body.productId,
		},
	});

	if (!product) {
		res.json({ message: "Product not found" });
	}

	const update = await prisma.update.create({
		data: {
			productId: req.body.productId,
			title: req.body.title,
			body: req.body.body,
			version: req.body.version,
			status: req.body.status,
		},
	});

	res.json({ data: update });
}

export const updateUpdate = async (req: Request, res: Response) => {
	const update = await prisma.update.update({
		where: {
			id: req.params.id,
		},
		data: {
			title: req.body.title,
			body: req.body.body,
			version: req.body.version,
			status: req.body.status,
			updatedAt: new Date(),
		},
	});

	res.json({ data: update });
}

export const deleteUpdate = async (req: Request, res: Response) => {
	const update = await prisma.update.delete({
		where: {
			id: req.params.id,
		},
	});

	res.json({ data: update });
}
