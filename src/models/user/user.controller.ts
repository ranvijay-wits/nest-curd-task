import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { MyLogger } from 'src/logger/logger.service';

@Controller('/')
export class UserController {
    constructor(private userService: UserService, private readonly logger:MyLogger) {
        this.logger.log('AppService initialized');
     }


    @Post('add-user')
    async createUser(@Body() userData: User): Promise<User> {
        this.logger.log("adding user");
        return await this.userService.createUser(userData);
    }

    @Get('users')
    async getUsers(): Promise<User[]> {
        this.logger.log("fetching all user");
        return await this.userService.getUsers();
    }

    @Get('user/:id')
    async getUser(@Param('id') userId: string): Promise<User> {
        this.logger.log("fetching user detail")
        return await this.userService.getUser({ id: Number(userId) });
    }

    @Put('user/:id')
    async updateUser(@Param('id') userId: string, @Body() userData: User): Promise<User> {
        this.logger.log("Updating user detail")
        return await this.userService.updateUser({
            where: { id: Number(userId) },
            data: userData,
        })
    }

    @Delete('user/:id')
    async deleteUser(@Param('id') userId: string): Promise<User> {
        this.logger.log("Removing user");
        return await this.userService.deleteUser({ id: Number(userId) });
    }
}
