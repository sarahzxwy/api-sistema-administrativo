import { IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  email?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  cpf?: string;

  @IsOptional()
  roleId?: number;

  @IsOptional()
  active?: boolean;
}
