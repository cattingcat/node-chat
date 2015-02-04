if(typeof chatClient === 'undefined') console.log('chatClient required;');

var Chat = React.createClass({
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
    },
    componentWillUnmount: function(){
        var groupName = this.props.group;
        chatClient.leave(groupName);
    },
    send: function(){
        var node = this.getDOMNode();
        var input = node.querySelector('footer > textarea[name="message"]');
        var msg = {
            text: input.value,
            sender: this.props.userName
        };
        chatClient.send(this.props.group, msg);
        input.value = '';

        this.state.messages.push(msg);
        this.forceUpdate();
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
    selectChange: function(e){
        var selected = e.target.selectedOptions[0].text;
        var node = this.getDOMNode();
        var input = node.querySelector('footer > textarea[name="message"]');
        input.value += selected;
        e.target.selectedIndex = 0;
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
                                    if(self.props.smiles[i]){
                                        return( <img className="smile" src={self.props.smiles[i]} /> );
                                    } else {
                                        return( <span> {i} </span> );
                                    }
                                })}
                                
                            </div>);
                    })}
                </article>
                <footer>
                    <textarea name="message" /> 
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