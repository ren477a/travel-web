# API Endpoints

### Authentication

* **POST** /auth/register
Register a user account
Returns: {success: boolean, msg: String}

* **POST** /auth/authenticate
Authenticate a user a 
Returns: {jwt: String, user: }


### Users

* **GET** /users
> List of all users

* **GET** /users/:id/profile
> Gets the profile of the user



### Travel Agencies
* **GET** /agencies
* **POST** /agencies
* **GET** /agencies/:agencyId
* **DELETE** /agencies/:agencyId


### Tours
* **GET** /tours
* **POST** /tours
* **GET** /tours/:tourId
* **DELETE** /tours/:tourId
