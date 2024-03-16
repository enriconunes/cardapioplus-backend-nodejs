import { Category, Item, sequelize } from "../../sequelize/sequelize";

class DeleteCategoryService {
    async execute(idCategory: string) {

        // instanciar uma transacao para garantir a integridade dos dados
        // com a 'transaction' é possivel mapear todos os passos da query e revertê-los caso seja preciso
        const t = await sequelize.transaction();

        try {
            // identificar a categoria que será deletada
            const category = await Category.findByPk(idCategory, { transaction: t });

            if (!category) {
                throw new Error('Categoria não encontrada');
            }

            // deletar todos os itens relacionados a esta categoria e referenciar a transaction
            await Item.destroy({
                where: {
                    category_idCategory: idCategory
                },
                transaction: t
            });

            // apos deletar os itens da categoria, deletar a propria categoria
            await category.destroy({ transaction: t });

            // commit da transação se todas as operações forem bem sucedidas
            // após o commit, nao é possivel reverter as operacoes
            await t.commit();

            return(category);

        } catch (error) {

            // se ocorrer algum erro nas operacoes, é feito o rollback (volta para o estado inicial) da transação
            await t.rollback();
            return { error: 'Erro ao deletar categoria e itens' };
        }
    }
}

export { DeleteCategoryService };
