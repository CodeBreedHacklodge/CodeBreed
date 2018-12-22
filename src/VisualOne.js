import React, { Component } from 'react'

export default class VisualOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            allowNext: false
        }
        
        this.submit = this.submit.bind(this)
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log('next props \n')
        console.log(nextProps)
        this.setState({
            allowNext: nextProps.eligibility.canMoveNext
        })
    }
    
    submit(e) {
        e.preventDefault()
        console.log(this.state.allowNext)
        if (this.state.allowNext) {
            alert(a(this.state.value))
        } else {
            alert("Please complete the code for checking email validation first!")
        }
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
                <h4>Validate Emails Here:</h4>
                <form>
                    <label> 
                        E-mail:
                        <input class="select2" onChange={(e) => {this.setState({value: e.target.value})}} value={this.state.value} type="text"/>
                    </label>
                    <input class="submit" type="submit" value="Submit" onClick={this.submit}/>
                </form>
            </div>
            </div>
        )
    }
}

let a = (emails) => {
  emails = emails.split(" ")
  if (emails.length < 1) return 0;
  let seen = new Set()
  for (let i = 0; i < emails.length; i++) {
    let j = emails[i].indexOf('@')
    let local = emails[i].substring(0, j)
    let rest = emails[i].substring(j)
    if (local.includes("+")) {
      local = local.substring(0, local.indexOf('+'))
    }
    local = local.replace(/./g, '')
    seen.add(local + rest)
  }
  
  return seen.size
}