import { Request, Response } from "express";
import { CloseOrderService } from "../../services/Order/CloseOrderService";

class CloseOrderController{

    async handle(req: Request, res: Response){

        const { idOrder } = req.body

        const closeOrderService = new CloseOrderService()

        const order = await closeOrderService.execute(idOrder)

        return res.status(200).json(order)

    }

}

export { CloseOrderController }