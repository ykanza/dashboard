import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class WidgetController {
    static async findWidget(req: express.Request, res: express.Response) {
        const { id } = req.params;
        const widget = await prisma.widget.findFirst({
            where: { id: Number(id) }
        })
        res.json({
             success: true,
             widget: widget,
        })
    }

    static async deleteWidget(req: express.Request, res: express.Response) {
        const { id } = req.params;

        const widget = await prisma.widget.delete({
            where: { id: Number(id) }
        });

        res.json({
            success: true,
            widget
        });
    }

    static async deleteAllWidgets(req: express.Request, res: express.Response) {
        const userId = req.body.user.payload.id;
        const deleteWidgets = await prisma.widget.deleteMany({
            where: { userId: Number(userId) }
        })

        res.json({
            success: true,
            deleteWidgets
        });
    }

    static async createWidget(req: express.Request, res: express.Response) {
        const userId = req.body.user.payload.id;
        const widget = await prisma.widget.create({
            data: {
                type: req.body.type,
                settings: req.body.settings,
                frequency: req.body.frequency,
                user: {
                    connect: {
                        id: userId
                    }
                }
            },
        })
        res.json({
            success: true,
            widget: widget,
        })
    }

    static async updateWidget(req: express.Request, res: express.Response) {
        const widget = await prisma.widget.update({
            where: {
                id: req.body.id,
            },
            data: {
                type: req.body.type,
                settings: req.body.settings,
                frequency: req.body.frequency,
            },
        })

        res.json({
            success: true,
            widget
        })
    }

    static async getWidgets(req: express.Request, res: express.Response) {
        const userId = req.body.user.payload.id;
        const widgets = await prisma.widget.findMany({
            where: { userId: Number(userId) }
        });

        res.json(widgets);
    }
}

export default WidgetController;
