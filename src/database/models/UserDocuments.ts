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
  AllowNull,
  ForeignKey,
  Unique
} from 'sequelize-typescript';
import UserModel from './User';

/**
 * Sequelize model
 * @export
 * @class User
 * @extends {Model<UserDocuments>}
 */
@Table({
  tableName: 'user_documents',
  modelName: 'UserDocuments',
})

class UserDocuments extends Model {
  @Default(UUIDV4())
  @PrimaryKey
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.UUID)
  @ForeignKey(() => UserModel)
  userId!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  nationalId!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  nationalIdVerified!: boolean

  @AllowNull(true)
  @Column(DataType.STRING)
  maritalStatus!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  maritalStatusVerified!: boolean

  @AllowNull(true)
  @Column(DataType.STRING)
  profilePhoto!: string

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  profilePhotoVerified!: boolean;

  @CreatedAt
  @Default(Sequelize.fn('NOW'))
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Default(Sequelize.fn('NOW'))
  @Column(DataType.DATE)
  updatedAt!: Date;
}

export default UserDocuments;
