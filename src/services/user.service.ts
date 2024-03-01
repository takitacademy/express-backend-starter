import sequelize from '../configs/database';
import {
  User,
} from '../types/interfaces/User.interface';
import { UserModel } from '../database/models';

class UserService {
  async create(newUser: { email: string, password: string }): Promise<User> {
    return sequelize.transaction(
      async (t) =>
        UserModel.create(newUser, {
          transaction: t,
        }) as unknown as User,
    );
  }

  async getById(id: string): Promise<User | undefined> {
    return sequelize.transaction(
      async (t) =>
        UserModel.findByPk(id, {
          transaction: t,
        }) as unknown as User,
    );
  }

  async update(id: string, updatedUser: Partial<User>): Promise<User> {
    return sequelize
      .transaction(
        async (t) =>
          UserModel.update(updatedUser, {
            where: { id },
            transaction: t,
            returning: true,
          }) as unknown as User,
      )
      .then(
        () =>
          UserModel.findOne({
            where: { id },
            attributes: ['id', 'firstName', 'lastName', 'email'],
          }) as unknown as User,
      );
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return sequelize.transaction(
      async (t) =>
        UserModel.findOne({ where: { email }, transaction: t }) as unknown as User,
    );
  }
}

export default new UserService();
