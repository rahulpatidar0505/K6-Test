import { group } from 'k6';
import { handleSummary} from '../utility/helper.js';
import * as user from '../scenarios/user.js';
import * as resource from '../scenarios/resource.js';

export let options = {
    thresholds: {
        http_req_failed: ['rate<=0.05'],
        http_req_duration: ["p(95)<5000"], //95% of requests should be below 5s
    },
    stages: [
        { duration: '5s', target: 5 },
        { duration: '30s', target: 10 },
        { duration: '2s', target: 0 },
      ],
};

export function setup() {
    user.create_user()
}

export default function apiTest() {
    group('User API - ', function () {
        user.get_user()

        user.update_user()

        user.get_list_of_user(2)
    })

    group('Resource API - ', function () {
        resource.get_single_resource(2)
    })
    
}

export function teardown() {
    user.delete_user()
}

export { handleSummary };
