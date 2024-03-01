import { Body, Controller, Post, Route, SuccessResponse, Path, Put } from 'tsoa';
import authService from '../services/auth.service';
import { HTTP_CREATED, HTTP_OK } from '../constants/httpStatusCodes';
import { User } from '../types/interfaces/User.interface';


@Route('api/auth')
export default class AuthController extends Controller {
  @SuccessResponse(HTTP_CREATED, 'Created')
  @Post('signup')
  public static async createUser(@Body() newUser: { email: string, password: string }): Promise<User> {
    return authService.create(newUser);
  }

  @SuccessResponse('200', 'OK')
  @Post('login')
  public static async loginUser(
    @Body() loginUser: { email: string, password: string },
  ): Promise<{
    success: boolean;
    message: string;
    accessToken?: string;
    url?: string
    user?: {
      firstName: string;
      lastName: string;
      email: string;
    };
  }> {
    return authService.login(loginUser as { email: string, password: string });
  }

  @Put('verify-account/{token}')
  @SuccessResponse(HTTP_OK, 'Ok')
  public static async verifyEmail(@Path() token: string): Promise<any> {
    return authService.verifyEmail(token);
  }

  @Post('forgot-password')
  @SuccessResponse(HTTP_OK, 'Ok')
  public static async forgotPassword(
    @Body() req: { email: string },
  ): Promise<any> {
    return authService.forgotPassword(req);
  }

  @Post('reset-password/{token}')
  @SuccessResponse(HTTP_OK, 'Ok')
  public static async resetPassword(
    @Path() token: string,
    @Body() req: { password: string, confirm_password: string },
  ): Promise<any> {
    const inputs = {
      password: req.password,
      confirm_password: req.confirm_password,
    };
    return await authService.resetPassword(token, inputs);
  }
}
