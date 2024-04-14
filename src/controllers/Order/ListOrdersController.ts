import { Request, Response } from "express";
import { ListOrderService } from "../../services/Order/ListOrdersService";

class ListOrderController{

    async handle(req: Request, res: Response){

        // recuperar id do user para identificar o restaurante associado
        const idUser = req.idUser as string

        //recuperar o typeOrder para filtrar entre pedidos em loja ou pedidos para delivery
        const typeOrder = req.query.typeOrder as string

        // createdAt = "ASC" or "DESC"
        const createdAt = req.query.createdAt as string

        // status '1' or '0'
        const status = req.query.status as string
        
        const listOrderService = new ListOrderService()
  
        const orders = await listOrderService.execute({
            idUser,
            typeOrder,
            createdAt,
            status
        })

        return res.status(200).json(orders)

    }

}

export { ListOrderController }