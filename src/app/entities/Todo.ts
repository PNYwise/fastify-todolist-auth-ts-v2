import "reflect-metadata"
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, RelationId } from "typeorm"
import { User } from "./User";

@Entity()
export class Todo {
     @PrimaryGeneratedColumn()
     id!: number;


     @Column()
     title!: string

     @Column("text")
     desc!: string


     @Column({ type: 'boolean', default: false })
     status!: boolean

     @ManyToOne(() => User, (user) => user.todos)
     user!: User

     @CreateDateColumn()
     created_at!: Date

     @UpdateDateColumn()
     updated_at!: Date
}