import "reflect-metadata"
import { Entity, Column, PrimaryColumn, Generated, Unique, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Todo } from "./Todo";

@Entity()
export class User extends BaseEntity {
     @PrimaryColumn({ type: "uuid" })
     @Generated("uuid")
     id!: string;


     @Column()
     name!: string

     @Unique(["email"])
     @Column()
     email!: string


     @Column()
     salt!: string

     @Column()
     password!: string

     @OneToMany(() => Todo, (todo) => todo.user)
     todos!: Todo[]

     @CreateDateColumn()
     created_at!: Date

     @UpdateDateColumn()
     updated_at!: Date
}