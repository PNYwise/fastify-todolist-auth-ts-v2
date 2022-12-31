import { DeleteResult, Like } from "typeorm";
import AppDataSource from "../../config/database";
import { Todo } from "../entities/Todo";
import { User } from "../entities/User";
import { TodoInput, TodoParam, todoQueryStringInput, TodoUpdateInput } from "../schemas/todo.schema";

export async function create(data: TodoInput & { user_id: string }): Promise<Todo | null> {
     const todoRepository = AppDataSource.getRepository(Todo);
     const todoEntity = new Todo;
     const user = await AppDataSource.getRepository(User).findOne({ where: { id: data.user_id } });
     if (user) {
          todoEntity.title = data.title;
          todoEntity.desc = data.desc;
          todoEntity.user = user;
          await todoRepository.save(todoEntity);
          return todoEntity;
     }
     return null;
}

export async function update(param: TodoParam, data: TodoUpdateInput): Promise<Todo | null> {
     const todoRepository = AppDataSource.getRepository(Todo);
     const todo = await todoRepository.findOneBy({ id: param.id });
     if (todo) {
          todoRepository.merge(todo, data)
          const results = todoRepository.save(todo);
          return results;
     }
     return null;
}

export async function destroy(param: TodoParam): Promise<DeleteResult> {
     const results = await AppDataSource.getRepository(Todo).delete(param.id);
     return results;
}

export async function findId(param: TodoParam): Promise<Todo | null> {
     const todoRepository = AppDataSource.getRepository(Todo)
     const todo = await todoRepository.findOne({
          where: {
               id: param.id
          }
     });
     return todo;
}

export async function findAll(query: todoQueryStringInput, user_id: string): Promise<Todo[]> {
     const { search, skip, take, sort } = query;
     const todoRepository = AppDataSource.getRepository(Todo);
     var searchData: {} = {};
     if (search) {
          searchData = {
               title: Like(`%${search}%`),
          }
     }
     const todo = await todoRepository.find({
          loadRelationIds: true,
          where: {
               ...searchData,
               user: {
                    id: user_id
               }
          },
          skip,
          take,
          order: {
               created_at: sort
          }
     });
     return todo
}