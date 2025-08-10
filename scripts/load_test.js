import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 }, // ramp up to 10 users
    { duration: '1m', target: 10 },  // hold for 1 min
    { duration: '30s', target: 0 }   // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% requests under 500ms
    http_req_failed: ['rate<0.01'],   // less than 1% fail
  },
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body has name': (r) => r.body.includes('Bert'),
  });
  sleep(1);
}