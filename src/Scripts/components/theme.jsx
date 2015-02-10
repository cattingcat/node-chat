var Theme = React.createClass({
    getInitialState: function(){
        return {
            messages: []
        };
    },
    onSubmit : function(o){
        var msg = {
            message: o.message,
            head: 'head'
        };
        this.state.messages.push(msg);
        this.forceUpdate();
    },
    render: function() {
        return(

            <div className="theme">
                <header> 
                    <strong> header </strong>
                </header>
                <section>
                    <aside> 

                    </aside>
                    <article> 
                        article alot ox textttttttttttttttttttttt
                        article alot ox textttttttttttttttttttttt
                        article alot ox textttttttttttttttttttttt
                        article alot ox textttttttttttttttttttttt
                        article alot ox textttttttttttttttttttttt
                        article alot ox textttttttttttttttttttttt
                        article alot ox textttttttttttttttttttttt
                     </article>
                </section>
                <div className="items">
                    {this.state.messages.map(function(i){
                        return (<ThemeItem msg={i} />)
                    })}
                   <ThemeForm onSubmit={this.onSubmit} />
                </div>
            </div>
            
        );
    }
});