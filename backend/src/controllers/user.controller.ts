import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import UsersService from '../services/user.service'
import * as Joi from 'joi';
import { JoiValidate } from '../utils';
import AuthGuard from "../guards/auth.guard";

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  async login(@Body() body) {
    const { email, password } = JoiValidate(LoginSchema, body);
    return this.usersService.login({ email, password });
  }

  @Post('/signup')
  async signup(@Body() body) {
    const { name, email, password } = JoiValidate(SignupSchema, body);
    return this.usersService.signup({ email, password, name });
  }

}

const LoginSchema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
});

const SignupSchema = LoginSchema.keys({
  name: Joi.string().min(4).required(),
  password: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
});
