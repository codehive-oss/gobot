attempt_counter=0
max_attempts=10

until $(curl --output /dev/null --silent --head --fail http://app:4000/api); do
    if [ ${attempt_counter} -eq ${max_attempts} ];then
      echo "Max attempts reached"
      exit 1
    fi

    printf '.'
    attempt_counter=$(($attempt_counter+1))
    # echo "Healthcheck failed on attempt ${attempt_counter}/${max_attempts}"
    sleep 10
done