import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Put,
    Route,
    Security,
    SuccessResponse,
} from 'tsoa';
import { IDocuments, submitDocuments } from '../types/interfaces/Document.interface';
import documentsService from '../services/documents.service';
import { HTTP_CREATED } from '../constants/httpStatusCodes';

@Route('api/documents')
@Security('jwtAuth')
export default class DocumentsController extends Controller {

    @SuccessResponse(HTTP_CREATED, 'Added')
    @Post()
    public static async createDoc(@Body() documents: submitDocuments): Promise<IDocuments> {
        return documentsService.create(documents);
    }

    @Get('{id}')
    public static async getById(@Path() id: string): Promise<IDocuments | undefined> {
        return documentsService.getById(id);
    }

    @Put('{id}')
    public static async updateDocuments(
        @Body() documents: submitDocuments
    ): Promise<IDocuments> {
        return documentsService.update(documents);
    }
}
