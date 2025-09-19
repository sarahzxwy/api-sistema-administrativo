import { Role } from "@prisma/client";


export class UpdateUserDto {
  email?: string;

  name?: string;

  password?: string;

  phone?: string;

  cpf?: string;

  roleId?: number;

  active?: boolean;
}
