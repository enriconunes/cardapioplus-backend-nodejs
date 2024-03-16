import { User } from "../../sequelize/sequelize"
import { Model } from "sequelize";

class UserDetailsService{
    async execute(idUser: string){
        const user: Model<any, any> | null = await User.findOne({
            where: {
                idUser: idUser
            },
            attributes: ['idUser', 'name', 'email']
        });

        return(user)
    }
}

export { UserDetailsService }