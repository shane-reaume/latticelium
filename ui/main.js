const instance = axios.create({
    baseURL: "http://127.0.0.1:8080/api",
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

function htmlizeResponse(res) {
    return `<div class="alert alert-secondary mt-2" role="alert"><pre>` + JSON.stringify(res, null, 2) + "</pre></div>";
}

async function getAllData() {
    let resultElement = document.getElementById("getResult");
    resultElement.innerHTML = "";

    try {
        const res = await instance.get("/jsonsets");

        const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
        };

        resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
        resultElement.innerHTML = htmlizeResponse(err);
    }
}

async function getDataById() {
    let resultElement = document.getElementById("getResult");
    resultElement.innerHTML = "";

    const id = document.getElementById("get-id").value;

    if (id) {
        try {
            const res = await instance.get(`/jsonsets/${id}`);

            const result = {
                status: res.status + "-" + res.statusText,
                headers: res.headers,
                data: res.data,
            };

            resultElement.innerHTML = htmlizeResponse(result);
        } catch (err) {
            resultElement.innerHTML = htmlizeResponse(err);
        }
    }
}

async function getDataByTitle() {
    let resultElement = document.getElementById("getResult");
    resultElement.innerHTML = "";

    const title = document.getElementById("get-title").value;

    if (title) {
        try {
            // const res = await instance.get(`/jsonsets?title=${title}`);
            const res = await instance.get("/jsonsets", {
                params: {
                    title: title
                }
            });

            const result = {
                status: res.status + "-" + res.statusText,
                headers: res.headers,
                data: res.data,
            };

            resultElement.innerHTML = htmlizeResponse(result);
        } catch (err) {
            resultElement.innerHTML = htmlizeResponse(err);
        }
    }
}

async function postData() {
    let resultElement = document.getElementById("postResult");
    resultElement.innerHTML = "";

    const title = document.getElementById("post-title").value;
    const description = document.getElementById("post-description").value;
    const data = JSON.parse(document.getElementById("post-data").value);
    const published = document.getElementById("post-published").checked;

    try {
        const res = await instance.post("/jsonsets", {
            title: title,
            description: description,
            data: data,
            published: published
        });

        const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
        };

        resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
        resultElement.innerHTML = htmlizeResponse(err);
    }
}

async function putData() {
    let resultElement = document.getElementById("putResult");
    resultElement.innerHTML = "";

    const id = document.getElementById("put-id").value;
    const title = document.getElementById("put-title").value;
    const description = document.getElementById("put-description").value;
    const data = document.getElementById("put-data").value;
    const published = document.getElementById("put-published").checked;

    try {
        const res = await instance.put(`/jsonsets/${id}`, {
            title: title,
            description: description,
            data: data,
            published: published
        });

        const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
        };

        resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
        resultElement.innerHTML = htmlizeResponse(err);
    }
}

async function deleteAllData() {
    let resultElement = document.getElementById("deleteResult");
    resultElement.innerHTML = "";

    try {
        const res = await instance.delete("/jsonsets");

        const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
        };

        resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
        resultElement.innerHTML = htmlizeResponse(err);
    }
}

async function deleteDataById() {
    let resultElement = document.getElementById("deleteResult");
    resultElement.innerHTML = "";

    const id = document.getElementById("delete-id").value;

    try {
        const res = await instance.delete(`/jsonsets/${id}`);

        const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
        };

        resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
        resultElement.innerHTML = htmlizeResponse(err);
    }
}

function clearGetOutput() {
    document.getElementById("getResult").innerHTML = "";
    document.getElementById("get-id").value = "";
    document.getElementById("get-title").value = "";
}

function clearPostOutput() {
    document.getElementById("postResult").innerHTML = "";
    document.getElementById("post-title").value = "";
    document.getElementById("post-description").value = "";
    document.getElementById("post-data").value = "";
    document.getElementById("post-published").checked = false;
    document.getElementById("file").value = "";
}

async function clearAll() {
    document.getElementById("getResult").innerHTML = "";
    document.getElementById("get-id").value = "";
    document.getElementById("get-title").value = "";
    document.getElementById("postResult").innerHTML = "";
    document.getElementById("post-title").value = "";
    document.getElementById("post-description").value = "";
    document.getElementById("post-data").value = "";
    document.getElementById("post-data").setAttribute('style','');
    document.getElementById("post-published").checked = false;
    document.getElementById("file").value = "";
    document.getElementById("deleteResult").innerHTML = "";
    document.getElementById("delete-id").value = "";
}

function clearDeleteOutput() {
    document.getElementById("deleteResult").innerHTML = "";
    document.getElementById("delete-id").value = "";
}

function pretty() {
    let ugly = document.getElementById('post-data').value;
    let obj = JSON.parse(ugly);
    document.getElementById('post-data').value = JSON.stringify(obj, undefined, 4);
}