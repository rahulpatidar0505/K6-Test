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
        1. k6 run reqResApiTest/testReqResApi.js
        3. k6 run --iterations 5 --vus 5  reqResApiTest/testReqResApi.js
        4. k6 run --vus 10 --duration 10h reqResApiTest/testReqResApi.js
        5. k6 run --http-debug="full" reqResApiTest/testReqResApi.js

