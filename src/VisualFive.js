import React, { Component } from 'react'

export default class VisualFive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            end: "",
            allowNext: false,     
            buses: 0
        }
        
        this.onChange = this.onChange.bind(this)
        this.onChange2 = this.onChange2.bind(this)
        this.submit = this.submit.bind(this)
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            allowNext: nextProps.eligibility.canMoveNext
        })
    }
    
    // When a new option is chosen
    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    
    onChange2(e) {
        this.setState({
            end: e.target.value
        })
    }
    
    submit(e) {
        e.preventDefault()
        if (!this.state.allowNext) {
            alert("you're in the wrong house, fool. complete your test cases first.")
            return
        }
        let city = this.state.value.toLowerCase()
        let ending = this.state.end.toLowerCase()
        console.log(ending)
        let start = 1;
        let dest = 1;
        if (city === 'u-district') {
            start = 1
        } else if (city === 'fremont') {
            start = 2
        } else if (city === 'ballard'){
            start = 3
        } else if (city === 'westlake'){
            start = 7
        }
        
        if (ending === 'u-district') {
            dest = 1
        } else if (ending === 'fremont') {
            dest = 2
        } else if (ending === 'ballard'){
            dest = 3
        } else if (ending === 'westlake'){
            dest = 7
        }
        
        console.log(start)
        console.log(dest)
        let buses = [[1, 2, 7], [3, 6, 7]]
        console.log(buses);
        let result = getBusRoute(buses, start, dest)
        console.log(result)
        this.setState({
            buses: result
        })
    }
    
    render() {
        return (
            <div class="mobileapp" >
            <div class="mobile_nav">
                <img class ="mobile_logo" src= "tea.png"/>
                <ul>
                    <li> The Boba App</li>
                </ul>
            <div class = "mobile_right">
                <img class ="mobile_logo" src= "menu.png"/>
             </div>
            </div>
            
            <div id="container">
            <h4> Number of Buses to Take </h4>
            
            <h4>Starting Location </h4>
            {/*Dropdown; map each location to bus number */}
            <div class = "form5">
            <form>
                <div class="startlocation">
                <label>
                    Starting Bus Stop
                    <select value={this.state.value} onChange={this.onChange}>
                        <option value="U-district">U-district</option>
                        <option value="Fremont">Fremont</option>
                        <option value="Ballard">Ballard</option>
                        <option value="Westlake">Westlake</option>
                    </select>
                </label>
                </div>
                <h4>Ending Location </h4>
                <div class="endlocation">
                <label>
                    Ending Bus Stop
                    <select value={this.state.end} onChange={this.onChange2}>
                        <option value="U-district">U-district</option>
                        <option value="Fremont">Fremont</option>
                        <option value="Ballard">Ballard</option>
                        <option value="Westlake">Westlake</option>
                    </select>
                </label>
                </div>
                <input class="submit" type="submit" value="submit" onClick={this.submit}/>
            </form>
            </div>
            

            
            <div class="mobile_output">
                <p>Number of Buses: {this.state.buses} </p>
            </div>
            </div>
            
            </div>
        )
    }
}

var getBusRoute = function(routes, S, T) {
    let visited = new Set();
    let map = new Map();
    let count = 0;
    
    if (S === T) return count;
    
    for (let i = 0; i < routes.length; i++) {
        for (let j = 0; j < routes[i].length; j++) {
            const curBusStop = routes[i][j];
            let buses = map.get(curBusStop) || [];
            buses.push(i);
            map.set(curBusStop, buses);
        }
    }
    
    let queue = [S];
    while (queue.length) {
        const size = queue.length;
        count++;
        for (let i = 0; i < size; i++) {
            const curBusStop = queue.shift();
            const buses = map.get(curBusStop);
            for (let bus of buses) {
                if (visited.has(bus)) continue;
                visited.add(bus);
                for (let j = 0; j < routes[bus].length; j++) {
                    const nextBusStop = routes[bus][j];
                    if (nextBusStop === T) return count;
                    queue.push(nextBusStop);
                }
            }
        }
    }
    
    return -1;
}