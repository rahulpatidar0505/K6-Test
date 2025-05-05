# K6 Performance Test
This project is used for performance testing of api's.

# Git lab repository link:


# Local machine setup:

1) Install following software on local:
      1) macOS : brew install k6
      2) window : choco install k6


2) Git clone master branch from Git repository:
    git clone 


3) Create branch from master branch on your local machine:
    git branch -b <branch_name>


4) Now start working in your branch. Once done commit your changes in you branch and then raise a merge request against master branch.


# Run Testcase locally::
   We can run test using following configuration :

    Run/Debug configiration
        1. k6 run test/apiTest.js

        2. k6 run --iterations 5 --vus 5  test/apiTest.js
        
        3. k6 run --vus 10 --duration 1m test/apiTest.js

        4. k6 run --http-debug="full" test/apiTest.js

        5. ./k6 run --out dashboard=report=test-report.html test/apiTest.js --vus 10 --duration 2m
           ./k6 run --out dashboard=report=test-report.html test/apiTestWithOptions.js
           ./k6 run --out dashboard=report=test-report.html test/apiTestWithScenarios.js
        
        6. k6 run --stage 20s:10,30s:30,40s:50,1m:0 test/apiTest().js
            // simulate ramp-up of traffic from 1 to 10 users in 20 sec
            // simulate ramp-up of traffic from 10 to 30 users in 30 sec
            // simulate ramp-up of traffic from 30 to 50 users in 40 sec
            // simulate ramp-up of traffic from 50 to 0 users in 1 min

