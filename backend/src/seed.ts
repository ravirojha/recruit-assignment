import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as Bcryptjs from "bcryptjs";
import * as faker from 'faker';
import Company from './Entities/company';
import User from './Entities/user';

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  await User.delete({});
  await Company.delete({});

    const user1 = new User();
    user1.name = faker.name.firstName();
    user1.email = faker.internet.email().toLowerCase();
    user1.password = Bcryptjs.hashSync("1234", 10);
    await user1.save();

  const user2 = new User();
  user2.name = faker.name.firstName();
  user2.email = faker.internet.email().toLowerCase();
  user2.password = Bcryptjs.hashSync("1234", 10);
  await user2.save();

  for (let i = 1; i < 51; i++) {
    const company = new Company();
      company.name = `Company ${i}`,
      company.website = faker.internet.url(),
      company.phone = '999-999-9999',
      company.address = faker.address.streetAddress(),
      company.city = faker.address.city(),
      company.state = faker.address.state(),
      company.country = faker.address.country(),
      company.industry = Math.random() > 0.5 ? (Math.random() > 0.5 ? 'Account' : 'IT' ) : (Math.random() > 0.5 ? 'Sales' : 'Health Care')
      await company.save();
  }
  await app.close();
};

bootstrap().then();