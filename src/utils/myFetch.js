import { encryptJsonToStr, decryptStrToJson } from './crypto'
import Vue from "vue";
import axios from "axios";
import VueCookies from "vue-cookies";

const axio = axios.create({
    baseURL: 'https://sdapi.ichol.tech',
    timeout: 10000
})

axio.interceptors.response.use(function(response) {

    return response
}, function (error) {
    console.log('error', error.status)

    return Promise.reject(error)
})

axio.interceptors.request.use(function (config) {
    // 这里的config包含每次请求的内容

    // 从cookies中取出token，不要将token存在localstorage中
    const token = VueCookies.get('token')
    if (token) {
        // 添加headers
        config.headers['Authorization'] = token;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
})

let myFetch = async function (urlpath, methodx, body, ContentType) {
    let header = {
        'Content-Type': 'text/plan; charset=utf-8',
    }
    let nbody = {}
    if (body == {} || body == null || body === undefined) {
        nbody = {}
    } else {
        nbody = encryptJsonToStr(body)
    }

    const response = await axio({
        url: urlpath,
        method: methodx,
        headers: header,
        body: nbody
    })
    return decryptStrToJson(response)
}

export default myFetch