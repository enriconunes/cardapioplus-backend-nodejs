import { Request, Response } from "express";
import { RestaurantDetailsService } from "../../services/Restaurant/RestaurantDetailsService";

class RestaurantDetailsController{
    async handle(req: Request, res: Response){

        // idUser contem o id do user logado que é identificado pelo JWT passado no bearer da requisicao e lido no middleware isAuthenticated
        const idUser = req.idUser as string

        const restaurantDetailsService = new RestaurantDetailsService()

        const restaurant = await restaurantDetailsService.execute(idUser)
    
        return res.json(restaurant)
    }
}

export { RestaurantDetailsController }