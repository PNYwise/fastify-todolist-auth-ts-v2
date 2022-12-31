import { DataSource } from "typeorm"
import dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { User } from "../app/entities/User";
import { Todo } from "../app/entities/Todo";
dotenv.config()
const AppDataSource = new DataSource({
     type: "postgres",
     host: process.env.DB_HOST || "localhost",
     port: Number(process.env.DB_PORT) || 5432,
     username: process.env.DB_USERNAME || "root",
     password: process.env.DB_PASSWORD || "password",
     database: process.env.DB_NAME || "test",
     namingStrategy: new SnakeNamingStrategy(),
     entities: [User, Todo],
     synchronize: true,
     logging: false,
})

export default AppDataSource;