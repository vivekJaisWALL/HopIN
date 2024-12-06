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
---

## **Endpoint**: Register a New Pilot (Driver)

### **Route**: `/pilots/register`

### **HTTP Method**: `POST`

### **Description**
This endpoint allows new pilots (drivers) to register for the HopIN platform. Pilots need to provide personal details and information about their vehicle. Once registered, they will receive a JSON Web Token (JWT) for authentication.

---

### **Request Body**

The request body must be a JSON object with the following fields:

#### **Required Fields**
| Field                  | Type      | Description                                              | Validation                                                                 |
|------------------------|-----------|----------------------------------------------------------|-----------------------------------------------------------------------------|
| `email`               | `string`  | Email address of the pilot                               | Must be a valid email format                                               |
| `fullName.firstName`  | `string`  | First name of the pilot                                  | Must be at least 3 characters long                                         |
| `fullName.lastName`   | `string`  | Last name of the pilot                                   | Optional, but if provided, must be at least 3 characters long              |
| `password`            | `string`  | Password for the pilot's account                        | Must be at least 6 characters long                                         |
| `vehicle.color`       | `string`  | Vehicle color                                            | Must be at least 3 characters long                                         |
| `vehicle.numberPlate` | `string`  | Vehicle number plate                                     | Must be at least 3 characters long                                         |
| `vehicle.capacity`    | `integer` | Capacity of the vehicle                                  | Must be at least 1                                                        |
| `vehicle.vehicleType` | `string`  | Type of vehicle (e.g., bike, auto, car)                 | Must be one of: `bike`, `auto`, `car`                                      |

---

### **Request Example**
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "pilot@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "numberPlate": "AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```
---
### **Response**

#### **Success Response (201)**
- **Status Code**: `201 Created`
- **Description**: Pilot registered successfully and JWT token issued.
- **Body**:
  ```json
  {
    "pilot": {
      "_id": "63f2e1e8c0c8b3a879d9c761",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "pilot@example.com",
      "vehicle": {
        "color": "Red",
        "numberPlate": "AB1234",
        "capacity": 4,
        "vehicleType": "car"
      },
      "_id": "6752a4df848df5108...",
      "__v": 0,
      "status": "inactive"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
