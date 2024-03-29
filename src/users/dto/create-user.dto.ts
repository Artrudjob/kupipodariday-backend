import { IsEmail, IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2, 30)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @Length(2, 200)
  about: string;

  @IsUrl()
  avatar: string;
}
