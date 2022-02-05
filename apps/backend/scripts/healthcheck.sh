#!/bin/bash

attempt_counter=0
max_attempts=10
interval=10
start_time=15

echo "Waiting for backend to start..."
sleep $start_time
echo "Starting healthcheck"

until $(curl --output /dev/null --silent --head --fail http://app:4000/api); do
    if [ ${attempt_counter} -eq ${max_attempts} ];then
      echo "Max attempts reached"
      exit 1
    fi

    attempt_counter=$(($attempt_counter+1))
    echo "Healthcheck failed on attempt ${attempt_counter}/${max_attempts}"
    
    sleep $interval
done

echo "Healthcheck passed"
exit 0