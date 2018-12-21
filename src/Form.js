import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ""
        }
        
        this.onChange = this.onChange.bind(this);
    }
    
    onChange(v) {
        this.state.text = v;
    }
    
    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.text} onChange={this.onChange} />
                    <input type="submit" value="submit"/>
                </form>
            )
    }
}