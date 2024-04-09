import { Request, Response } from "express";
import { ListOrderService } from "../../services/Order/ListOrdersService";

class ListOrderController{

    async handle(req: Request, res: Response){

        // recuperar id do user para identificar o restaurante associado
        const idUser = req.idUser as string

        //recuperar o typeOrder para filtrar entre pedidos em loja ou pedidos para delivery
        const typeOrder = req.query.typeOrder as string

        console.log("TIPO REECBIDO: ", typeOrder)
        
        const listOrderService = new ListOrderService()

        const orders = await listOrderService.execute({
            idUser,
            typeOrder
        })

        return res.status(200).json(orders)

    }

}

export { ListOrderController }