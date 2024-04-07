import { Order, OrderItem } from "../../sequelize/sequelize";
import { Model, Sequelize } from "sequelize";

type Item = {
    idItem: string,
    quantity: number
}

interface OrderProps {
    typeOrder: string,
    totalPrice: string,
    note: string,
    table: string,
    clientContact: string,
    clientAddress: string,
    idRestaurant: string,
    items: Item[]
}

class CreateOrderService {

    async execute({
        typeOrder,
        totalPrice,
        note,
        table,
        clientContact,
        clientAddress,
        idRestaurant,
        items
    }: OrderProps) {

        const sequelize = Order.sequelize as Sequelize;
        const transaction = await sequelize.transaction();

        try {
            // Criar novo registro na tabela Order dentro da transação
            const order: Model<any, any> | null = await Order.create({
                typeOrder: typeOrder,
                totalPrice: totalPrice,
                note: note,
                table: table,
                clientContact: clientContact,
                clientAddress: clientAddress,
                idRestaurant: idRestaurant
            }, { transaction });

            const idOrder = order.get("idOrder") as string;

            // Adicionar os itens do pedido na tabela OrderItem um por um dentro da transação
            await Promise.all(
                items.map(async (item) => {
                    await OrderItem.create({
                        idOrder: idOrder,
                        idItem: item.idItem,
                        quantity: item.quantity
                    }, { transaction });
                })
            );

            // Se tudo ocorrer bem, confirma a transação
            await transaction.commit();

            return { ok: 200, idOrder: idOrder };
        } catch (error) {
            // Se houver algum erro, desfaz a transação
            console.log(error)
            await transaction.rollback();
            throw error;
        }
    }

}

export { CreateOrderService }
