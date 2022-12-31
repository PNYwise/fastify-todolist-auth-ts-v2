# About this application


## Technologies that I use
* [Fastify](https://www.fastify.io/) - Web server
* [typeORM](https://typeorm.io/) - Database ORM
* [Zod](https://github.com/colinhacks/zod) - Request and response validation
* [TypeScript](https://www.typescriptlang.org/) - Types & other cool stuff
* [Postgres](https://www.postgresql.org/) - Database
* [Docker](https://www.docker.com/) - Containerization

## Features 
* [Auth](#auth)
* [Register](#register)
* [Login](#login)
* [User](#user)
* [Todo](#todo)
* [Todos](#todos)
* [Create a todo](#createtodo)
* [Update a todo](#updatetodo)
* [Delete a todo](#deletetodo)

# API SPEC
## Ping 
**GET** *http://localhost:3000/api*

**Response** 200
```json
{
     "message": "string",
     "code": "number",
}
```

## **Auth**
## register 
**POST** *http://localhost:3000/api/register*

**Request**
```json
{
     "email":"string",
     "name": "string",
     "password": "string",
     
}
```
**Response** 201
```json
{
     "message": "string",
     "code": "number",
     "data" : {
          "id": "string",
          "email": "string",
          "name": "string",
          "created_at":"date",
          "updated_at":"date"
     }
}
```
**Response** 400
```json
{
     "message": "string",
     "code": "number",
     "error": [
          {
               "instancePath": "string",
               "keyword": "string",
               "message": "string"
          }
     ]
}
```


## login
**POST** *http://localhost:3000/api/login*

**Request**
```json
{
     "email":"string",
     "password": "string",
}
```
**Response** 200
```json
{
     "message": "string",
     "code": "number",
     "data" : {
          "accessToken":"string"
     }
}
```
**Response** 400
```json
{
     "message": "string",
     "code": "number",
     "error": [
          {
               "instancePath": "string",
               "keyword": "string",
               "message": "string"
          }
     ]
}
```
## **USER**

## User
**GET** *http://localhost:3000/api/user*

**RequestHeader**
* Authorization : *token*

**Response** 200
```json
{
     "message": "string",
     "code": "number",
     "data" : {
          "id": "string",
          "email": "string",
          "name": "string",
          "created_at":"date",
          "updated_at":"date"
     }
}
```
## **TODO**


## Todo
**GET** *http://localhost:3000/api/todos/:id*

**RequestHeader**
* Authorization : *token*

**Response** 200
```json
{
     "message": "string",
     "code": "number",
     "data" : {
          "id": "string",
          "title": "string",
          "desc": "string",
          "created_at":"date",
          "updated_at":"date"
     }
}
```
**Response** 404
```json
{
     {
          "message": "string",
          "code": "number"
     }
}
```


## Todos
**GET** *http://localhost:3000/api/todos*

**RequestHeader**
* Authorization : *token*

**Query"String"s**
* search : *title*
* sort : *asc* || *desc* 
* skip : number
* take : number

**Response** 200
```json
{
     "message": "string",
     "code": "number",
     "data" :[
          {
               "id": "string",
               "title": "string",
               "desc": "string",
               "created_at":"date",
               "updated_at":"date"
          },
          {
               "id": "string",
               "title": "string",
               "desc": "string",
               "created_at":"date",
               "updated_at":"date"
          }
     ] 
}
```
## CreateTodo
**POST** *http://localhost:3000/api/todos*

**RequestHeader**
* Authorization : *token*

**Request**
```json
{
     "title":"string",
     "desc": "string",
}
```
**Response** 201
```json
{
     "message": "string",
     "code": "number",
     "data" : {
          "title": "string",
          "desc": "string",
     }
}
```

**Response** 400
```json
{
     "message": "string",
     "code": "number",
     "error": [
          {
               "instancePath": "string",
               "keyword": "string",
               "message": "string"
          }
     ]
}
```
## UpdateTodo
**PUT** *http://localhost:3000/api/todos/:id*

**RequestHeader**
* Authorization : *token*

**Request**
```json
{
     "title":"string",
     "desc": "string",
}
```
**Response** 200
```json
{
     "message": "string",
     "code": "number",
     "data" : {
          "title": "string",
          "desc": "string",
     }
}
```
**Response** 400
```json
{
     "message": "string",
     "code": "number",
     "error": [
          {
               "instancePath": "string",
               "keyword": "string",
               "message": "string"
          }
     ]
}
```

**Response** 404
```json
{
     {
          "message": "string",
          "code": "number"
     }
}
```

## DeleteTodo
**DELETE** *http://localhost:3000/api/todos/:id*

**RequestHeader**
* Authorization : *token*

**Response** 200
```json
{
     "message": "string",
     "code": "number",
}
```
**Response** 404
```json
{
     {
          "message": "string",
          "code": "number"
     }
}
```



## **AUTH ERRORS**

**Response** 401
```json
{
     "message": "string",
     "code": "number",
}
```

## **SERVER ERRORS**
**Response** 500
```json
{
     "message": "string",
     "code": "number",
}
```
