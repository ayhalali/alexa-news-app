const myAPIKey = "46668dbe4ab444a2adb3031120e537fd";

let contentType;
function getStories(type) {
    var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=gb&' + 'category=' + type + "&" +
        'apiKey=' + myAPIKey;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            // $('#newsstories > tr').remove();
            var articles = myJson.articles;
            var ul = document.getElementById("newsstories");

            document.getElementById("headline").innerHTML = "All the latest " + type + " news";

            for (var i = 0; i < articles.length; i++) {
                console.log(articles[i].title);
                var li = document.createElement("li");
                var txt = document.createTextNode(articles[i].title);
                li.appendChild(txt);
                ul.appendChild(li);
            }
        });
}

// Make a request for a user with a given ID
axios.get('https://bomma-app-1.herokuapp.com/get/news-content')
    .then(function (response) {
        // handle success
        console.log(response.data);
        contentType = response.data.content;
        document.getElementById("headline").innerHTML = response.data.content;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
        getStories(contentType);
    });


