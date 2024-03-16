import { where } from "sequelize";
import { Item } from "../../sequelize/sequelize";

interface itemProps{
    name: string,
    description: string,
    price: number,
    imageURL: string,
    avaliable: boolean,
    vegan: boolean,
    idItem: number
}

class UpdateItemService{

    async execute({
        name,
        description,
        price,
        imageURL,
        avaliable,
        vegan,
        idItem
    }: itemProps){

        const item = await Item.update({
            name: name,
            description: description,
            price: price,
            imageURL: imageURL,
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