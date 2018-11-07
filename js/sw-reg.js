if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(function() {
            console.log("service Worker Working");
        })
        .catch(function(err) {
            console.log("service worker not workind" + err);
        })
}