var RouteModule = {
    init: function (routing, view) {
        this.routing = routing;
        this.view = view;
        this.hashChange();
        window.addEventListener('hashchange', this.hashChange);
    },
    stop: function () {
        window.removeEventListener('hashchange', this.hashChange);
    },
    hashChange: function () {
        var self = this,
            hash = window.location.hash;
        self.index = null;
        
        this.routing.some(function (item, index) {
            if (hash.match(item.pattern)) {
                self.index = index;
                return true;
            }
        });

        if (this.index === null) return ('Oups!');
        var route = this.routing[this.index];
        var element = React.createElement(route.component, route.properties);

        React.render(element, this.view);
    }
};