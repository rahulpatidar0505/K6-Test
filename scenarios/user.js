import http from 'k6/http';
import { check, sleep } from 'k6';
import { getBaseUrl, randomString} from '../utility/helper.js';
import { Trend } from 'k6/metrics';

let url, payload, id, response;
const params = {
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
    },
    tags: { name: 'User' }
};
const createUserPayload = JSON.parse(open('../data/createUserPayload.json'));

export const createUserTime = new Trend('create_user_time');

export function create_user() {
    url = getBaseUrl() + '/api/users/';
    createUserPayload.name = randomString(5)
    payload = JSON.stringify(createUserPayload)
    response = http.post(url, payload, params);
    createUserTime.add(response.timings.duration);
    id = response.json('id')
    check(response, {
        "Create project status code is : 201": (response) => response.status == 201,
        "Responce body includes id": (result) => result.body.includes('id'),
    })
    return id;
}

export function get_user() {
    url = getBaseUrl() + '/api/users/1'
    response = http.get(url, params);
    check(response, {
        "Get user status code is : 200": (response) => response.status === 200,
    });
}

export function get_list_of_user(page) {
    url = getBaseUrl() + '/api/users?page=' + page;
    response = http.get(url, params);
    check(response, {
        "Get list of user status code is : 200": (response) => response.status === 200,
    });
}

export function update_user() {
    payload = {
        name: "morpheus",
        job: "engineer"
    }
    url = getBaseUrl() + '/api/users/2'
    response = http.put(url, JSON.stringify(payload), params);
    check(response, {
        "Update user status code is : 200": (response) => response.status === 200,
    });
}

export function delete_user() {
    url = getBaseUrl() + '/api/users/2'
    response = http.del(url, null, params);
    sleep(1);
    check(response, {
        "Delete user status code is : 204": (response) => response.status === 204,
    });
}