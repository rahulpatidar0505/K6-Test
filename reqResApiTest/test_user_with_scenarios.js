import { group } from 'k6';
import { get_user } from './helper.js';
import { get_list_of_user } from './helper.js';
import { get_single_resource } from './helper.js';

export function setup() {
    console.info('=============== This is for setup =============')
}

export function teardown() {
    console.info('=============== This is for teardown ==========')
}

export let options = {
    scenarios: {
        get_user: { // some arbitrary scenario name
            executor: 'constant-vus',
            vus: 5,
            duration: '20s',
            gracefulStop: '0s', // do not wait for iterations to finish in the end
            exec: 'get_user', // the function this scenario will execute
        },
        get_list_of_user: {
            executor: 'constant-arrival-rate',
            rate: 90, timeUnit: '1m', // 20 iterations per minute, i.e. 1.5 RPS
            duration: '1m30s',
            preAllocatedVUs: 10, // the size of the VU (i.e. worker) pool for this scenario
            maxVUs: 10, // we don't want to allocate more VUs mid-test in this scenario
            exec: 'get_list_of_user', // this scenario is executing different code than the one above!
        },
        get_single_resource: {
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
            exec: 'get_single_resource', // same function as the scenario above, but with different env vars
        },
    }
}

export function get_api_test() {
    group('User api test', function () {
        get_user(2)
        get_list_of_user(2)
        get_single_resource(2)
    })
}
