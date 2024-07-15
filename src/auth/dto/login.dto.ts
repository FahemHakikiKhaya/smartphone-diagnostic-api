import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import * as CryptoJS from 'crypto-js';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return CryptoJS.AES.decrypt(value, process.env.SECRET_KEY).toString(
      CryptoJS.enc.Utf8,
    );
  })
  password: string;
}
