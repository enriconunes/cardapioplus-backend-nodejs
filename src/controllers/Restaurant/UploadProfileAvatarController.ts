import { Request, Response } from "express";
import { UploadProfileAvatarService } from "../../services/Restaurant/UploadProfileAvatarService";

class UploadProfileAvatarController{

    async handle(req: Request, res: Response){

        // 'file' nao quer dizer o nome do campo enviado na requisicao, é um nome default
        // o nome do campo é definido como 'image'
        const { file } = req

        if(!file){
            throw new Error("Erro no upload do arquivo.");
        } else{

            const idUser = req.idUser

            const uploadProfileAvatarService = new UploadProfileAvatarService()

            const restaurant = await uploadProfileAvatarService.execute({
                file: file,
                idUser: idUser
            })

            return res.json(restaurant)
        }

    }

}

export { UploadProfileAvatarController }