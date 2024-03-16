import { Item } from "../../sequelize/sequelize";

interface itemProps{
    name: string,
    description: string,
    price: number,
    imageURL: string,
    avaliable: boolean,
    vegan: boolean,
    idCategory: number
}

class CreateItemService{

    async execute({
        name,
        description,
        price,
        imageURL,
        avaliable,
        vegan,
        idCategory
    }: itemProps){

        const item = await Item.create({
            name: name,
            description: description,
            price: price,
            imageURL: imageURL,
            avaliable: avaliable,
            vegan: vegan,
            category_idCategory: idCategory
        })

        return(item)

    }

}

export { CreateItemService }