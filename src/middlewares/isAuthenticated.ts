import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

//criar um modelo de tipagem que recebe uma variavel sub (subject) do tipo string
//sub é um campo do jwt que contem o id do user logado
//o sub foi enviado para o jwt em ./AuthUserService.ts
interface payload{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction //usado para avançar com a requisição da rota
){

    //receber o token que vem no campo 'authorization' do 'headers' da requisicao (neste caso o 'Bearer')
    const authToken = req.headers.authorization
    // const authToken = req.cookies.token

    if(!authToken){
        //se nao receber um token, retorna erro nao autorizado
        return res.status(401).end();
    }

    // é recebido uma string "bearer GWeosf3..." por exemplo
    // entao separa a string pelo espaço e guarda apenas o valor do token, eliminando o que vem antes do espaço
    const [, token] = authToken.split(" ")

    try{
        //validar token
        //verify retorna o conteudo do jwt
        //o retorno é tipado, obrigando q seja do tipo payload (inteface criada acima)
        //armazena apenas o campo 'sub' do conteudo retornado (pois o sub que contém o id do user)

        //o verify confere se o token está de acordo com a senha privada da variavel de ambiente
        const { sub } = verify(
            token,
            process.env.JWT_SECRET_MD5
        ) as payload;

        //injetar o id do user logado no require
        //dessa forma, todas as rotas que chamarem esse middleware terao acesso ao id apenas usando req.user_id
        req.idUser = sub;

        //se passar por todas as condicoes
        //entao prossegue a logica das rotas
        return next()

    }catch(err){
        // retornar 401 (nao autorizado) caso haja um erro na validacao do token
        return res.status(401).end()
    }
}