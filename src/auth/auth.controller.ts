import { Controller, Get, Post, Put, Body, UseGuards, Req} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/user.dto'
import { AuthService } from './auth.service'
import { Roles } from 'src/tools/RBAC/role.decorators';
import { RolesGuard } from 'src/tools/RBAC/roles.guards';
import { Role } from 'src/tools/RBAC/role.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/')
export class AuthController {
    constructor(private readonly authservice: AuthService) {}

    @Get('/users')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    getAllUsers(@Req() req) {
        console.log('User in controller:', req.user)
        
        return this.authservice.showAllUsers()
    }

    @Post('/signup')
    createAUser(@Body() createUserDto: CreateUserDto) {
        const { email, password } = createUserDto
        return this.authservice.createAUser(email, password)
    }

    @Post('/login')
    logAUser(@Body() loginDto: LoginDto) {
        const { email, password } = loginDto
        return this.authservice.logAUser(email, password)
    }


}
