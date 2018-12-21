import React, { Component } from 'react'

export default class VisualFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            paths: "Please choose a location radius",
            allowNext: false
        }
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    }
    
    // When a new option is chosen
    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            allowNext: nextProps.eligibility.canMoveNext
        })
    }
    
    
    
    // When the user chooses their radius
    submit(e) {
        e.preventDefault()
        if (!this.state.allowNext) {
            alert("you're in the wrong house, fool. complete your test cases first.")
            return
        }
        this.setState({
            paths: numOfPathsToDest(this.state.value) + " total paths"
        })
    }    
    
    render() {
        return (
            <div class="mobileapp" >
            <div class="mobile_nav">
                <img class ="mobile_logo" src= "/assets/tea.png"/>
                <ul>
                    <li> The Boba App</li>
                </ul>
            <div class = "mobile_right">
                <img class ="mobile_logo" src= "/assets/menu.png"/>
             </div>
            </div>
            
            <div class="container">
                <h4>Number of Paths to nearest Boba shop</h4>
                <form>
                    <label> Enter search radius (in whole numbers): 
                        <input class="select2" value={this.state.value} type="text" onChange={(e) => {this.setState({value: e.target.value})}}/>
                    </label>
                    <input class ="submit" type="submit" value="Submit" onClick={this.submit}/>
                </form>
                 <div class="mobile_output">
                <p>{this.state.paths}</p>
                </div>
            </div>
            </div>
            )
    }
}

let numOfPathsToDest = (n) => {
    if (n == 1){
        return 1
    }
    let lastRow = []
    for (let i = 1; i < n; i++) {
        lastRow[i] = 1 // base case - the first row is all ones
    }

    let currentRow = []

    for (let j = 1; j < n; j++){
        for (let i = j; i < n; i++){
            if (i == j)
                currentRow[i] = lastRow[i]
            else
                currentRow[i] = currentRow[i-1] + lastRow[i]
        }
        lastRow = currentRow
    }

    return currentRow[n-1]
}