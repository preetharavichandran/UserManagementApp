# UserManagementApp

A simple User Management App with Angular UI and Asp.NET Core WEB API.

## FRONTEND 

  This project was generated in **Angular CLI 16.2.2**.
  
  ### Code scaffolding
  - Run `ng generate component <component-name>` to generate a new component.
  - You can also use `ng generate <directive|pipe|service|class|guard|interface|enum|module>`.
  
  ### Development server
  - Run `ng serve` for a dev server.
  - Navigate to http://localhost:4200/
  - The application will automatically reload if you change any of the source files.
  
  ### WorkFlow

  1. Login Screen - **LoginComponent**
     
      <img width="1435" alt="Screenshot 2023-09-20 at 9 18 06 PM" src="https://github.com/preetharavichandran/UserManagementApp/assets/142985634/4c737f26-ee1d-460c-8a6e-6890aee658d3">


  2. Home Screen on successful login - **UserManagementComponent**
     
     <img width="1440" alt="Screenshot 2023-09-20 at 9 30 22 PM" src="https://github.com/preetharavichandran/UserManagementApp/assets/142985634/96a0294a-8952-4ce4-8101-79cc8cb31eec">


  3. To Add New User - **UserCreateEditComponent**

      <img width="1421" alt="Screenshot 2023-09-20 at 9 32 45 PM" src="https://github.com/preetharavichandran/UserManagementApp/assets/142985634/01f6ca59-982a-49a0-a021-c54492db56d3">

  4. To modify existing User, UserCreateEditComponent has been reused




## BACKEND

  - A full **CRUD REST API** has been implemented in ASP.NET CORE WEB API (target Framework: .NET 7.0)

  - The User Data from the angular client application is stored into **SQLite** Database via this REST API

  - API Routes are protected using JWT tokens

  - JWT Authentication has been implemented in AuthController

  - Swagger documentation has been implemnted for this API

  - Authorization is required for all API Requests to UserInfo controller

  - For further information of the API such as Endpoint URL, Request and Response Models,
    - Build the **UserMangementAPI** solution 
    - Run with UserManagementAPI as Startup Project 
    - Navigate to https://localhost:5001/swagger/index.html

  <img width="1440" alt="Screenshot 2023-09-20 at 9 52 44 PM" src="https://github.com/preetharavichandran/UserManagementApp/assets/142985634/f58e2285-34b7-46d7-880c-7f7dbcb0520c">

## Note: Please contact me for the default credential used for login.
  
