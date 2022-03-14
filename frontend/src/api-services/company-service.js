import axios from "axios";
import {URL} from '../utils'


export default class CompanyService {
    static fetchCompanies = async ( {page = '1'}, {jwt}) => {
        return  axios.get(`${URL}/company`,
            {
                headers: {
                    jwt
                },
                params: {
                    page
                }
            });
    };

    static createCompany = async ({ name, website, phone, address, city, state, country, industry }, {jwt}) => {
        return axios.post(`${URL}/company`,{ name, website, phone, address, city, state, country, industry },{
            headers: {
                jwt
            }
        })
    }

    static updateCompany = async(id,{ name, website, phone, address, city, state, country, industry }, {jwt}) => {
        return axios.put(`${URL}/company/${id}`, { name, website, phone, address, city, state, country, industry },
            {
                headers: {
                    jwt
                }
            }
        )
    }

    static deleteCompany = async(id, {jwt}) => {
        return axios.delete(`${URL}/company/${id}`,
            {
                headers: {
                    jwt
                }
            }
        )
    }
}