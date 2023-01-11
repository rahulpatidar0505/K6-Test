import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend } from 'k6/metrics';

const createUserPayload = JSON.parse(open('./data/createUserPayload.json'));
// const sampleData = open('./data/sample.txt');
// const flavors = open('./data/flavors.list');
const BASE_URL = 'https://reqres.in';
let myTrend = new Trend('my request duration');
var params = {
    headers: {
        'Content-Type': 'application/json'
    },
};
function randomString(length) {
    const rand_number = Math.random(length)
    var id = 'test_' + rand_number
    return id;
}
let id;
// ================================ Project =======================================

export function create_user() {
    var url = BASE_URL + '/api/users/';
    createUserPayload.name = randomString(5)
    var payload = JSON.stringify(createUserPayload)

    let res = http.post(url, payload, params);
    myTrend.add(res.timings.duration);
    console.log('Response time was ' + String(res.timings.duration) + ' ms for create user request');
    id = res.json('id') // id = result.json('results')[0]['uid']
    check(res, {
        "Create project status code is : 201": (res) => res.status == 201,
        "Responce body includes id": (result) => result.body.includes('id'),
        "Responce body includes name": (result) => result.body.includes('name'),
        "Responce body includes job": (result) => result.body.includes('job'),
    })
    console.log("Id is : " + id)
    return id;
}

export function get_user(id) {
    const url = BASE_URL + '/api/users/' + id
    let res = http.get(url);
    check(res, {
        "Get user status code is : 200": (res) => res.status === 200,
    });
}

export function get_list_of_user(page) {
    const url = BASE_URL + '/api/users?page=' + page;
    let res = http.get(url);
    check(res, {
        "Get list of user status code is : 200": (res) => res.status === 200,
    });
}

export function update_user(id) {
    var payload = {"name": "test1",
                   "job": "qa"
                };
    // const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    // const url = BASE_URL + '/api/users/' + id
    // var res = http.put(url, payload, { headers: headers });
    const url = BASE_URL + '/api/users/' + id
    var res = http.put(url, payload);
    check(res, {
        "Update user status code is : 200": (res) => res.status === 200,
    });
}

export function delete_user(id) {
    const url = BASE_URL + '/api/users/' + id
    let res = http.del(url);
    sleep(3);
    check(res, {
        "Delete user status code is : 204": (res) => res.status === 204,
    });
}

export function get_single_resource(id) {
    const url = BASE_URL + '/api/unknown/' + id
    let res = http.get(url);
    if (res.status != 200) {
        check(res, {
            "Get valid single resource status code is : 404": (res) => res.status === 404,
        });    
    } else {
        check(res, {
            "Get invalid single resource status code is : 200": (res) => res.status === 200,
            "Responce body includes id": (result) => result.body.includes('id'),
        });
    }

}

// export function add_s_list(qwsId, language, file_type, concept_name) {
//     var payload = {
//         file: http.file(flavors),
//     };
//     const url = BASE_URL + '/list;
//     var params = {
//         'file_type': file_type,
//     };
//     let res = http.post(url, payload, params);
//     check(res, {
//         "Add meaning list status code is : 200": (res) => res.status === 200,
//     });
// }