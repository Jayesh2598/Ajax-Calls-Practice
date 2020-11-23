function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                    resolve(xhr.responseText);
                }
                else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("XHR Failed");
                }
            }
        }
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhttp.statusText
            });
        };
        xhr.open(methodType, url, async);
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
        console.log(methodType + " request sent to the server.");
    });
}

// const getURL = "http://localhost:3000/employees/1";
// makePromiseCall("GET", getURL, true)
//             .then(responseText => console.log("Get user data : " + responseText))
//             .catch(error => console.log("GET Error Status: " + JSON.stringify(error)));

// const deleteURL = "http://localhost:3000/employees/3";
// makePromiseCall("DELETE", deleteURL, false)
//             .then(responseText => console.log("User deleted : " + responseText))
//             .catch(error => console.log("DELETE Error Status: " + JSON.stringify(error)));

// const postUrl = "http://localhost:3000/employees";
// const employee = { "name": "Pain", "salary": "4000" };
// makePromiseCall("POST", postUrl, true, employee)
//             .then(responseText => console.log("User added : " + responseText))
//             .catch(error => console.log("POST Error Status: " + JSON.stringify(error)));