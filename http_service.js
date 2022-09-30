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
    xhr.onload= function(){
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
                console.log("Handle 400 client error or 500 server error" )
            }
        }
    }
    xhr.onerror= function(){
        reject({
            status:this.status,
            statusText:xhttp.statusText
        });
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
    console.log(methodType+" Request sent to the server" );
    });
}