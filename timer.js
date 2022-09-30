console.log("Welcome to the Ajax program");

//function to show the time
function showTime()
{
    const date  = new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}


//Activity B, which prints expired time.
//due to async nature, child thread will come here.
function showSessionExpire()
{
    console.log("Activity-B Your session expired at"+showTime());
}

//program will start from here
//starting trigger for acftivity B and showing time.
console.log("Activity A: Triggering Activity B at "+showTime());
//activity B- is called with timeout of 4 sec. Program will be executed after 4 seconds.
setTimeout(showSessionExpire,4000);
//as js is asynchronous, main thread will complete execution by running below line of code.
//and child thread, due to 5 sec run out will run afterwords.
console.log("Activity-A: Triggered Activity-B at "+showTime()+" will execute after 4 seconds");