import { Item } from "../../sequelize/sequelize";

class ItemDetailsService{

    async execute(idItem: number){

        const item = await Item.findOne({
            where: {
                idItem: idItem
            }
        });

        return(item)

    }

}

export { ItemDetailsService }