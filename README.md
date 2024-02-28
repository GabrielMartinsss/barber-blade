<h1 align='center'>Barber Blade</h1>

## 🧠 Apresentação do Projeto
Bem-vindo ao Barber Blade, um projeto destinado a revolucionar a forma como os clientes interagem com barbearias. Esta plataforma permite aos usuários explorar barbearias e seus serviços, reservar horário e gerenciar suas necessidades de cuidados pessoais de forma eficiente.

## ⚙️ Funcionalidades
* **Reserva de Serviços:** Navegue por uma variedade de barbearias, e reserve um servicço.

* **Autenticação:** Conecte de forma fácil e segura com sua conta Google.

* **Interface Amigável:** Design intuitivo para uma navegação sem problemas.

* **Design Responsivo:** Aplicação que se adapta em diferentes dispositivos.

## 💻 Tecnologias
<img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,prisma,docker,postgresql,figma" />

NextJS, React, Typescript, Tailwindcss, Prisma, Docker, Postgresql e Figma.

## 🚀 Começando
Para reproduzir o projeto localmente, siga estas etapas:

#### Pré-requisito:
* Node.js instalado em sua máquina
* Docker instalado em sua máquina

#### Instalação
1. Clone este repositório em sua máquina local:
```
git clone https://github.com/GabrielMartinsss/barber-blade.git
```
2. Navegue até o diretório do projeto:
```
cd barber-blade
```
3. Instale as dependências::
```
npm install
```
#### Configurando variáveis ambientes
Crie um arquivo `.env` no diretório raiz e configure as seguintes variáveis:
```
DATABASE_URL="postgresql://docker:docker@localhost:5432/barberblade?schema=public"
GOOGLE_CLIENT_ID=seu_client_id_google
GOOGLE_CLIENT_SECRET=seu_client_secret_google
```

#### Configuração do Docker
1. Certifique-se de que o Docker está em execução em sua máquina.
2. Execute o seguinte comando para criar e iniciar os contêineres do Docker:
```
docker-compose up -d
```

#### Configuração do Prisma
1. Execute o seguinte codigo para criar as migrations do prisma.
```
npx prisma migrate dev
```
2. Dê um nome para sua migration.

#### Iniciando o projeto
Quando os contêineres do Docker estiverem em execução e o banco de dados estiver conectado, execute `npm run dev` e acesse http://localhost:3000 em seu navegador da web para acessar a aplicação.

## 📸 Preview do Projeto
#### Um pouco do resultado do projeto

1. Página inicial
<img src='./public/preview-project/page-home.jpeg'>
2. Pesquisa de barbearia
<img src='./public/preview-project/page-barbershop-search.jpeg'>
3. Página de detalhes de uma barbearia
<img src='./public/preview-project/page-barbershop-datails.jpeg'>
4. Agendamento de um serviço
<img src='./public/preview-project/page-barbershop-details-sheet-booking.jpeg'>
5. Página de agendamentos
<img src='./public/preview-project/page-bookings.jpeg'>
6. Detalhes de um agendamento marcado
<img src='./public/preview-project/page-bookings-details-confirmed-book.jpeg'>
7. Detalhes de um agendamento finalizado
<img src='./public/preview-project/page-bookings-details-finished-book.jpeg'>
8. Avaliar uma barberaria
<img src='./public/preview-project/page-bookings-details-finished-book-rating-barbershop.jpeg'>

## 📃 Licença
Este projeto está licenciado sob a Licença MIT.
