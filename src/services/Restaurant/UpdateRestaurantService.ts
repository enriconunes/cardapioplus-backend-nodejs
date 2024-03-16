import { Restaurant } from "../../sequelize/sequelize"

interface RestaurantRequest{
    user_idUser: string
    name: string,
    address: string,
    contactNumber: string,
    instagramProfileName: string,
    doDelivery: boolean,
}

class UpdateRestaurantService{

    async execute({user_idUser, name, address, contactNumber, instagramProfileName, doDelivery}: RestaurantRequest){

        const restaurant = await Restaurant.update({
                name: name,
                address: address,
                contactNumber: contactNumber,
                instagramProfileName: instagramProfileName,
                doDelivery: doDelivery
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