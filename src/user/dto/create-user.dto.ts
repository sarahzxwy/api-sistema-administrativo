import { Role } from "@prisma/client";

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  phone: string;
  cpf: string;
  active: boolean;
}