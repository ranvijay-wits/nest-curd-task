import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { MyLogger } from 'src/logger/logger.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private readonly logger:MyLogger) { }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {

        try {
            return await this.prisma.user.create({ data });
        } catch (error) {
            this.logger.log("User not added")
            throw new BadRequestException("User not added")
        }
    }

    async getUsers(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async getUser(userId: Prisma.UserWhereUniqueInput): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: userId });
        if (!user) {
            this.logger.error("User with this ID not found.")
            throw new NotFoundException(`User with this ID not found.`);
        }
        return user;
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        try {
            const { where, data } = params;
            return await this.prisma.user.update({
                where,
                data
            });
        } catch (error) {
            throw new BadRequestException("Something gone wrong!!!");
        }

    }

    async deleteUser(userId: Prisma.UserWhereUniqueInput): Promise<User> {
        try {
            return await this.prisma.user.delete({ where: userId })
        } catch (error) {
            this.logger.error("Record to delete does not exist.")
            throw new BadRequestException("Record to delete does not exist.");
        }

    }
}

