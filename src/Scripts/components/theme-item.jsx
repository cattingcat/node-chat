var ThemeItem = React.createClass({
    getInitialState: function(){
        return null;
    },
    hideContent : function(){
    },
    render: function() {
    	var msg = this.props.msg;
		return (
		    <div className="item">
		        <header> {msg.head} </header>
		        <section>
		            <aside> item aside </aside>
		            <article> {msg.message} </article>
		        </section>
		    </div>
		);
    }
});