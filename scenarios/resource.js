import http from 'k6/http';
import { check } from 'k6';
import { getBaseUrl} from '../utility/helper.js';

let url, response;
const params = {
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
    },
};

export function get_single_resource(id) {
    let getResourceParams = {
        ...params,
        tags: { name: 'Resource' },
      };  

    url = getBaseUrl() + '/api/unknown/' + id
    
    response = http.get(url, getResourceParams);
    if (response.status != 200) {
        check(response, {
            "Get valid single resource status code is : 404": (response) => response.status === 404,
        });    
    } else {
        check(response, {
            "Get invalid single resource status code is : 200": (response) => response.status === 200,
            "Responce body includes id": (result) => result.body.includes('id'),
        });
    }
}
