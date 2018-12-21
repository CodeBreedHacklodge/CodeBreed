import React, { Component } from 'react'
import Form from './Form'

export default class Problem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            steps: [],
            currentStep: 0,
            problemStatement: ""
        }
        this.state.steps.push(<Form/>)
        this.state.steps.push("Problem 1");
        this.state.steps.push("Problem 2");  
        this.state.steps.push("Problem 3");
        this.state.steps.push("Problem 4");
        this.state.steps.push("Problem 5");
    }

    
    
    render(props) {
        this.currentStep++;
        return <h1>Problem Statement: + steps[currentStep]</h1>
    }
}