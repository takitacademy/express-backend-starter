import {
  Body,
  Controller,
  Get,
  Path,
  Put,
  Route,
  Security,
} from 'tsoa';
import userService from '../services/user.service';
import { User } from '../types/interfaces/User.interface';

@Route('api/users')
@Security('jwtAuth')
export default class UserController extends Controller {
  @Get('{id}')
  public static async getById(@Path() id: string): Promise<User | undefined> {
    return userService.getById(id);
  }

  @Put('{id}')
  public static async updateUser(
    @Path() id: string,
    @Body() user: Omit<Partial<User>, 'password' | 'verified' | 'email' | 'id'>,
  ): Promise<User> {
    return userService.update(id, user);
  }

}
