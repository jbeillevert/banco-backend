import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator'


export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password: string    
}


export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}