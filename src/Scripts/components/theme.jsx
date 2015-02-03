var Theme = React.createClass({
    getInitialState: function(){
        return null;
    },
    hideContent : function(){
    },
    render: function() {
        return(

            <div className="theme">
                <header onClick={this.addItem}> 
                    <strong> {this.props.data.head} </strong>
                </header>
                <section>
                    <aside> {this.props.data.aside} </aside>
                    <article> {this.props.data.article} </article>
                </section>
                <div className="items">{

                    this.props.data.items.map(function(i){
                        return (
                            <div className="item">
                                <header> {i.head} </header>
                                <section>
                                    <aside> {i.aside} </aside>
                                    <article> {i.article} </article>
                                </section>
                            </div>
                        );
                    })
                    
                }</div>
            </div>
            
        );
    }
});