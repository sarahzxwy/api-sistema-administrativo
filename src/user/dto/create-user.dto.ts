import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(6)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak'})
  password: string;

  @IsPhoneNumber('BR')
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  cpf: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}