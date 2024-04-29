# Restaurox

## Descrição do Projeto

O Restaurox é um sistema completo para gerenciamento de restaurantes, incluindo funcionalidades como cadastro de usuários, criação de cardápios digitais, geração de QR codes dinâmicos, integração com APIs RESTful, autenticação de usuários, entre outras. Desenvolvido como projeto final do curso de Informática Web, Móvel e na Nuvem, o Restaurox é uma aplicação web moderna e escalável, utilizando as melhores práticas de desenvolvimento.

## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- Sequelize (ORM para MySQL)
- Multer (para upload de arquivos)
- Bcrypt.js (para hashing de senhas)
- JSON Web Tokens (JWT) para autenticação
- AWS SDK (para integração com o serviço S3 da Amazon)
- Docker (para conteinerização da aplicação)

### Frontend
- React
- Next.js
- Tailwind CSS
- Axios (para requisições HTTP)
- react-qrcode-logo (para geração de QR codes dinâmicos)
- html2canvas (para captura de tela)

## Estrutura do Projeto


### Backend
- `src/controllers`: Contém os controladores da aplicação, responsáveis por gerenciar as requisições HTTP.
- `src/services`: Contém os serviços da aplicação, responsáveis pela lógica de negócio.
- `src/routes`: Define as rotas da API.
- `src/config`: Configurações da aplicação, como conexão com o banco de dados e middleware de autenticação.
- `src/models`: Modelos de dados definidos com o Sequelize.

### Frontend
- `pages`: Páginas do Next.js que definem as rotas da aplicação.
- `components`: Componentes reutilizáveis da interface do usuário.
- `public`: Arquivos estáticos, como imagens e fontes.
- `styles`: Estilos globais e específicos da aplicação.

## Fluxo de Autenticação e Autorização

A autenticação dos usuários é feita utilizando tokens JWT. Quando um usuário faz login, um token é gerado e armazenado nos cookies. Esse token é enviado junto com as requisições para as rotas protegidas do backend. Caso o token seja inválido ou expirado, o usuário é redirecionado para a página de login.

## Gerenciamento de Uploads de Imagem com Multer e Integração com AWS S3

O sistema permite o upload de imagens, como fotos de perfil dos usuários e imagens de restaurantes. O Multer é utilizado como middleware para processar e armazenar as imagens temporariamente no servidor. Em seguida, as imagens são transferidas para o serviço de armazenamento S3 da Amazon. Isso garante que as imagens sejam armazenadas de forma segura e escalável.

## Hashing de Senhas com Bcrypt

As senhas dos usuários são criptografadas utilizando o algoritmo Bcrypt antes de serem armazenadas no banco de dados. Isso garante a segurança das informações dos usuários, protegendo contra ataques de força bruta e vazamento de dados.

## Validação de Entrada de Dados

Todos os dados inseridos pelos usuários são validados de acordo com as regras de negócio definidas para os atributos do banco de dados. Além disso, medidas adicionais de segurança são implementadas para evitar ataques de SQL injection. Nos formulários que aceitam upload de arquivos, apenas arquivos PNG e JPEG são permitidos.

## Lista de Referências e Recursos Utilizados no Desenvolvimento

Durante o desenvolvimento do projeto, foram utilizados diversos recursos e referências, incluindo a documentação oficial das tecnologias, comunidades online, tutoriais, cursos online, livros técnicos, repositórios de código aberto e ferramentas de desenvolvimento.

## Possíveis Melhorias Futuras

Para o futuro, estão planejadas melhorias como a implementação de um sistema de dashboard para análise de dados, aprimoramento das técnicas de segurança e escalonamento para suportar um maior número de clientes e a implementação de um sistema de pagamento recorrente para monetizar o sistema.

## Conclusão

O projeto Restaurox foi uma oportunidade única de aplicar os conhecimentos adquiridos ao longo do curso de Informática Web, Móvel e na Nuvem em um projeto prático e completo. Desenvolver o sistema desde o início até a fase de deploy foi um grande aprendizado e agregou muito ao meu conhecimento técnico e prático como desenvolvedor web.
