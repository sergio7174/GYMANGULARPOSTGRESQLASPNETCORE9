<h1 align ="center" > GYM SERGIO FITNESS ANGULAR/ASPNETCORE9 APLICATION </h1>
<h4  align ="center"> 
Fullstack open source application, dynamic GYM CONTROL website( Using Angular and ASPNETCORE9)</h4>
 <h4  align ="center"> Made with Angular 18, PostGresQl ,Nodejs(20.11.1), ASP.NET.CORE 9  </h4>
<br>
<br>

  * [Configuration and Setup](#configuration-and-setup)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Database](#database)
  * [📸 Screenshots](#screenshots)
  * [Author](#author)
  * <br>
  

## Configuration and Setup 
## <h2> ⚙️ </h2>

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal

```
$ cd client
$ npm install (to install client-side dependencies)
$ npm run start (to start the client), or ng serve

First time running the project, must register Admin on login(register), to enter to admin area.
```
```
In the second terminal

- cd server and Set environment variables in .env
- Create your mongoDB connection url, which you'll use as your MONGO_URL
- Supply the following credentials

# --- Terminal ---

$ dotnet build
$ dotnet run

```
![Status project](https://img.shields.io/badge/STATUS-Finished-GREEN?style=for-the-badge)

##  🔌 Technologies used ✔️:
![Static Badge](https://img.shields.io/badge/typeScript--blue?style=for-the-badge&logo=typescript&logoColor=black&logoSize=auto&label=TypeScript&labelColor=Black)
![Static Badge](https://img.shields.io/badge/Angular--lightblue?style=for-the-badge&logo=Angular&logoColor=darkred&logoSize=auto&label=Angular&labelColor=lightgreen&color=lightgreen)
![Static Badge](https://img.shields.io/badge/cors%20-yellow?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/dotenv-black?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/PostGresQl%20-aqua?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/bootstrap-teal?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/rxjs%20-aqua?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/STATIC%20-aqua?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/ASPNETCORE--gray?style=for-the-badge&logo=ASP&logoColor=black&logoSize=auto&label=ASPNETCORE%20&labelColor=lightbrown&color=black)


##  Screenshots:
📸
<br>
<img src="./IMAGES/image02login.jpg" alt="project screenshot01" />
<img src="./IMAGES/imagehome.jpg" alt="project screenshot02" />
<img src="./IMAGES/imagehomeAdmin.jpg" alt="project screenshot03" />
<img src="./IMAGES/imagehomeAdminPackCreate.jpg" alt="project screenshot04" />
<img src="./IMAGES/imagehomeAdminPackList.jpg" alt="project screenshot05" />
<img src="./IMAGES/imagehomeClasses.jpg" alt="project screenshot06" />
<img src="./IMAGES/imagehomePackBill.jpg" alt="project screenshot07" />
<img src="./IMAGES/imagehomePacks.jpg" alt="project screenshot08" />
<img src="./IMAGES/imagehomePacksResponsive.jpg" alt="project screenshot08" />
<img src="./IMAGES/imagehomeTrainers.jpg" alt="project screenshot08" />
<img src="./IMAGES/imagehomeUser.jpg" alt="project screenshot08" />
<br>

##  Key Features:

- Admin Area
- Add/Edit/Delete Packs,Users,Members,classes, sales.
- User Authenication
- Admin  Authenication
- See Packs, classes, members, staff List.

##  Technologies used

📋 This project was created using the following technologies.

####  Frontend 

- [Angular 18.2.0](https://angular.dev/) - JavaScript library that is used for building user interfaces specifically for single-page applications.
- [Bootstrap 5.2.2](https://getbootstrap.com/docs/5.0/getting-started/introduction/) - Framework for building responsive, mobile-first sites, with jsDelivr and a template starter page.
- [rxjs](https://angular.io/guide/rx-library) - Reactive Extensions Library for JavaScript.

####  Backend 

- [Node js](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [PostGresQl](https://postgresql.com/) - For modeling and mapping SQL data to JavaScript
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For authentication
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Middleware module used in Node.js web applications to manage cookies
- [cors](https://www.npmjs.com/package/cors) - Provides a Connect/Express middleware
- [Dotenv](https://www.npmjs.com/package/dotenv) - Zero Dependency module that loads environment variables
- [express-validator](https://www.npmjs.com/package/express-validator) - Used in Node.js applications with the Express framework to validate data submitted by users (user input)
- [ASP.NetCore 9]() - ASP.NET es un marco de desarrollo web popular para compilar aplicaciones web en la Plataforma . NET. ASP.NET Core es la versión de código abierto de ASP.NET, que 
