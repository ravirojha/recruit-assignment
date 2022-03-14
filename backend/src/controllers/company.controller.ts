import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { JoiValidate } from '../utils'
import * as Joi from "joi";
import AuthGuard from "../guards/auth.guard";
import CompanyService from '../services/company.service';

@Controller("")
export default class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard)
  @Get("/company")
  async get(@Query() query, @Req() req) {
    console.log(query, req.user,'************');
    return this.companyService.get(query.page, req.user);
  }

  @UseGuards(AuthGuard)
  @Post("/company")
  async add(@Body() body, @Req() req) {
    const { name, website, phone, address, city, state, country, industry } = JoiValidate(companySchema, body);
    return this.companyService.add({ name, website, phone, address, city, state, country, industry }, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete("/company/:id")
  async delete(@Param("id") id: string, @Req() req) {
    return this.companyService.delete(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Put("/company/:id")
  async update(@Param("id") id: string, @Body() body, @Req() req) {
    const { name, website, phone, address, city, state, country, industry } = JoiValidate(companySchema, body);
    return this.companyService.update(id, { name, website, phone, address, city, state, country, industry }, req.user);
  }

  @UseGuards(AuthGuard)
  @Get("/user/loggedin")
  async getLoggedInUser(@Req() req) {
    return {
      ...req.user,
      token: req.token,
    };
  }
}

const companySchema = Joi.object({
  name: Joi.string().min(1).required(),
  website: Joi.string().min(1).required(),
  phone: Joi.string().min(1).required(),
  address: Joi.string().min(1).required(),
  city: Joi.string().min(1).required(),
  state: Joi.string().min(1).required(),
  country: Joi.string().min(1).required(),
  industry: Joi.string().min(1).required(),
})





