var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//function to show the time
function showTime()
{
    const date= new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}

//function to make ajax call
//async and data are optional parameters
function makeAJAXCall(methodType,url,callback,async=true,data=null)
{
    //making object of XMLHttpRequest() which invokes constructor
    let xhr= new XMLHttpRequest();
    //registring an event listener
    //when response is received from server and connection is made and is connection ready
    //these all comes under state change
    //ready state 4 means connection closed
    //ready state 1 means connection has not yet been established
    //ready state 2 means connection is open
    //eventlistener will keep gettting calls on state change
    //this is event listener and it will be always called whenever there is change in status of xhr.
    xhr.onreadystatechange= function(){
        //console.log(methodType+" state changed called at:"+showTime()+" Ready State "+xhr.readyState+" Status:"+ xhr.status);
        //if status is 200 or 201 then request is executed and response text is passed to callback function
        //if connection is closed and status is 200 or 201 then callback method is called
        if(xhr.readyState===4)
        {
            if(xhr.status===200||xhr.status===201)
            {
                //using callback function, i  am able to reuse code
                //otherwise i will have to make ajax call method for each request
                callback(xhr.responseText);
            }
            //if status is greater than 400, there is error in calling request
            else if(xhr.status>=400)
            {
                console.log("Handle 400 client error or 500 server error at: "+showTime())
            }
        }
    }
        xhr.open(methodType,url,async);
        //changes required for inserting data into json file
        if(data)
        {
            //setting header for request
            xhr.setRequestHeader("Content-Type","application/json");
            //sending data
            xhr.send(JSON.stringify(data));
        }
        else
        {
            xhr.send();
        }
    
    //opening up connection
    //xhr.send();
    console.log(methodType+" Request sent to the server at: "+showTime());
}
//get user details function
function getUserDetails(data)
{
    console.log("Get User Data at"+showTime()+" Values "+data);
}

//making ajax call through function
//specifying http method, url for call and callback function, async nature to be true or false
//getUserDetails is a callback function, after exection of this method, getUsetDetails will be executed
//async nature set to true means, program will run asynchrnously only.
const getURL=   "http://localhost:3000/employees/";
makeAJAXCall("GET",getURL,getUserDetails,true);
console.log("Made GET AJAX call to server at: "+showTime());

//deleting element from json file
//url
const deleteURL="http://localhost:3000/employees/4";
//callback function
function userDeleted(data)
{
    console.log("User Deleted: "+data);
}
//method to make ajax call
makeAJAXCall("DELETE",deleteURL,userDeleted,false);
console.log("Made DELETE AJAX call to server at: "+showTime());

const postURL= "http://localhost:3000/employees";
//id is directly added by the server, id always increases, if element is delete and then added, then also id will be forward incremented
//deleted id will not be added
const emplData= {"name":"Kretika","salary":"680000"};
function userAdded(data)
{
    console.log("User Added: "+data);
}
makeAJAXCall("POST",postURL,userAdded,true,emplData);
console.log("Made POST AJAX call to server at: "+showTime());