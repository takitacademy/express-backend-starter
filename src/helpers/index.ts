import bcrypt from 'bcrypt';
import jsonWebToken from 'jsonwebtoken';
import { AppConfig } from '../configs';

export const generateSalt = async (saltRounds: string) =>
  bcrypt.genSaltSync(parseInt(saltRounds));

export const HashString = async (plainText: string): Promise<string> =>
  bcrypt.hashSync(plainText, await generateSalt("10"));

export const comparePassword = async (password: string, actualPassword: string) =>
  bcrypt.compareSync(password, actualPassword);

export const generateToken = async (
  payload: Record<string, unknown>,
): Promise<string> =>
  jsonWebToken.sign(payload, AppConfig.jwtSecret as string, { expiresIn: '1d' });

export const verifyToken = async (token: string) =>
  jsonWebToken.verify(token, AppConfig.jwtSecret as string);
