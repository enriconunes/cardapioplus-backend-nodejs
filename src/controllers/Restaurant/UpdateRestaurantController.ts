import { Request, Response } from "express";
import { UpdateRestaurantService } from "../../services/Restaurant/UpdateRestaurantService";

class UpdateRestaurantController{

    async handle(req: Request, res: Response){

        const user_idUser = req.idUser

        const { name, address, contactNumber, instagramProfileName, doDelivery, deliveryFee, deliveryTime } = req.body

        const updateRestaurantService = new UpdateRestaurantService()
 
        const restaurant = await updateRestaurantService.execute({
            user_idUser: user_idUser,
            name: name,
            address: address,
            contactNumber: contactNumber,
            instagramProfileName: instagramProfileName,
            doDelivery: doDelivery,
            deliveryFee: deliveryFee,
            deliveryTime: deliveryTime
        })

        return res.json(restaurant)

    }

}

export { UpdateRestaurantController }