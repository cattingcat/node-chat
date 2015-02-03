var HistoryLog = React.createClass({
    getInitialState: function(){
        return { log: [window.location.href] };
    },
    componentDidMount: function(){
        window.addEventListener('hashchange', this.hashChange);
    },
    componentWillUnmount: function(){
        window.removeEventListener('hashchange', this.hashChange);
    },
    hashChange: function(e){
        var log = this.state.log;
        log.push(e.newURL);
        this.setState({log: log});
    },
    render: function() {
        return <div>{
            this.state.log.map(function(i){
                return <div> {i} </div>
            })}
        </div>;
    }
});