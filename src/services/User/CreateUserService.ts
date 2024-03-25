import { User, Restaurant, Schedule, Menu } from "../../sequelize/sequelize"
import { hash } from "bcryptjs"
import { Model } from "sequelize"
import { sequelize } from "../../sequelize/sequelize"

interface UserRequest{
    name: string,
    email: string,
    password: string
}

class CreateUserService{

    async execute({email, password, name}: UserRequest){

        if(!email){
            // Em vez de quebrar o sistema, será exibido a mensagem abaixo
            // Tratamento de erro criado no middleware em ./server.ts
            throw new Error("Email inválido.")
        }

        const emailExists = await User.findAll({
        where: {
            email: email
        }
        });

        if(emailExists.length !== 0){
            throw new Error("Este email já está em uso.")
        } 

        // cifrar senha
        const hashPassword = await hash(password, 8)

        // iniciar uma transação sql para garantir que todas as operaçoes funcione corretamente.
        // ao criar um user, deve-se criar tambem um restaurante, um registro 'schedule' referente a ele e um menu tambem referente a ele.
        // caso algumas dessas operacoes falhar, toda a operaçao é cancelada
        // e o processo de cadastro é restaurado
        try {
            const user = await sequelize.transaction(async (t) => {
                const user: Model<any, any> | null = await User.create({
                    name: name, 
                    email: email,
                    password: hashPassword
                }, { transaction: t });

                const idUser = user.get("idUser") as string;

                const restaurant = await Restaurant.create({
                    user_idUser : idUser,
                }, { transaction: t });

                const idRestaurant = restaurant.get("idRestaurant") as string;

                const schedule = await Schedule.create({
                    restaurant_idRestaurant : idRestaurant,
                }, { transaction: t });

                const menu = await Menu.create({
                    restaurant_idRestaurant : idRestaurant,
                }, { transaction: t });

                // caso nao haja erro, o 'commit' é executado automaticamente
                // e é retornado os dados do user criado
                return user;
        });
        } catch (error) {
            // se algum erro ocorrer, o rollback tambem é executado automaticamente e os dados sao restaurados
            throw new Error("Erro ao criar uma nova conta.")
        }
    }

}

export { CreateUserService }