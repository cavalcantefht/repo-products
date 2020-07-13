# Aplicação backend em Laravel

Renomeie o .env-example para .env e configure as conexões com o banco de dados.

Após isso é necessário executar os comandos abaixo:

Para criação do banco de dados:
- php artisan migrate

Para inserir o usuário teste
- php artisan db:seed

Paga gerar o secret que irá ser utilziado na Autenticação JWT
- php artisan jwt:secret

# Aplicação Mobile

Configurar `url` do backend no arquivo `config.ts` no diretorio raiz.

# Postman
Definir duas variáveis globais: 
- base_url: Link do backend
- token: Token do usuário autenticado