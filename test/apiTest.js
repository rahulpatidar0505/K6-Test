import { group } from 'k6';
import { handleSummary} from '../utility/helper.js';
import * as user from '../scenarios/user.js';
import * as resource from '../scenarios/resource.js';

export function setup() {
    console.info('=============== This is for setup =============')
}

export default function apiTest() {
    group('User API - ', function () {
        user.create_user()
    
        user.get_user()

        user.get_list_of_user(2)
    })

    group('Resource API - ', function () {
        resource.get_single_resource(2)
    })
    
}

export function teardown() {
    console.info('=============== This is for teardown ==========')
}

export { handleSummary };
