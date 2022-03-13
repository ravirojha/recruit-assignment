import axios from "axios";
import * as faker from 'faker';
import {URL, Util} from '../utils'

export default class Auth {

    static login = async ({email, password}) => {
        console.log(email, password);
        return axios.post(`${URL}/users/login`, {
            email,
            password
        })
    }

    static signup = async ({name, email, password}) => {
        return axios.post(`${URL}/users/signup`, {
            name,
            email,
            password
        })
    }
};
