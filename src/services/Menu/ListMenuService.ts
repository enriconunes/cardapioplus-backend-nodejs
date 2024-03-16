import { Category, Item, Menu, Restaurant } from "../../sequelize/sequelize";
import { Model, Sequelize } from "sequelize";

class ListMenuService{

    async execute(idUser: string){

        // identificar id do restaurante a partir do id do user recebido no request
        const restaurant: Model<any, any> | null = await Restaurant.findOne({
            where: {
                user_idUser: idUser
            },
            attributes: ['idRestaurant']
        })

        // a partir do id do restaurante, identificar qual é o 'menu' que a nova category será associada
        const idRestaurant = restaurant.get("idRestaurant") as string;

        // a query retorna o menu, as categorias do menu e os itens de cada categoria
        const menu = await Menu.findOne({
            where: {
                restaurant_idRestaurant: idRestaurant
            },
            include: [
                {
                model: Category,
                include: [
                    {
                    model: Item
                    }
                ]
                }
            ]
        });

        return(menu)

    }

}

export { ListMenuService }