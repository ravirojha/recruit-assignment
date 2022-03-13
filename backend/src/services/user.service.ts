import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as Bcryptjs from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import User from '../Entities/user'
import { JwtSecret, PageSize } from '../utils'

@Injectable()
export default class UsersService {

  async login({email, password}) {
    const user = await User.findOne({
      where: {email: email.toLowerCase() },
      select: ['id', 'name', 'email','password']
    });

    if (user) {
      if (Bcryptjs.compareSync(password, user.password)) {
        return {
          ...user,
          password: undefined,
          jwt: Jwt.sign({ id: user.id }, JwtSecret, { expiresIn: '1d' }),
        };
      } else throw new HttpException('Email and password not match', 400);
    } else throw new NotFoundException();
  }

  async signup({name, email, password}) {
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = new User();
      user.email = email.toLowerCase();
      user.password = Bcryptjs.hashSync(password, 10);
      user.name = name;
      await user.save();
      return {
        ...user,
        password: undefined,
      };
    } else throw new HttpException('Email already exists', 400);
  }

}