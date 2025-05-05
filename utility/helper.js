import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function getBaseUrl() {
    return (__ENV.BASE_URL || 'https://reqres.in').trim();
}

export function handleSummary(data) {
    return {
      "test-summary.html": htmlReport(data),
    };
}

export function randomString(length) {
    const rand_number = Math.random(length)
    var id = 'test_' + rand_number
    return id;
}

