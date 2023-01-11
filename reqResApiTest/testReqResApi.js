import { group, sleep } from 'k6';
import * as user from './helper.js';
let id;
//  language = 'en_US'

export function setup() {
    console.info('=============== This is for setup =============')
}
export default function apiTest() {
    group('User API - ', function () {
        id = user.create_user()
    
        user.get_user(id)
    
        user.get_list_of_user(2)
        
        user.update_user(id)

        user.delete_user(id)

        user.get_single_resource(2)

        user.get_single_resource(23)

    })
    
}
export function teardown() {
    console.info('=============== This is for teardown ==========')
}
