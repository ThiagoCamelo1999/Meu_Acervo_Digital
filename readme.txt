📚 Acervo Digital

Acervo Digital é uma plataforma desenvolvida para modernizar a gestão de bibliotecas escolares, permitindo o controle de empréstimos, gerenciamento de alunos e organização de livros. Com uma interface simples e intuitiva, o sistema ajuda na administração eficiente do acervo literário e no acompanhamento de prazos de devolução.



📋 Funcionalidades

1. Login do Administrador
 - Acesso seguro ao sistema.
 - Validação de credenciais para proteger as funcionalidades administrativas.

2. Gerenciamento de Livros
 - Cadastro de novos livros no sistema.
 - Consulta de livros pelo título ou autor.
 - Atualização dinâmica do estoque com base nos empréstimos e devoluções.

3. Controle de Alunos
 - Cadastro de alunos, com validação de CPF e matrícula como chave única.
 - Consulta de alunos pelo nome ou matrícula.

4. Empréstimos e Devoluções
 - Registro de empréstimos com prazos automáticos de 7 dias.
 - Controle de status dos empréstimos: "Ativo", "Devolvido", ou "Atrasado".
 - Listagem de todos os empréstimos com informações detalhadas do aluno e do livro.

5. Controle de Estoque
 - Atualização automática do estoque de livros com base no fluxo de empréstimos.
 - Alerta de indisponibilidade caso um livro esteja fora de estoque.



🛠 Tecnologias Utilizadas

Frontend  
 - HTML e CSS para estrutura e estilização.  
 - JavaScript para lógica e interatividade no lado do cliente.

Backend
 - Node.js com Express.js para construção de APIs.  
 - Sequelize para ORM (Mapeamento Objeto-Relacional).  
 - MySQL para banco de dados relacional.  

Outras Tecnologias  
 - Bcrypt para criptografia de senhas.  
 - JWT (JSON Web Token) para autenticação segura.  
 - Dotenv para gerenciar variáveis de ambiente.



📁 Estrutura do Projeto

Pasta e Arquivos
 - public/: Contém os arquivos estáticos (HTML, CSS e imagens).  
 - scripts/: Contém os arquivos JavaScript do frontend.  
 - src/:  
  - config/: Configuração do banco de dados com Sequelize.  
  - controllers/: Contém a lógica das rotas e operações no banco de dados.  
  - models/: Modelos que representam as tabelas no banco de dados.  
  - routes/: Definição das rotas da API.  

 - server.js: Arquivo principal que inicializa o servidor.



🔧 Configuração do Sistema

Configuração do Banco de Dados  
1. Crie um banco de dados no MySQL com o nome definido no arquivo `.env`.  
2. Insira as seguintes credenciais no arquivo `.env`:  
   - Nome do banco de dados (`DB_NAME`).  
   - Usuário do banco de dados (`DB_USER`).  
   - Senha do banco de dados (`DB_PASSWORD`).  
   - Host do banco (`DB_HOST`).  
   - Porta do banco de dados (`DB_PORT`).  
3. Após configurado, o sistema criará automaticamente as tabelas ao iniciar.

Configuração do Administrador  
- O primeiro administrador será criado automaticamente ao iniciar o sistema, com usuário e senha padrão.



📄 Rotas da API

1. Login
 - POST `/api/admin/login`  
  Autentica o administrador e retorna um token de acesso.

2. Livros
 - GET `/api/livros/all`: Lista todos os livros.  
 - GET `/api/livros/nome?nome=<nome>`: Busca livros pelo título.  
 - GET `/api/livros/autor?autor=<autor>`: Busca livros pelo autor.  

3. Alunos
 - GET `/api/alunos`: Lista todos os alunos.  
 - GET `/api/alunos/nome?nome=<nome>`: Busca alunos pelo nome.  
 - GET `/api/alunos/:matricula`: Busca um aluno pela matrícula.  

 4. Empréstimos
 - POST `/api/emprestimos/criar`: Registra um novo empréstimo.  
 - PUT `/api/emprestimos/devolver/:id`: Marca o empréstimo como devolvido.  
 - GET `/api/emprestimos/all`: Lista todos os empréstimos.  
 - GET `/api/emprestimos/aluno?nome=<nome>`: Lista empréstimos de um aluno.  
 - GET `/api/emprestimos/livro?nome=<nome>`: Lista empréstimos de um livro.  


🌟 Destaques do Sistema

 - Interface Intuitiva**: Navegação clara e responsiva, ideal para qualquer dispositivo.  
 - Gestão Automática de Estoque: Controle preciso da disponibilidade dos livros.  
 - Segurança: Senhas criptografadas e autenticação via JWT.  
 - Organização: Separação clara entre backend e frontend, com código modular e escalável.  


📌 Considerações

- O sistema foi projetado primeiramente para uso em redes locais ou servidores dedicados.  


Segue uma versão ajustada da seção sobre o criador:

👨‍💻 Sobre o Criador
O Acervo Digital foi idealizado e desenvolvido por Thiago Da Silva, um entusiasta da tecnologia e inovação, com foco em soluções para diversos setores. Com um pouco de experiência em desenvolvimento web e integração de sistemas, o criador dedicou-se a criar uma ferramenta que facilita o gerenciamento de bibliotecas escolares, promovendo organização e eficiência no cotidiano acadêmico.

Para dúvidas, sugestões ou parcerias, entre em contato:

º E-mail: Thiagocamelo1999@gmail.com
º GitHub: github.com/thiagocamelo1999
