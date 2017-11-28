# Travel Deals App [![Build Status](https://travis-ci.com/alcren/travel-web.svg?token=EtuYzuT6sbxmdz1nQqeR&branch=master)](https://travis-ci.com/alcren/travel-web)

# API Endpoints

### Authentication


* **POST** api/auth/register  

Register a user account  

Returns: {success: boolean, msg: String}

Status: *Completed*


* **POST** api/auth/authenticate

Authenticate a user

Returns: {jwt: String, user: }

Status: *Completed*


### Users


* **GET** api/users

List of all users


* **GET** api/users/:id/profile

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
