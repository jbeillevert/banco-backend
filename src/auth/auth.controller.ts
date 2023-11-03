import { Controller, Get, Post, Put, Body, UseGuards} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/user.dto'
import { AuthService } from './auth.service'
import { Roles } from 'src/tools/decorators/role.decorators';
import { RolesGuard } from 'src/tools/guards/roles.guards';

@Controller('/api/')
export class AuthController {
    constructor(private readonly authservice: AuthService) {}

    @Get('/users')
    @Roles('admin')
    @UseGuards(RolesGuard)
    getAllUsers() {
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
