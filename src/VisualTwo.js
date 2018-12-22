import React, { Component } from 'react'

export default class VisualTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            places: "",
            allowNext: false,
            grid: []
        }
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
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
    
    
    
    // When the user chooses their city
    submit(e) {
        e.preventDefault()
        if (!this.state.allowNext) {
            alert("you're in the wrong house, fool. complete your test cases first.")
            return
        }
        let city = this.state.value.toLowerCase()
        let result = 0;
        if (city === 'seattle') {
            this.state.grid = [[1,1,1,1,0], [1,1,0,1,0], [1,1,0,0,0], [0,0,0,0,0]]
            result = getNumberOfIslands([[1,1,1,1,0], [1,1,0,1,0], [1,1,0,0,0], [0,0,0,0,0]])
        } else if (city === 'los angeles') {
            this.state.grid = [[1,1,0,0,0], [1,1,0,0,0], [0,0,1,0,0], [0,0,0,1,1]]
            result = getNumberOfIslands([[1,1,0,0,0], [1,1,0,0,0], [0,0,1,0,0], [0,0,0,1,1]])
        } else if (city === 'new york'){
            this.state.grid = []
            result = getNumberOfIslands([])
        }
        this.setState({
            places: result + " Boba places found"
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

                <div>
                    <div id="container">
                        <h4>Find the number of Boba shops in a city</h4>
                        <p>Currently, we only support Seattle, Los Angeles and New York</p>
                        <div class="mobile_input">
                        <p>Maps input</p>
                        {       
                            this.state.grid.map((item, i) => {
                                return (<div>
                                    <p>{this.state.grid[i]}</p>
                                </div>)
                            })
                        }
                        </div>
                        <form>
                            <label class="label2">
                                City
                                <select class = "select2"value={this.state.value} onChange={this.onChange}>
                                    <option value="Seattle">Seattle</option>
                                    <option value="Los Angeles">Los Angeles</option>
                                    <option value="New York">New York</option>
                                </select>
                            </label>
                            <input class ="submit" type="submit" value="Submit" onClick={this.submit}/>
                        </form>
                        <div class="mobile_output">
                         <p>{this.state.places}</p>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}

let getNumberOfIslands = (binaryMatrix) => {
    if (binaryMatrix.length < 1) return 0;
    let islands = 0
    let rows = binaryMatrix.length //# number of rows
    let cols = binaryMatrix[0].length //# number of columns

    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            if (binaryMatrix[i][j] == 1){
                markIsland(binaryMatrix, rows, cols, i, j)
                islands++
            }
        } 
    }
    return islands
}


let markIsland = (binaryMatrix, rows, cols, i, j) => {
    let q = []
    q.push([i,j])
    while (q.length > 0){
        let item = q.shift()
        let x = item[0]
        let y = item[1]
        if (binaryMatrix[x][y] == 1){
            binaryMatrix[x][y] = -1
            pushIfValid(q, rows, cols, x-1, y)
            pushIfValid(q, rows, cols, x, y-1)
            pushIfValid(q, rows, cols, x+1, y)
            pushIfValid(q, rows, cols, x, y+1)
        }
    }
}

function pushIfValid(q, rows, cols, x, y){
    if (x >= 0 && x < rows && y >= 0 && y < cols){
        q.push([x,y])
    }
}
