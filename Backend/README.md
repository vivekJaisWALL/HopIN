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