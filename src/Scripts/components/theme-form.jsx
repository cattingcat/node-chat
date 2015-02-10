var ThemeForm = React.createClass({
    getInitialState: function(){
        return null;
    },
    submit:function(){
    	var node = this.getDOMNode();
    	var area = node.querySelector('textarea');
    	var msg = area.value;
    	var pwd = node.querySelector('input[name="pwd"]').value;

    	msg = msg.trim();
    	if(msg)	{
    		this.props.onSubmit({message: msg, password: pwd});
    		area.value = '';
    	}
    },
    toggle: function(){
    	var node = this.getDOMNode();
    	var labels = node.querySelectorAll('label');
    	for(var i = labels.length - 1; i >= 0; --i) {
    		var item = labels[i];
    		item.hidden = !item.hidden;
    	}
    },
    render: function() {
		return (
		    <div className="theme-form">
				<label>
                    <span>Message:</span>
                    <textarea />
                </label>
                <label>
                    <span>Password:</span>
                    <input type="password" name="pwd" />
                </label>
                <button onClick={this.submit}> Yarrr! </button>
                <button onClick={this.toggle}> Show/hide </button>
            </div>
		);
    }
});