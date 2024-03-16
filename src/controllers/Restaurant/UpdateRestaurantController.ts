import { Request, Response } from "express";
import { UpdateRestaurantService } from "../../services/Restaurant/UpdateRestaurantService";

class UpdateRestaurantController{

    async handle(req: Request, res: Response){

        const user_idUser = req.idUser

        const { name, address, contactNumber, instagramProfileName, doDelivery } = req.body

        const updateRestaurantService = new UpdateRestaurantService()

        const restaurant = await updateRestaurantService.execute({
            user_idUser: user_idUser,
            name: name,
            address: address,
            contactNumber: contactNumber,
            instagramProfileName: instagramProfileName,
            doDelivery: doDelivery
        })

        return res.json(restaurant)

    }

}

export { UpdateRestaurantController }