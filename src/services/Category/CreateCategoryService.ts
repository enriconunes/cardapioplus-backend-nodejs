import { Category, Restaurant, Menu } from "../../sequelize/sequelize";
import { Model } from "sequelize";

interface categoryProps{
    idUser: string,
    name: string
}

class CreateCategoryService{

    async execute({idUser, name}:categoryProps){

        // identificar id do restaurante a partir do id do user recebido no request
        const restaurant: Model<any, any> | null = await Restaurant.findOne({
            where: {
                user_idUser: idUser
            },
            attributes: ['idRestaurant']
        })

        // a partir do id do restaurante, identificar qual é o 'menu' que a nova category será associada
        const idRestaurant = restaurant.get("idRestaurant") as string;

        const menu: Model<any, any> | null = await Menu.findOne({
            where: {
                restaurant_idRestaurant: idRestaurant
            },
            attributes: ['idMenu']
        })

        // agora temos o id do menu que 'receberá' a nova category
        const idMenu = menu.get("idMenu") as string;

        const category = await Category.create({
            name: name,
            menu_idMenu : idMenu, 
        })

        return(category)
    }

}

export { CreateCategoryService }