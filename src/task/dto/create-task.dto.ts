import { IsString, IsOptional, IsDateString, IsInt, IsArray } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  startAt: string;

  @IsDateString()
  dueAt: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsDateString()
  @IsOptional()
  completedAt?: string;

  @IsInt()
  projectId: number;

  @IsArray()
  @IsInt({ each: true })
  userIds: number[];
}