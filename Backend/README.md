# HopIN API Documentation

## Endpoint: `/users/register`

### HTTP Method: `POST`

### Description:  
The **`/users/register`** endpoint allows users to register by providing their name, email, and password. The endpoint validates the input data and creates a new user in the database. If successful, it returns an authentication token and user details.

---

### Request Body

The request body should be in JSON format and include the following fields:  

- **`fullName`** (object):  
  - **`firstName`** (string, required):  
    User's first name (minimum 3 characters).  
  - **`lastName`** (string, optional):  
    User's last name (minimum 3 characters).  

- **`email`** (string, required, unique):  
  User's email ID (must be a valid email).  

- **`password`** (string, required):  
  User's password (minimum 6 characters).  


**Example Request Body**:  

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```
---

### Response

- **`user`** (object):

    - **`fullName`** (object) :
        - **`firstName`** (string) : User's first name( minimum 3 characters )
        - **`lastName`** (string) : User's last name( minimum 3 characters )

    - **`email`** (string) : User's email id( must be valid )

    - **`password`** (string) : User's password( minimum 6 characters )

- **`token`** (string) : JWT Token

**Example Response**:

```json
{
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "$2b$10$kFwM4Ji.zh2aT54MaEdB...",
    "_id": "674d9fafc...",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
---

## Endpoint: `/users/login`

### HTTP Method: `POST`

### Description  
The **`/users/login`** endpoint allows existing users to log in by providing their email and password. Upon successful authentication, the endpoint returns a JWT token and user details.

---

### Request Body

The request body should be in JSON format and include the following fields:  

- **`email`** (string, required, unique):  
  User's email ID (must be a valid email).  

- **`password`** (string, required):  
  User's password (minimum 6 characters).  

**Example Request Body**: 

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
---

### Response

- **`token`** (string) : JWT Token

- **`user`** (object):

    - **`fullName`** (object) :
        - **`firstName`** (string) : User's first name( minimum 3 characters )
        - **`lastName`** (string) : User's last name( minimum 3 characters )

    - **`email`** (string) : User's email id( must be valid )

    - **`password`** (string) : User's password( minimum 6 characters )

**Example Response**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "$2b$10$kFwM4Ji.zh2aT54MaEdB...",
    "_id": "674d9fafc...",
    "__v": 0
  }
}
```
---

## Endpoint: `/users/profile`

### HTTP Method: `GET`

### Description  
The **`/users/profile`** endpoint retrieves the authenticated user's profile information. The user must be logged in and authenticated to access this endpoint.

---

### Request Requirements

- **Headers**:
  - `Authorization`: `Bearer <JWT token>`  

---

### Response  

#### Success (200 OK)  

- **Description**: Returns the authenticated user's profile details.  
- **Response Body**:  

  ```json
  {
    "_id": "63f71bcf12a5c1e16c4e3f91",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com",
  }
  ```
---

## Endpoint: `/users/logout`

### HTTP Method: `GET`

### Description  
The **`/users/logout`** endpoint logs out the currently authenticated user by:  
1. Clearing the `token` from the user's cookies.  
2. Invalidating the token by storing it in the `DumpToken` collection, preventing its reuse.  

---

### Request Requirements

- **Headers**:
  - `Authorization`: `Bearer <JWT token>` (required if the token is not stored in cookies).  

---

### Response  

#### Success (200 OK)  

- **Description**: User successfully logged out.  
- **Response Body**:  

  ```json
  {
    "message": "Logged out successfully!"
  }
  ```