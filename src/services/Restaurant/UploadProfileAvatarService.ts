import { Restaurant } from "../../sequelize/sequelize";
import { S3Storage } from "../../utils/S3Storage";

interface uploadProps{
    file: Express.Multer.File,
    idUser: string
}

class UploadProfileAvatarService{

    async execute({file, idUser}: uploadProps){

        const s3Storage = new S3Storage()

        // o metodo retorna a url da imagem enviada pelo utilizador
        const url = await s3Storage.saveFile({
            fileName: file.filename,
            bucketName:'cardapioplus-profile'
        })

        // apos salvar a imagem no s3, atualizar url do perfil do restaurante
        const restaurant = await Restaurant.update({
            profileURL: url,
        },
        {
            where: {
                user_idUser: idUser
            }
        });


        return (restaurant)

    }

}

export { UploadProfileAvatarService }