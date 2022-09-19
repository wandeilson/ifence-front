import React from 'react';

export default class FormGroup extends React.Component{

    render(){
        return(
            <div className='form-group'
                style={
                    this.props.style
                }
            >
                <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
                {this.props.children}
            </div>
        )
    }
}
