import express, { NextFunction, Request, Response } from 'express';
import { uuidValidator } from './validations/user.validations';
import DocumentsController from '../controllers/UserDocuments.controller';
import { updateUserDocs, createDocValidator } from './validations/documents.validations';
import { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_SERVER_ERROR } from '../constants/httpStatusCodes';
import CustomError from '../helpers/CustomError';

const router = express.Router();


router.post(
    '/documents',
    createDocValidator,
    async (req: Request, res: Response) => {
        try {
            const data = await DocumentsController.createDoc({
                ...req.body,
                userId: req.user?.id
            });
            return res
                .status(HTTP_CREATED)
                .json({
                    data
                });
        } catch (error) {
            console.log(error, "SOMETH")
            if (error instanceof CustomError) {
                return res.status(HTTP_BAD_REQUEST).json({ error: error.message });
            }
            return res.status(HTTP_SERVER_ERROR).json({ error: '' });
        }
    },
);

router.get(
    '/documents',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const id = req?.user.id as string;
            const documents = await DocumentsController.getById(id);
            return res.json({ documents });
        } catch (error) {
            return next(error);
        }
    },
);

router.put(
    '/documents',
    uuidValidator,
    updateUserDocs,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const id = req?.user.id as string;
            const response = await DocumentsController.updateDocuments({
                ...req.body,
                userId: id
            });
            return res.json(response);
        } catch (error) {
            return next(error);
        }
    },
);

export default router;
