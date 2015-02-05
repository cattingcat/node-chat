if(typeof chatClient === 'undefined') console.log('chatClient required;');

var Chat = React.createClass({
    displayName: 'Chat',
    getInitialState: function(){
        this.props.smiles = {
            ':peka:': 'http://lurkmore.so/images/8/8d/1238521509967.png'
        };
        return {
            messages: [],
            loggedIn: false
        };
    },
    componentDidMount: function(){
        console.log('chat mounted');
    },
    componentWillUnmount: function(){
        if(this.state.loggedIn){
            var groupName = this.props.group,
                name = this.props.userName;
            chatClient.leave();
        }
    },
    send: function(){
        var node = this.getDOMNode(),
            input = node.querySelector('footer > textarea[name="message"]'),
            text = input.value.trim();

        if(text != ''){ 
            var msg = {
                text: text,
                sender: this.props.userName
            };

            chatClient.send(msg);
            input.value = '';

            this.state.messages.push(msg);
            this.setState({ messages: this.state.messages });
        }
    },
    login: function(){
        var self = this,
            node = this.getDOMNode(),
            name = node.querySelector('input[name="name"]').value.trim(),
            group = node.querySelector('input[name="group"]').value.trim(),
            pwd = node.querySelector('input[name="pwd"]').value.trim();

        this.props.userName = name;
        this.props.group = group;

        var onReceiveMsg = function(msg){
            self.state.messages.push(msg);
            self.setState(self.state);
        };

        var onJoin = function(){
            self.setState({loggedIn: true});
        };

        var onJoinFailed = function(){
            node.querySelector('input[name="pwd"]').value = '';
        };

        chatClient.connect(onReceiveMsg, onJoin, onJoinFailed);
        chatClient.join(name, group, pwd);
    },
    selectChange: function(e){
        var selected = e.target.selectedOptions[0].text;
        var node = this.getDOMNode();
        var input = node.querySelector('footer > textarea[name="message"]');
        input.value += selected;
        e.target.selectedIndex = 0;
    },
    textChanged: function(e){
        console.log(e);
        if(e.key == 'Enter'){
            this.send();
            e.preventDefault();
        }
    },
    render: function() {
        var self = this;
        var smiles = [];
        for(var key in self.props.smiles) {
            smiles.push(key);
        }

        if(this.state.loggedIn){

            return(
            <div className="chat">
                <article>
                    {this.state.messages.map(function(i){
                        var arr = i.text.split(/(:\w*:)/);

                        return (
                            <div> 
                                <strong> {i.sender}: </strong> 
                                
                                {arr.map(function(i){
                                    var smile = self.props.smiles[i];

                                    if(smile){
                                        return( <img className="smile" src={smile} /> );
                                    } else {
                                        return( <span> {i} </span> );
                                    }
                                })}
                                
                            </div>);
                    })}
                </article>
                <footer>
                    <textarea name="message" onKeyPress={this.textChanged} /> 
                    <button onClick={this.send} > Send </button>
                    <select onChange={this.selectChange}> 
                        <option seelcted> </option>
                        {smiles.map(function(i){ return (<option> {i} </option>); })}
                    </select>
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