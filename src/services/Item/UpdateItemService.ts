import { S3Storage } from "../../utils/S3Storage";
import { Item } from "../../sequelize/sequelize";
import { Model } from "sequelize";

interface itemProps{
    name: string,
    description: string,
    price: number,
    avaliable: boolean,
    vegan: boolean,
    idItem: number,
    file: Express.Multer.File
}

class UpdateItemService{

    async execute({
        name,
        description,
        price,
        avaliable,
        vegan,
        idItem,
        file
    }: itemProps){

        // recuperar url da imagem do item que será atualizado
        // necessario para apagar a imagem do S3 antes de adicionar uma nova - economia de recursos
        const lastUpdate: Model<any, any> | null = await Item.findOne({
            where: {
                idItem: idItem
            }, attributes:['imageURL']
        });

        const lastImageURL = lastUpdate.get("imageURL") as string;

        // dividir a string com base no delimitador "/"
        const parts = lastImageURL.split('/');

        // pegar o último elemento do array resultante
        // 'lastFileName' é a key usada para apagar a imagem anterior antes de inserir a nova
        const lastFileName = parts[parts.length - 1];

        // instanciar arquivo de configuracao do s3
        const s3Storage = new S3Storage()

        // deletar imagem antiga
        await s3Storage.deleteFile({
            fileName: lastFileName,
            bucketName: 'cardapioplus-profile'
        })

        // o metodo retorna a url da imagem enviada pelo utilizador
        const url = await s3Storage.saveFile({
            fileName: file.filename,
            bucketName:'cardapioplus-profile'
        })

        const item = await Item.update({
            name: name,
            description: description,
            price: price,
            imageURL: url,
            avaliable: avaliable,
            vegan: vegan,
        },{
            where: {
                idItem: idItem
            }
        }
        )

        return(item)

    }

}

export { UpdateItemService }