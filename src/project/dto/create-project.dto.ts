import { IsDateString, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class CreateProjectDto {
  @Length(3)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  completedAt?: Date;
}