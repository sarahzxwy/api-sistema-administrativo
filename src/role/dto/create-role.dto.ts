import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class CreateRoleDto {
  @Length(3)
  @IsString()
  @IsNotEmpty()
  roleName: string

  @IsString()
  @IsOptional()
  description?: string

  @IsBoolean()
  @IsOptional()
  roleActive?: boolean;
}
