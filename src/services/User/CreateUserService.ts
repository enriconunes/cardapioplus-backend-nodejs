import { User, Restaurant, Schedule, Menu } from "../../sequelize/sequelize"
import { hash } from "bcryptjs"
import { Model } from "sequelize"

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

        // 'user' conterá o valor recebido pela query
        // tipando 'user' como  'Model<any, any>' (padrao do sequelize)
        // ou 'null' caso nao seja encontrado nada
        const user: Model<any, any> | null = await User.create({
            name: name, 
            email: email,
            password: hashPassword
        })

        // ao criar um user, criar tambem um restaurante associado a ele
        // armazenar id do user para o relacionamento com o resturante associado
        const idUser = user.get("idUser") as number;

        const restaurant = await Restaurant.create({
            user_idUser : idUser, 
            // os outros atributos sao definidos by default
        })

        // apois criar um novo restaurante, criar tambem um registro na tabela 'Schedule'
        // referente aos dias e horarios de funcionamento do restaurante
        const idRestaurant = restaurant.get("idRestaurant") as number;

        const schedule = await Schedule.create({
            restaurant_idRestaurant : idRestaurant,
        })

        // ao criar um novo restaurante, criar tambem um registro na tabela 'menu'
        const menu = await Menu.create({
            restaurant_idRestaurant : idRestaurant,
        })

        return(user)
    }

}

export { CreateUserService }