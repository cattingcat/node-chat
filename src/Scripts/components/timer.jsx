var Timer = React.createClass({
    // ctor
    getInitialState: function(){
        return { elapsed: 0 };
    },

    // mount
    componentDidMount: function(){
        this.timer = setInterval(this.tick, 50);
    },

    // unmount
    componentWillUnmount: function(){
        clearInterval(this.timer);
    },

    tick: function(){
        this.setState({elapsed: new Date() - this.props.start});
    },

    render: function() {
        
        var elapsed = Math.round(this.state.elapsed / 100);

        var seconds = (elapsed / 10).toFixed(1);    

        return <p>This example was started <b>{seconds} seconds</b> ago.</p>;
    }
});