import { Request, Response } from "express";
import { CreateOrderService } from "../../services/Order/CreateOrderService";

class CreateOrderController{

    async handle(req: Request, res: Response){

        const {
            typeOrder,
            note,
            totalPrice,
            table,
            clientContact,
            clientAddress,
            idRestaurant,
            items
        } = req.body

        const createOrderService = new CreateOrderService()

        try{
            const order = await createOrderService.execute({
                typeOrder,
                note,
                totalPrice,
                table,
                clientContact,
                clientAddress,
                idRestaurant,
                items
            })
    
            res.status(201).json({ message: 'Pedido criado com sucesso!' });
        } catch{
            res.status(500).json({ message: 'Erro interno do servidor' });
        }

    }

}

export { CreateOrderController }