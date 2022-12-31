import appDataSource from "../../config/database";
import { hashPassword } from "../../config/jwt";
import { User } from "../entities/User";
import { UserInput, UserResponse } from "../schemas/user.schema";



// create
export async function create(data: UserInput): Promise<UserResponse> {
     const userRepository = appDataSource.getRepository(User)
     const userEntity = new User();
     const { password } = data;
     const { hash, salt } = hashPassword(password);
     userEntity.name = data.name;
     userEntity.email = data.email;
     userEntity.password = hash;
     userEntity.salt = salt;
     await userRepository.save(userEntity);
     return {
          name: userEntity.name,
          email: userEntity.email,
          id: userEntity.id,
          created_at: userEntity.created_at,
          updated_at: userEntity.updated_at,
     };
}

// // find by email
export async function findByEmail(email: string): Promise<User | null> {
     const userRepository = appDataSource.getRepository(User)
     const data = await userRepository.findOneBy({ email });
     return data;
}

// find by id
export async function findById(id: string): Promise<UserResponse | null> {
     const userRepository = appDataSource.getRepository(User)
     const user = await userRepository.findOne({
          where: {
               id: id
          },
          select: {
               name: true,
               email: true,
               id: true,
               created_at: true,
               updated_at: true
          }
     });
     return user;
} 