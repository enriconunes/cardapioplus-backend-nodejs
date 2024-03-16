import { Item } from "../../sequelize/sequelize";

class DeleteItemService{

    async execute(idItem: number){

        const item = await Item.destroy({
            where: {
                idItem: idItem
            }
        });

        return (item)

    }

}

export { DeleteItemService }