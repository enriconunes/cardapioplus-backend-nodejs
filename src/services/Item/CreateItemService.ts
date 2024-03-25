import { Item } from "../../sequelize/sequelize";
import { S3Storage } from "../../utils/S3Storage";

interface itemProps{
    name: string,
    description: string,
    price: number,
    avaliable: boolean,
    vegan: boolean,
    idCategory: number,
    file: Express.Multer.File
}

class CreateItemService{

    async execute({
        name,
        description,
        price,
        avaliable,
        vegan,
        idCategory,
        file
    }: itemProps){

        // instanciar arquivo de configuracao do s3
        const s3Storage = new S3Storage()

        // o metodo retorna a url da imagem enviada pelo utilizador
        const url = await s3Storage.saveFile({
            fileName: file.filename,
            bucketName:'cardapioplus-profile'
        })

        const item = await Item.create({
            name: name,
            description: description,
            price: price,
            imageURL: url,
            avaliable: avaliable,
            vegan: vegan,
            category_idCategory: idCategory
        })

        return(item)

    }

}

export { CreateItemService }