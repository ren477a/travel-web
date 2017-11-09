# API Endpoints

### Authentication


* **POST** /auth/register  

Register a user account  

Returns: {success: boolean, msg: String}

Status: *Completed*


* **POST** /auth/authenticate

Authenticate a user

Returns: {jwt: String, user: }

Status: *Completed*


### Users


* **GET** /users

List of all users


* **GET** /users/:id/profile

Gets the profile of the user



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
