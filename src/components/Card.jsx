import React from "react";

export default class Card extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={`card border-primary md-3 ${this.props.className}`} 
                style={this.props.style}
            >
                <h3 className= 'card-header'>{this.props.title} </h3>
                <div className= 'card-body'>
                    {this.props.children}
                </div>
            </div>
        )
    }

}
