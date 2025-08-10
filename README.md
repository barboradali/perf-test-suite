cat << 'EOF' > README.md
# Performance & Scalability Test Suite (k6 + InfluxDB + Grafana)

## Overview
This project is an automated performance testing framework using [k6](https://k6.io/) for load generation, [InfluxDB](https://www.influxdata.com/) for storing metrics, and [Grafana](https://grafana.com/) for visualizing results in real time.  
It enforces strict performance thresholds and integrates with GitHub Actions for CI/CD execution, making it suitable for realistic DevOps, QA, and SRE workflows.

## Features
- Realistic load profiles (ramp-up, steady load, ramp-down)
- Strict performance thresholds with automatic test failure when exceeded
- Metrics storage in InfluxDB
- Real-time visualization with Grafana
- Fully containerized with Docker Compose
- CI/CD-ready with GitHub Actions (manual or scheduled runs)

## Project Structure
.
├── scripts/                # k6 test scripts
│   └── load_test.js
├── docker-compose.yml      # Docker services for InfluxDB, Grafana, k6
├── .github/workflows/      # GitHub Actions workflow
└── README.md               # Project documentation

## Installation, Setup, and Running Tests

```

# Clone repository
git clone https://github.com/YOUR_USERNAME/perf-test-suite.git
cd perf-test-suite

# Start InfluxDB and Grafana in background
docker compose up -d influxdb grafana

# Run k6 test locally
docker compose run k6

# Stop all containers when done
docker compose down

##Accessing Grafana and Viewing results

# Open Grafana in browser
# URL: http://localhost:3000
# Username: admin
# Password: admin

# Add InfluxDB as a data source:
#  - URL: http://influxdb:8086
#  - Database: k6
#  - Leave defaults for other fields
#  - Save & Test

# Import k6 Grafana dashboard:
#  - Click "+" → Import
#  - Enter dashboard ID: 2587
#  - Select the InfluxDB source
#  - Click Import

# Run another test:
docker compose run k6
# Refresh dashboard to view metrics

## Performance thresholds

# Defined in scripts/load_test.js
thresholds: {
  http_req_duration: ['p(95)<500'], # 95% requests under 500ms
  http_req_failed: ['rate<0.01'],   # Less than 1% failures allowed
}
# If these thresholds are crossed:
# - k6 exits with non-zero status
# - CI/CD pipeline fails

## CI/CD Integration (GitHub Actions)

# Workflow file: .github/workflows/performance.yml
# Runs on:
#  - Manual trigger (workflow_dispatch)
#  - Daily at midnight UTC (cron schedule)

# Key steps:
# - Checkout repository
# - Set up k6
# - Run k6 test
# - Fail workflow if thresholds are not met

## Example Output from K6

running (2m00.0s), 10/10 VUs, 180 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  2m0s

     data_received..................: 1.2 MB 10 kB/s
     data_sent......................: 30 kB  250 B/s
     http_req_blocked...............: avg=200µs   min=150µs   med=180µs   max=400µs   p(95)=350µs   p(99)=390µs
     http_req_connecting.............: avg=120µs   min=100µs   med=110µs   max=150µs   p(95)=140µs   p(99)=145µs
     http_req_duration...............: avg=310ms   min=280ms   med=300ms   max=490ms   p(95)=480ms   p(99)=490ms
     http_req_failed.................: 0.00% ✓ 0   ✗ 180
     iterations......................: 180    1.50/s


Author: Barbora Dali
barboradali@gmail.com
GitHub: https://Github.com/barboradali

EOF

