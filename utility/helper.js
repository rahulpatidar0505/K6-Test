import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function getBaseUrl() {
    return (__ENV.BASE_URL || 'https://reqres.in').trim();
}

export function handleSummary(data) {
    return {
      "test-summary.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),

    };
}

export function randomString(length) {
    const rand_number = Math.random(length)
    var id = 'test_' + rand_number
    return id;
}

