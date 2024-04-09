import { Order } from "../../sequelize/sequelize";

class CloseOrderService {

    async execute(idOrder: string) {

        console.log("ID RECEBIDO NO SERVICE: ", idOrder)

        try {
            // fazer o update do pedido atraves do id
            const order = await Order.update({
                statusOrder: false,
            },{
                where: {
                    idOrder: idOrder
                }
            }
        )

            return order;

        } catch (error) {
            // caso ocorra algum erro, lança uma exceção
            throw new Error(`Erro ao fechar o pedido: ${error.message}`);
        }
    }

}

export { CloseOrderService };
