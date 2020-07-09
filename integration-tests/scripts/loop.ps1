# enable script execution if powershell complains:
# $ Set-ExecutionPolicy RemoteSigned

Set-Location ".."

$command = 'protractor conf.js'
$total = 50;
$error_count = 0

For ($i=0; $i -le $total; $i++) {
  try {
    echo "----------------------------------------------------------------------------------------------"
    echo "Executing automated test $total / $i, failures so far: $error_count"
    echo "----------------------------------------------------------------------------------------------"

    iex $command
  } catch {
    $error_count++
  }
}

echo "Eror count out of $total automated test execution is $error_count"
