# OLD IS COOL

<br>

## Description

This is an app to sell or buy vintage cars.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.

-  **Signup:** As an anon I can sign up to the app so that I can buy/sell cars.

-  **Login:** As a user I can login to the app so that I can see my car advert's and manage them, as well as my profile or contacto with others

-  **Logout:** As a user I can logout from the app so no one else can use it

-  **View Cars** List of car Adverts with a filter btn. You can click above every adver to see more about.
-  **Sell Car** As a user I can create an advert.
-  **Edit Advert** As a user I can edit an advert.
-  **Delete Advert** As a user I can delete an advert
-  **View User profile** As a user I can see my profile
-  **Edit User profile** As a user I can edit my profile


## Backlog
- chat between diferent users in the adverts
- save search on the user profile
- drag and drop my projects
- filter on the list cars by default as best sellers
- social singup
- ...

<br>


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions                 | Behavior                                                     |
| ------------------------- | -------------------- | --------------------------- | ------------------------------------------------------------ |
| `/`                       | HomePage             | public `<Route>`            | Home page                                                    |
| `/signup`                 | SignupPage           | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage            | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login |
| `/username/mis-anuncios`   | MyAdvertsListPage     | user only `<PrivateRoute>`  | Page that shows all user´s advert's in a list                |
| `/vender-mi-coche`  | AddCarForm       | user only `<PrivateRoute>`  | Car advert form, adds a advert and redirects to car-list once project has been added.  |
| `/:typeOfCar/:model/:id`  | AdvertDetailPage    |public `<Route>`| Page with the details of an advert |
| `/:userId`             | ProfilePage          | user only  `<PrivateRoute>` | Shows the user profile, that also renders an edit form  |                                         


## Components

- HomePage
 
- LoginPage

- SignupPage

- AdvertListPage  
  * AdvertCard
  * DeleteAdvertButton

- AddAdvertForm

- AdvertDetailPage
  * EditAdvertButton
  * ChatButton
  
- ProfilePage
  * EditProfileForm

- Routes
  * AnonRoute
  * PrivateRoute

- Common
  * Navbar
  * Footer
  * Button...


## Services

- Auth Service
  - authApi.login(user)
  - authApi.signup(user)
  - authApi.logout()

- Advert Service
  - advertApi.list()
  - advertApi.addAdvert(advert)
  - advertApi.getAdvertDetails(advertId)
  - advertApi.editAdvert(advertId, advertBody)
  - advertApi.deleteAdvert(advertId)

<br>


# Server / Backend


## Models

User model

```javascript
{
  username: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  adverts: [ { type: mongoose.Schema.Types.ObjectId, ref: "Adverts" } ]
}
```

Adverts model

```javascript
{
  typeOfCar: {
    type:String,
    required:true,
    enum:["coche","furgoneta","camion"]
  },
  image: {
    type:String,
    required:true
      },
  user: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
  brand:{
    type:String,
    required:true,
  },
  year:{
    type:Number,
    required:true
  fuel:{
    type:String,
    enum:["gasolina","diesel"]
  },
  model:{
    type:String,
    required:true
  },
  horsePower:{
    type:Number,
  },
  color:{
    type:String,
  }
  otherInformation:{
    type:String
  }
},
```


<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | `/auth/signup`                | {username, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | `/api/adverts`               |                              |                | 400          | Sends all adverts                                         |
| GET         | `/api/adverts/:advertId`           | {id}                         |                |              | Sends one specific advert        |
| POST        | `/api/advert`               | {title, description}       | 201            | 400          | Create and saves a new project in the DB                   |
| PUT         | `/api/advert/:advertId`           | {title, description}              | 200            | 400          | Edits advert in the DB                           |
| DELETE      | `/api/advert/:advertId`          | {id}                         | 201            | 400          | Deletes project                                          
| GET         | `/api/user`                 | {}                           | 201            | 400          | Sends user detauls                                             |
| PUT         | `/api/user/:userId`                  | {username ...}            |                |              | Edits user                           |



<br>


## Links

### Trello/Kanban

[Trello](https://trello.com/b/ZaPhxnPt/old-is-cool) 

### Git

[Client repository Link](https://github.com/tomytubert/old-is-cool-api)

[Server repository Link](https://github.com/tomytubert/old-is-cool.git)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
