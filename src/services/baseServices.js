import Axios from 'axios';
import { DOMAIN, TOKEN } from '../utils/Settings/config';
export class baseServices {
    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: { 'token': window.sessionStorage.getItem(TOKEN) }
        })
    }
    get = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: { 'token': window.sessionStorage.getItem(TOKEN) }
        })
    }
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: { 'token': window.sessionStorage.getItem(TOKEN) }
        })
    }
    delete = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: { 'token': window.sessionStorage.getItem(TOKEN) }
        })
    }
}
