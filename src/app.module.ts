import { Module } from '@nestjs/common';
import { UserModule } from './models/user/user.module';


@Module({
  imports: [UserModule],
})
export class AppModule {}
