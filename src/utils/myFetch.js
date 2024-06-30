import { encryptJsonToStr, decryptStrToJson } from './crypto'
import Vue from "vue";
import axios from "axios";
import VueCookies from "vue-cookies";

const axio = axios.create({
    baseURL: 'https://sdapi.ichbupt.cn',
    timeout: 100000000
})

axio.interceptors.response.use(function(response) {

    return response
}, function (error) {
    console.log('error', error.status)

    return Promise.reject(error)
})

axio.interceptors.request.use(function (config) {
    return config;
}, function (err) {
    return Promise.reject(err);
})

function isEmptyObject(obj){
    for(var key in obj){
        return false;
    }
    return true;
}

let myFetch = async function (urlpath, methodx, body, ContentType) {
    let header = {
        'Content-Type': 'text/plan; charset=utf-8',
    }
    let nbody = {}
    if (body == null || body === undefined || isEmptyObject(body)){
        nbody = {}
    } else {
        nbody = encryptJsonToStr(body)
    }

    const response = await axio({
        url: urlpath,
        method: methodx,
        headers: header,
        data: nbody
    })
    return decryptStrToJson(response)
}

export default myFetch