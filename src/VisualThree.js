import React, { Component } from 'react'

export default class VisualThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            q1: 0,
            q2: 0,
            q3: 0,
            cost: "awaiting cost...",
            allowNext: false
        }
        this.onChangeq1 = this.onChangeq1.bind(this)
        this.onChangeq2 = this.onChangeq2.bind(this)
        this.onChangeq3 = this.onChangeq3.bind(this)
        this.submit = this.submit.bind(this)
    }
    
    // When a new option for q1 is chosen
    onChangeq1(e) {
        this.setState({
            q1: e.target.value
        })
    }
    
    // when a new option for q2 is chosen
    onChangeq2(e) {
        this.setState({
            q2: e.target.value
        })
    }
    
    // when a new option for q3 is chosen
    onChangeq3(e) {
        this.setState({
            q3: e.target.value
        })
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            allowNext: nextProps.eligibility.canMoveNext
        })
    }
    
    
    
    // When the user their quantities
    submit(e) {
        e.preventDefault()
        if (!this.state.allowNext) {
            alert("you're in the wrong house, fool. complete your test cases first.")
            return
        }
        let quantities = []
        quantities.push(this.state.q1)
        quantities.push(this.state.q2)
        quantities.push(this.state.q3)
        this.setState({
            cost: shoppingOffers([5,6,7], [[1,1,0,4],[2,2,1,9]], quantities)
        })
    }
    
    render() {
        return (
            <div class="mobileapp" >
            <div class="mobile_nav">
                <img class ="mobile_logo" src= "/tea.png"/>
                <ul>
                    <li> The Boba App</li>
                </ul>
            <div class = "mobile_right">
                <img class ="mobile_logo" src= "/menu.png"/>
             </div>
            </div>
            <div id="container">
              <h4>Bobas that have offers</h4>
                <p>Currently, we only support 3 types</p>
                
                <form>
                    <label>
                        Mango ($5): 
                        <input class="select2" type="text" value={this.state.q1} onChange={(e) => {this.setState({q1: e.target.value})}}/>
                    </label>
                    <br/>
                    <label>
                        Peach ($6):
                        <input class="select2" type="text" value={this.state.q2} onChange={(e) => {this.setState({q2: e.target.value})}}/>
                    </label>
                    <br/>
                    <label>
                        Apple ($7):
                        <input class="select2" type="text" value={this.state.q3} onChange={(e) => {this.setState({q3: e.target.value})}}/>
                    </label>
                    <br/>
                    <input class="submit" type="submit" onClick={this.submit}/>
                </form>
                <div class="mobile_output">
                    <p>{this.state.cost}</p>
                </div>
              </div>
            </div>
            )
    }
}

let shoppingOffers = function(price, special, needs) {
    var result = Number.MAX_VALUE;
    for (var i = 0; i < special.length; i++) {
        var offer = special[i];
        var valid = true;
        for (var j = 0; j < needs.length; j++) {
            var remain = needs[j] - offer[j];
            /* set */
            (needs[j] = remain);
            if (valid && remain < 0)
                valid = false;
        };
        if (valid)
            result = Math.min(result, shoppingOffers(price, special, needs) + offer[needs.length]);
        for (var j = 0; j < needs.length; j++) {
            var origin = needs[j] + offer[j];
            /* set */
            (needs[j] = origin);
        }
    }
    var nonOffer = 0;
    for (var i = 0; i < needs.length; i++) {
        nonOffer += price[i] * needs[i];
    }
    return Math.min(result, nonOffer);
}

