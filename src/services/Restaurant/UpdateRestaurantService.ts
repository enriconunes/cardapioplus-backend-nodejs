import { Restaurant } from "../../sequelize/sequelize"

interface RestaurantRequest{
    user_idUser: string
    name: string,
    address: string,
    contactNumber: string,
    instagramProfileName: string,
    doDelivery: boolean,
    deliveryFee: string,
    deliveryTime: string
}

class UpdateRestaurantService{

    async execute({user_idUser, name, address, contactNumber, instagramProfileName, doDelivery, deliveryFee, deliveryTime}: RestaurantRequest){
 
        const restaurant = await Restaurant.update({
                name: name,
                address: address,
                contactNumber: contactNumber,
                instagramProfileName: instagramProfileName,
                doDelivery: doDelivery,
                deliveryFee: deliveryFee,
                deliveryTime: deliveryTime
            },
            {
                where: {
                    user_idUser: user_idUser
                }
            });

        return(restaurant)

    }

}

export { UpdateRestaurantService }