/* eslint-disable @typescript-eslint/no-throw-literal */
import {
  comparePassword,
  generateToken,
  verifyToken,
  HashString,
} from '../helpers';
import CustomError from '../helpers/CustomError';
import UserService from './user.service';
import { IJwtPayload } from '../types';

class AuthService {
  private readonly userService: typeof UserService;

  constructor() {
    this.userService = UserService;
  }

  async create(newUser: { email: string, password: string }) {
    const user = await this.userService.getByEmail(newUser.email);
    if (user) {
      throw new CustomError('Account exists');
    }
    const createdUser = await this.userService.create(newUser);
    return createdUser;
  }

  async verifyEmail(token: string) {
    if (!token) {
      throw new CustomError('No token');
    }
    const { ref } = (await verifyToken(token)) as IJwtPayload;
    const user = await this.userService.update(ref, { verified: true });
    const createdUser = {
      id: user.id,
      email: user.email,
      token: await generateToken({ id: user.id, email: user.email }),
    };
    return createdUser;
  }

  async login(loginUser: { email: string, password: string }) {
    const user = await this.userService.getByEmail(loginUser.email);
    if (!user) {
      throw new CustomError('Invalid credentials');
    }

    const isSame = await comparePassword(loginUser.password, user.password);

    if (!isSame) {
      throw new CustomError('Invalid credentials');
    }
    const verificationToken = await generateToken({ ref: user.id });
    if (!user.verified) {
      return {
        success: false,
        message: 'Account not verified',
        token: verificationToken,
      }
    }

    const userPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const token = await generateToken(userPayload);
    return {
      success: true,
      accessToken: token,
      user: userPayload,
      message: 'success',
    };
  }

  async forgotPassword(forgetPasswordRequest: { email: string }) {
    const { email } = forgetPasswordRequest;
    const findUser = await this.userService.getByEmail(email);
    if (!findUser) {
      return {
        message: 'Invalid request',
      };
    }
    const token =
      findUser && (await generateToken({ ref: findUser.id, email: findUser.email }));

    return {
      message: "Token shared for resetting password",
      token: token,
    };
  }

  async resetPassword(token: string, resetPasswordRequest: { password: string }) {
    const { password } = resetPasswordRequest;
    const updatedPassword = await HashString(password);
    const { ref } = (await verifyToken(token)) as IJwtPayload;

    await this.userService.update(ref, { password: updatedPassword });

    return {
      message: "Password reset success",
    };
  }
}

export default new AuthService();
