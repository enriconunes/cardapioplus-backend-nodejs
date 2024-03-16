import { Menu, Category, Item } from "../../sequelize/sequelize";

class ShowMenuClientService{

    async execute(idMenu: string){
        // a query retorna o menu, as categorias do menu e os itens de cada categoria
        const menu = await Menu.findOne({
            where: {
                idMenu: idMenu
            },
            include: [
                {
                model: Category,
                include: [
                    {
                    model: Item,
                    where:{
                        avaliable: true
                    }
                    }
                ]
                }
            ]
        });

        return menu
    }

}

export { ShowMenuClientService }