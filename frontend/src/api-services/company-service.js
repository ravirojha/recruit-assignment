import * as faker from 'faker';
import {Util} from '../utils';
import uuid from 'react-uuid';


export default class FoodService {
    static fetchCompanies = async () => {
        const companies = [];
        await Util.sleep(2000);
        for (let i = 0; i < 10; i++) {
            const company = {
                id: uuid(),
                name: faker.company.name(),
                website: faker.internet.url(),
                phone: faker.phone.phoneNumber(),
                address: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                country: faker.address.country(),
                industry: Math.random() > 0.5 ? (Math.random() > 0.5 ? 'Account' : 'IT' ) : (Math.random() > 0.5 ? 'Sales' : 'Health Care')
            };
            companies.push(company);
            await Util.sleep(0.01);
        }
        return companies;
    };
}