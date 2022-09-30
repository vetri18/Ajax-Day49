const { resolve } = require("path");

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//function to show the time
function showTime()
{
    const date= new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}

//function to make ajax call
//async and data are optional parameters
function makePromiseCall(methodType,url,async=true,data=null)
{
    //creating a promise object which has two parameters resolve and reject
    return new Promise(function(resolve,reject){
    //making object of XMLHttpRequest() which invokes constructor
    let xhr= new XMLHttpRequest();
    //when ready state reaches 3, means data is coming from the server
    //eventlistener will keep gettting calls on state change
    //this is event listener and it will be always called whenever there is change in status of xhr.
    xhr.onreadystatechange= function(){
        //if connection is closed and status is 200 or 201 then callback method is called
        if(xhr.readyState===4)
        {
            if(xhr.status===200||xhr.status===201)
            {
               resolve(xhr.responseText);
            }
            //if status is greater than 400, there is error in calling request
            else if(xhr.status>=400)
            {
                reject({
                    status:xhr.status,
                    statusText:xhr.statusText
                });
                console.log("Xhr failed");
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
    });
}
//get user details function
const getURL="http://localhost:3000/employees/1";
makePromiseCall("GET",getURL,true)
    .then(responseText=>{
        console.log("Get User data: "+responseText);
    })
    .catch(error=>console.log("Get error status: "+JSON.stringify(error)))

//deleting element from json file
//url
const deleteURL="http://localhost:3000/employees/5";
//making promise call
makePromiseCall("DELETE",deleteURL,false)
    .then(responseText=>console.log("User Deleted: "+responseText))
    .catch(error=>console.log("DELETE Error Status: "+JSON.stringify(error)))


const postURL= "http://localhost:3000/employees";
//id is directly added by the server, id always increases, if element is delete and then added, then also id will be forward incremented
//deleted id will not be added
const emplData= {"name":"Kretika","salary":"680000"};
//making promise call
makePromiseCall("POST",postURL,true,emplData)
    .then(responseText=>console.log("User added: "+responseText))
    .catch(error=>console.log("POST error status: "+error))