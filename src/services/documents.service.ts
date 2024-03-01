import sequelize from '../configs/database';
import { UserDocuments } from '../database/models';
import CustomError from '../helpers/CustomError';
import { IDocuments } from '../types/interfaces/Document.interface';

class DocumentsService {

    async create(documents: any): Promise<IDocuments> {
        const docs = await this.getById(documents.userId);
        if (docs) {
            return this.update(documents)
        }
        return sequelize.transaction(
            async (t) =>
                UserDocuments.create(documents, {
                    transaction: t,
                }) as unknown as IDocuments,
        );
    }

    async getById(userId: string): Promise<IDocuments | undefined> {
        return sequelize.transaction(
            async (t) =>
                UserDocuments.findOne({
                    where: { userId },
                    transaction: t,
                }) as unknown as IDocuments,
        );
    }

    async update(updatedDocuments: Partial<IDocuments>): Promise<IDocuments> {
        return sequelize
            .transaction(
                async (t) =>
                    UserDocuments.update(updatedDocuments, {
                        where: { userId: updatedDocuments.userId },
                        transaction: t,
                        returning: true,
                    }) as unknown as IDocuments,
            )
            .then(
                () =>
                    UserDocuments.findOne({
                        where: { userId: updatedDocuments.userId },
                    }) as unknown as IDocuments,
            );
    }
}

export default new DocumentsService();
