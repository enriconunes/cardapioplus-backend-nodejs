import { Menu, Category, Item, User, Restaurant, Schedule } from "../../sequelize/sequelize";
import { Model } from "sequelize";

class ShowMenuClientService{

    async execute(idUser: string){
        
        // a rota recebe o id do user atraves da url e retorna todas as informaçoes necessarias do restaurante para o cliente

        const restaurant = await Restaurant.findOne({
        where: {
            user_idUser: idUser
        },
        include: [
            {
                model: Schedule
            },
            {
                model: Menu,
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
            }
        ]
        });



        return restaurant
    }

}

export { ShowMenuClientService }
