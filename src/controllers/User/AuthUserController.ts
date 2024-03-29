import { Request, Response } from "express";
import { AuthUserService } from "../../services/User/AuthUserService";

class AuthUserController{
    async handle(req: Request, res: Response){
        const { email, password } = req.body

        const authUserService = new AuthUserService()

        const user = await authUserService.execute({
            email,
            password
        })
        
        // res.cookie("token", user.token,{})
        
        return res.json(user)
    }
}

export { AuthUserController }