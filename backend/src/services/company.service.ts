import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Between, FindCondition, getRepository, MoreThan } from "typeorm";
import { PageSize } from '../utils';
import Company from '../Entities/company';

@Injectable()
export default class CompanyService {
  async get(p: string, authUser) {
    const page = Math.max(Number(p) || 1, 1);
    const companyData = await Company.find({
      take: PageSize,
      skip: (page - 1) * PageSize,
    });
    const totalBikeCount = await Company.count();
    const pageCount = Math.ceil(totalBikeCount / PageSize);
    return { companyData, page, pageCount };
  }

  async add({ name, website, phone, address, city, state, country, industry }, authUser) {
    const company = new Company();
    company.name = name;
    company.website = website;
    company.phone = phone;
    company.address = address;
    company.city = city;
    company.state = state;
    company.country = country;
    company.industry = industry;
    await company.save();
    return company;
  }

  async delete(id: string, authUser) {
    const company = await Company.findOne(id);
    if (company) {
        await Company.delete(id);
        return {};
    }
    throw new NotFoundException();
  }

  async update(id, { name, website, phone, address, city, state, country, industry }, authUser) {
    const company = await Company.findOne(id);
    if (company) {
      company.name = name;
      company.website = website;
      company.phone = phone;
      company.address = address;
      company.city = city;
      company.state = state;
      company.country = country;
      company.industry = industry;
      await company.save();
      return company;
    } else throw new NotFoundException()
  }

}