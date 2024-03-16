import { Restaurant, Schedule } from "../../sequelize/sequelize"
import { Sequelize } from "sequelize";

class RestaurantDetailsService{

    async execute(idUser: string){

        const restaurant = await Restaurant.findOne({
            where: {
                user_idUser: idUser
            },
            include: [{
                model: Schedule,
                where: {
                    restaurant_idRestaurant: Sequelize.col('Restaurant.idRestaurant')
                }
            }]
        });

        return(restaurant)
    }
}

export { RestaurantDetailsService }