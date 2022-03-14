import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Company from './Entities/company';
import User from './Entities/user';
import UsersController from './controllers/user.controller';
import UsersService from './services/user.service';
import CompanyController from './controllers/company.controller';
import CompanyService from './services/company.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sqlite.db',
      synchronize: true,
      entities: [User, Company],
      logging: true,
    }),
  ],
  controllers: [AppController, UsersController, CompanyController],
  providers: [AppService, UsersService, CompanyService],
})
export class AppModule {}
