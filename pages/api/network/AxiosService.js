import axios from "axios";
import config from '../config'


export function get(params) {
    return axios({
        method: 'get',
        url: `${config.BASE_URL}${params[0] ? params[0] : ''}`,
        params: params[1] ? params[1] : '',
        headers: params[2] ? params[2] : {'Content-Type': 'application/json'}
    }).then(response => response.data)
}

// export function post(params) {
//     return axios({
//         method: 'post',
//         url: `${config.BASE_URL}${params[0]}`,
//         data: params[1],
//         headers: {"Content-Type": "multipart/form-data"}
//     }).then(response => {
//         response.data;
//         console.log('response.data', response.data)
//     })
// }

export async function post(params) {
    try {
        const result = await axios({
            method: 'post',
            url: `${config.BASE_URL}${params[0]}`,
            data: params[1],
            headers: {'content-type': 'multipart/form-data'}
            // headers: {
            //     'Accept': 'application/json'
            // }
        })
        return result.data;

    } catch (err) {

        throw err;
    }
}

// async function post(url, body, token = "", params = null) {
//     let {serverUrl, requestHeader} = getIRequestProp({token: token});
//     if (params === null) {
//         return await axios.post(serverUrl + url, body, {
//             headers: requestHeader,
//         })
//     } else {
//         return await axios.post(serverUrl + url, body, {
//             headers: requestHeader,
//             params: params
//         })
//     }
// }