window.addEventListener('hashchange', function (e) {
    var title = document.querySelector('head title');
    title.innerText = window.location.hash;
});

(function () {
    var title = document.querySelector('head title');
    var newUrl = window.location;
    title.innerText = newUrl.hash;
})();
