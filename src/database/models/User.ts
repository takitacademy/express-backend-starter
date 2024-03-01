/* eslint-disable import/no-cycle */
import { UUIDV4 } from 'sequelize';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  Sequelize,
  DataType,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { HashString } from '../../helpers';

/**
 * Sequelize model
 * @export
 * @class User
 * @extends {Model<UserModel>}
 */
@Table({
  tableName: 'Users',
  modelName: 'UserModel',
})

class UserModel extends Model {
  @Default(UUIDV4())
  @PrimaryKey
  @Column(DataType.UUID)
  id!: string;

  @Column(DataType.STRING)
  firstName!: string;

  @Column(DataType.STRING)
  lastName!: string;

  @Column(DataType.STRING)
  email!: string;

  @Default('')
  @Column
  password!: string;

  @Column
  governmentID!: string;

  @Column
  profilePhoto!: string;

  @Column
  dateOfBirth!: Date;

  @Column
  gender!: string;

  @Column
  maritalStatus!: string;

  @Column
  nationality!: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  verified!: boolean;

  @CreatedAt
  @Default(Sequelize.fn('NOW'))
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Default(Sequelize.fn('NOW'))
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: UserModel) {
    if (instance.changed('password')) {
      instance.password = await HashString(instance.password);
    }
  }
}

export default UserModel;
