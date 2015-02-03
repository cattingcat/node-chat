if(typeof chatClient === 'undefined') console.log('chatClient required;');

var Chat = React.createClass({
    getInitialState: function(){
        return {
            messages: [],
            loggedIn: false
        };
    },
    componentDidMount: function(){
    },
    componentWillUnmount: function(){
        var groupName = this.props.group;
        chatClient.leave(groupName);
    },
    sendSignalr: function(){
        var node = this.getDOMNode();
        var input = node.querySelector('footer > input[name="message"]');
        var msg = {
            text: input.value,
            sender: this.props.userName
        };
        chatClient.send(this.props.group, msg);
    },
    login: function(){
        var self = this,
            node = this.getDOMNode(),
            name = node.querySelector('input[name="name"]').value,
            group = node.querySelector('input[name="group"]').value,
            pwd = node.querySelector('input[name="pwd"]').value;

        this.props.userName = name;
        this.props.group = group;

        this.state.loggedIn = true;

        var receiveMsg = function(msg){
            self.state.messages.push(msg);
            self.setState(self.state);
        };

        chatClient.connect(receiveMsg)
        chatClient.join(group, pwd);

        self.setState(self.state);
    },
    render: function() {
        if(this.state.loggedIn){

            return(
            <div className="chat">
                <article>
                    {this.state.messages.map(function(i){
                        return (<div> <strong> {i.sender} </strong>: {i.text} </div>);
                    })}
                </article>
                <footer>
                    <input type="text" name="message" /> 
                    <button onClick={this.sendSignalr} > Send </button>
                </footer>
            </div>);
        } else {

            return(
            <div className="chat">
                <div className="form">
                    <label>
                        <span>Name:</span>
                        <input type="text" name="name" />
                    </label>
                    <label>
                        <span>Group:</span>
                        <input type="text" name="group" />
                    </label>
                    <label>
                        <span>Password:</span>
                        <input type="password" name="pwd" />
                    </label>
                    <button onClick={this.login}> Log in </button>
                </div>
            </div>);
        }
    }
});