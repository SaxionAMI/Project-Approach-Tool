# Load testing guide

## Run all tests

```
node .\load-tests\load-tests.js
```

## Run a single test

```
artillery run .\load-tests\tests\"test-name"
```

replace "test-name" with the name of the test you would like to run, below there will be a list of all possible tests.

## Possible tests to run

|    **Test name**    |                                  **Description**                                 |
|:-------------------:|:--------------------------------------------------------------------------------:|
|     join-1.yaml     |                    1 socket joins the cluster and then leaves                    |
|     join-10.yaml    |                    10 sockets join the cluster and then leaves                   |
|    join-100.yaml    |                   100 sockets join the cluster and then leaves                   |
|    join-1000.yaml   |                   1000 sockets join the cluster and then leaves                  |
|     move-1.yaml     |         1 socket joins the cluster, moves a phase object and then leaves         |
|     move-10.yaml    |         10 sockets join the cluster, moves a phase object and then leaves        |
|    move-100.yaml    |        100 sockets join the cluster, moves a phase object and then leaves        |
|    move-1000.yaml   |        1000 sockets join the cluster, moves a phase object and then leaves       |
| setEffect-2.yaml    | 2 sockets join the cluster, set an effect at the exact same time and then leaves |
|     wait-60.yaml    |      1 socket joins and then waits for 1 minute the cluster and then leaves      |
|    wait-600.yaml    |     1 socket joins and then waits for 10 minutes the cluster and then leaves     |
|    wait-1800.yaml   |     1 socket joins and then waits for 30 minutes the cluster and then leaves     |
|    wait-3600.yaml   |       1 socket joins and then waits for 1 hour the cluster and then leaves       |