import aws, { S3 } from 'aws-sdk';
import path from 'path';
import mimeTypes from 'mime-types';
import fs from 'fs';
import multerConfig from '../config/multer';

interface UploadProps {
    fileName: string;
    bucketName: string;
}

class S3Storage {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-2'
        });
    }

    async saveFile({ fileName, bucketName }: UploadProps): Promise<string> {
        const originalPath = path.resolve(multerConfig.directory, fileName);

        // Remover caracteres especiais e espaços do nome do arquivo
        const sanitizedFileName = fileName.replace(/[^\w.-]+/g, '');

        const ContentType = mimeTypes.lookup(originalPath);
        if (!ContentType) {
            throw new Error('File not found.');
        }

        const fileContent = await fs.promises.readFile(originalPath);

        try {
            await this.client.putObject({
                Bucket: bucketName,
                Key: sanitizedFileName,
                ACL: 'public-read',
                Body: fileContent,
                ContentType
            }).promise();

            // Remover arquivo local após o upload
            await fs.promises.unlink(originalPath);

            // Gerar e retornar a URL do objeto
            const url = `https://${bucketName}.s3.us-east-2.amazonaws.com/${sanitizedFileName}`;
            return url;
        } catch (error) {
            throw new Error('Falha ao fazer upload do arquivo para o Amazon S3.');
        }
    }

    async deleteFile({ fileName, bucketName }: UploadProps){

        try{
            this.client.deleteObject({
            Bucket: bucketName,
            Key: fileName
        })
        .promise();
        } catch(error){
            throw new Error('Falha ao atualizar imagem do item.');
        }
        
    }
}

export { S3Storage };
