const {hash, compare} = require('bcryptjs');

const AppError = require("../utils/appError");

const sqliteConnection = require('../database/sqlite');
const { application } = require('express');

class UsersControllers { //utilizo classo pq dentro dela posso ter várias funções
/* funções e métodos para CONTROLLERS
- index: GET para listar vários registros;
- show: GET para exibir um registros específico;
- create: POST para criar um registro;
- update: PUT para atualizar um registro;
- delete: DELETE para remover um registro
* SE PRECISAR CRIAR MAIS DE 5 MÉTODOS, NECESSITA CRIAR OUTRO CONTROLLER
*/

    async create (request, response) {
        const {name, email, password} = request.body;

        const database = await sqliteConnection();
        //requisições assíncronas e vou me conectar com banco de dados
        
        const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]);
        //get pq vou buscar por informações 'SQL' / (?) = conteúdo da variável vai ser substituido pelo vetor [email]

        const hashedPassword = await hash(password, 8) //parâmetro de senha e o fator de complexidade
                                //await é para esperar terminar de gerar a criptografia para utilizar
        if(checkUserExists){
            throw new AppError("Este e-mail já está em uso");
        }

        await database.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
        );

        return response.status(201).json();
    }

    async update (request, response) {
        const {name, email, password, old_password} = request.body; //destruturação {name, email}
        const {id} = request.params;

        const database = await sqliteConnection();
        const user = await database.get ('SELECT * FROM users WHERE id = (?)', [id]);

        if (!user){
            throw new AppError('Usuário não encontrado');
        }

        const userWithUpdateEmail = await database.get ('SELECT * FROM users WHERE email = (?)', [email]);

        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id){
            throw new AppError('Este e-mail já está em uso');
        }

        user.name = name ?? user.name; //nulech operation - é um ou outro
        user.email = email ?? user.email; //Caso não esteja preenchido, continue utilizando o user., se tiver outro, modifique

        if (password && !old_password){
            throw new AppError("Você precisa informar a senha antiga")
        }

        if (password && old_password){
            const checkOldPassword = await compare (old_password, user.password);

            if (!checkOldPassword){
                throw new AppError("A senha antiga não confere");
            }

            user.password = await hash(password, 8)
        }

        await database.run (`
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`,
        [user.name, user.email, user.password, id]
        );

        return response.status(200).json()
    }
}

module.exports = UsersControllers;
