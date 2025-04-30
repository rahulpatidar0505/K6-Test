import { handleSummary } from '../utility/helper.js';
import { get_user, get_list_of_user } from '../scenarios/user.js';
import { get_single_resource } from '../scenarios/resource.js';

export function setup() {
    console.info('=============== This is for setup =============')
}

export let options = {
    scenarios: {
        Test_get_user: {
            executor: 'constant-vus',
            vus: 5,
            duration: '20s',
            gracefulStop: '0s', // do not wait for iterations to finish in the end
            exec: 'get_user', // the function this scenario will execute
        },
        Test_get_list_of_user: {
            executor: 'constant-arrival-rate',
            rate: 90, timeUnit: '1m', // 20 iterations per minute, i.e. 1.5 RPS
            duration: '1m30s',
            preAllocatedVUs: 10, // the size of the VU pool for this scenario
            maxVUs: 10, // we don't want to allocate more VUs mid-test in this scenario
            exec: 'get_list_of_user',
        },
        Test_get_single_resource: {
            executor: 'ramping-arrival-rate',
            startTime: '20s', // the ramping API test starts a little later
            startRate: 10, timeUnit: '1s', // we start at 10 iterations per second
            stages: [
                { target: 50, duration: '10s' }, // go from 10 to 50 iters/s in the first 10 seconds
                { target: 100, duration: '1m30s' }, // hold at 100 iters/s for 1.5 minutes
                { target: 0, duration: '10s' }, // ramp down back to 0 iters/s over the last 30 second
            ],
            preAllocatedVUs: 50, // how large the initial pool of VUs would be
            maxVUs: 100, // if the preAllocatedVUs are not enough, we can initialize more
            exec: 'get_single_resource',
        },
    }
}

export function teardown() {
    console.info('=============== This is for teardown ==========')
}

export { handleSummary, get_user, get_list_of_user, get_single_resource };
