import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { MyLogger } from 'src/logger/logger.service';;


@Module({
  providers: [UserService, PrismaService, MyLogger],
  controllers: [UserController],
  exports: [UserModule],
})
export class UserModule {}
