import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../../sequelize/sequelize";
import { Model } from "sequelize";

interface AuthRequest {
    email: string,
    password: string
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        if (!email || !password) {
            throw new Error("Credenciais inválidas!")
        }

        // 'user' conterá o valor recebido pela query
        // tipando 'user' como  'Model<any, any>' (padrao do sequelize)
        // ou 'null' caso nao seja encontrado nada
        const user: Model<any, any> | null = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("Email e/ou senha incorretos.")
        }

        // acessar os atributos do user
        const passwordUser = user.get("password") as string;
        const nameUser = user.get("name") as string;
        const emailUser = user.get("email") as string;
        const idUser = user.get("idUser") as string;

        // 'compare' (bcryptjs) compara automaticamente o password da request com o password cifrado da db
        // retorna true ou false
        const passwordMatch = await compare(password, passwordUser)
        
        if(!passwordMatch){
            throw new Error("Email e/ou senha incorretos.");
        }

        // se passar por todas as condicoes anteriores
        // entao as credenciais estao corretas

        // gerar token JWT
        // é gerado um token novo sempre que o user faz login
        
        const token = sign(
            // payload (conteudo do token)
            {
                name: nameUser,
                email: emailUser
            },
            // chave privada do .env
            process.env.JWT_SECRET_MD5,
            {
                subject: idUser.toString(),
                expiresIn: "30d" //token expira em 30 dias
            }
        )

        // ao decodificar o jwt que foi criado, teremos as informações:
        // "name": "Teste",                   *name passado no payload (conteudo)
        // "email": "teste@hotmail.com",      *email passado no payload
        // "iat": 1710194251,
        // "exp": 1712786251,                 *expira em 30 dias (em segundos)
        // "sub": "2"                         *subject: foi passado o id do user (2)

        // após criar o token JWT, retornar dados do user e o token gerado
        // retornar os dados do user e o token
        
        return { 
            id: idUser,
            name: nameUser,
            email: emailUser,
            token: token
         }
    }
}

export { AuthUserService }
