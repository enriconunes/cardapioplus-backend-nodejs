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
    // Consultar o último número de pedido para o restaurante específico
    const lastOrder: Model<any, any> | null = await Order.findOne({
        where: { idRestaurant },
        order: [['number', 'DESC']], // Ordenar em ordem decrescente para obter o último pedido
        transaction
    });

    // Determinar o próximo número de pedido
    const nextOrderNumber = lastOrder ? (lastOrder.get("number") as number) + 1 : 1;

    // Criar novo registro na tabela Order dentro da transação
    const order: Model<any, any> | null = await Order.create({
        typeOrder,
        totalPrice,
        note,
        table,
        clientContact,
        clientAddress,
        idRestaurant,
        number: nextOrderNumber // Definir o número do pedido
    }, { transaction });

    const idOrder = order.get("idOrder") as string;

    // Adicionar os itens do pedido na tabela OrderItem um por um dentro da transação
    await Promise.all(
        items.map(async (item) => {
            await OrderItem.create({
                idOrder,
                idItem: item.idItem,
                quantity: item.quantity
            }, { transaction });
        })
    );

    // Se tudo ocorrer bem, confirma a transação
    await transaction.commit();

    return { ok: 200, idOrder };
} catch (error) {
    // Se houver algum erro, desfaz a transação
    console.log(error);
    await transaction.rollback();
    throw error;
}

    }

}

export { CreateOrderService }