import { Restaurant, Order, Item, OrderItem } from "../../sequelize/sequelize";
import { Model } from "sequelize";

interface ordersProps{
    idUser: string,
    typeOrder: string,
    createdAt: string, //ASC or DESC
    status: string
}

class ListOrderService{

    async execute({idUser, typeOrder, createdAt, status}: ordersProps){

        if(createdAt !== 'ASC' && createdAt !== 'DESC'){
            throw new Error("Invalid params to order by createdAt column.")
        }

        // identificar id do restaurante a partir do id do user recebido no request
        const restaurant: Model<any, any> | null = await Restaurant.findOne({
            where: {
                user_idUser: idUser,
            },
            attributes: ['idRestaurant']
        })

        // a partir do id do restaurante, identificar quais sao as orders atribuidas a ele
        const idRestaurant = restaurant.get("idRestaurant") as string;

        let orders;
        
        if(typeOrder === 'all'){
            orders = await Order.findAll({
                where: {
                    idRestaurant: idRestaurant,
                    statusOrder: status
                },
                include: [{
                    model: OrderItem,
                    include: [{
                        model: Item,
                    }]
                }],
                order: [['createdAt', createdAt]] // ASC or DESC
            });
        } else if(typeOrder === 'store' || typeOrder === 'delivery'){
            orders = await Order.findAll({
                where: {
                    idRestaurant: idRestaurant,
                    typeOrder: typeOrder,
                    statusOrder: status
                },
                include: [{
                    model: OrderItem,
                    include: [{
                        model: Item,
                    }]
                }],
                order: [['createdAt', createdAt]] // ASC or DESC
            });
        } else{
            throw new Error("Invalid params to request the API.")
        }

        return orders;
    }

}

export { ListOrderService }