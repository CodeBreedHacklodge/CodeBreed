import React, {
    Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import AceEditor from 'react-ace';
import Problem from './Problem';
import Representation from './Representation';
import Form from './Form';
import 'brace/mode/java';
import 'brace/theme/github';
import VisualOne from './VisualOne'
import VisualTwo from './VisualTwo'
import VisualThree from './VisualThree'
import VisualFour from './VisualFour'
import VisualFive from './VisualFive'

// http://e645cb53.ngrok.io/
class App extends Component {

    constructor() {
        super();
        this.state = {
            code: "",
            currentStep: 0,
            steps: [],
            win: false,
            canMoveNext: false,
            problemStatement: ""
        };
        
        // Home page
        // this.state.steps.push({
        //     screen: Home,
        //     problemStatement:
        // })

        // https://8f280792.ngrok.io/?
        // Push the first step onto the array
        // format: q is current question, a is correct answer to q.
        this.state.steps.push({
            screen: Form,
            problemStatement: p1,
            visual: 0,
            value: "let a = (emails) => {} ",
            passed: [],
            failed: [],
            seen: false,
            tests: [
                //Problem 1
                {
                    input: 'a(["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"])',
                    output: 2
                },
                {
                    input: 'a(["alice.z@leetcode.com","alicez@leetcode.com"])',
                    output: 1
                },
                {
                    input: 'a([])',
                    output: 0
                },
            ]
        });
          
          this.state.steps.push({
            screen: Form,
            problemStatement: p2,
            value: "let getNumberOfIslands = (binaryMatrix) => {}",
            visual: 1,
            passed: [],
            failed: [],
            seen: false,
            tests: [
                //Problem 2
                {
                    input: 'getNumberOfIslands([[1,1,1,1,0], [1,1,0,1,0], [1,1,0,0,0], [0,0,0,0,0]])',
                    output: 1
                },
                {
                    input: 'getNumberOfIslands([[1,1,0,0,0], [1,1,0,0,0], [0,0,1,0,0], [0,0,0,1,1]])',
                    output: 3
                },
                {
                    input: 'getNumberOfIslands([])',
                    output: 0
                },
            ]
        });
        
          this.state.steps.push({
            screen: Form,
            problemStatement: p3,
            value: "let shoppingOffers = (price, special, needs) => {}",
            visual: 2,
            passed: [],
            failed: [],
            seen: false,
            tests: [
                //Problem 3
                {
                    input: 'shoppingOffers([2,5], [[3,0,5],[1,2,10]], [3,2])',
                    output: 14
                },
                {
                    input: 'shoppingOffers([2,3,4], [[1,1,0,4],[2,2,1,9]], [1,2,1])',
                    output: 11
                },
                {
                    input: 'shoppingOffers([], [], [])',
                    output: 0
                },
            ]
        });
        
          this.state.steps.push({
            screen: Form,
            problemStatement: p4,
            value: "let numOfPathsToDest = (n) => { }",
            seen: false,
            passed: [],
            failed: [],
            visual: 3,
            tests: [
                //Problem 4: LC 64
                {
                    input: 'numOfPathsToDest(14)',
                    output: 742900
                },
                {
                    input: 'numOfPathsToDest(5)',
                    output: 14
                },
                {
                    input: 'numOfPathsToDest(10)',
                    output: 4862
                },
                {
                    input: 'numOfPathsToDest(0)',
                    output: undefined
                },
            ]
        });
        
          this.state.steps.push({
            screen: Form,
            problemStatement: p5,
            value: "",
            seen: false,
            passed: [],
            failed: [],
            visual: 4,
            tests: [
                //Problem 5: LC 815
                {
                    input: 'getBusRoute([[1, 2, 7], [3, 6, 7]], 1, 6)',
                    output: 2
                },
                {
                    input: 'getBusRoute([], 0, 0)',
                    output: 0
                },
            ]
        });        

        this.onChange = this.onChange.bind(this);
        this.testCode = this.testCode.bind(this);
        this.progress = this.progress.bind(this);
        this.rewind = this.rewind.bind(this);
        this.getEligibility = this.getEligibility.bind(this);
    }
    
    getEligibility() {
      return this.state.canMoveNext;
    }

    onChange(v) {
        this.state.code = v;
        this.state.steps[this.state.currentStep].value = v;
    }
    
    rewind() {
      // The user is trying to go back
      if (this.state.currentStep === 0) {
        alert("cant go back, already at first step");
        return;
      }
      
      this.setState({
        canMoveNext: true,
        code: this.state.steps[this.state.currentStep-1].value,
        currentStep: this.state.currentStep-1
      })
    }
    
    progress() {
      // Meaning the user is trying to move forward.
      if (this.state.canMoveNext || this.state.steps[this.state.currentStep].seen) {
        this.state.steps[this.state.currentStep].value = this.state.code
        this.setState({
          canMoveNext: false,
          code: this.state.steps[this.state.currentStep+1].value,
          currentStep: this.state.currentStep+1
        })
      }
    }

    testCode() {
        this.state.steps[this.state.currentStep].passed = []
        this.state.steps[this.state.currentStep].failed = []
        //alert('test code called: ' + JSON.stringify(this.state))
        // If test passes, increment currentStep.
        // Otherwise, game over (flip this.state.win)
        let f = null;
        var passed = 0;

        /* 
        let a = (b) => {
          return b
        }
        */

        //this.state.steps[this.state.currentStep].tests.length
        for (var j = 0; j < this.state.steps[this.state.currentStep].tests.length; j++) {
            let fBuilder = this.state.code + " \n" + this.state.steps[this.state.currentStep].tests[j].input;
            try {
                f = eval(fBuilder);
            } catch (err) {
                alert('Error: ' + err);
                return;
            }
            let current = this.state.steps
            if (f === this.state.steps[this.state.currentStep].tests[j].output) {
                // Wohoo, good stuff.
                current[this.state.currentStep].passed.push({input: this.state.steps[this.state.currentStep].tests[j].input, output: this.state.steps[this.state.currentStep].tests[j].output})
                passed++;
                //alert("Success on test " + j);
            } else {
                current[this.state.currentStep].failed.push({input: this.state.steps[this.state.currentStep].tests[j].input, output: this.state.steps[this.state.currentStep].tests[j].output})
                // Otherwise, test case failed.
                //alert("failed test case " + j + " bad: " + this.state.steps[this.state.currentStep].failed);
            }
            this.setState({
                steps: current
            })

        }

        //alert("passed " + passed + "/" + this.state.steps[this.state.currentStep].tests.length + "testcases");
        if (passed === this.state.steps[this.state.currentStep].tests.length) {
          this.state.steps[this.state.currentStep].value = this.state.code;
          this.state.steps[this.state.currentStep].seen = true;
          this.setState({
            canMoveNext: true
          })
          // this.setState({
          //     currentStep: this.state.currentStep + 1
          // });
        }
    }
    
    renderFirst(rep) {
      if (rep === 0) {
        return <VisualOne eligibility={this.state}/>
      } else if (rep == 1) {
        return <VisualTwo eligibility={this.state}/>
      } else if (rep == 2) {
        return <VisualThree eligibility={this.state}/>
      } else if(rep == 3) {
        return <VisualFour eligibility={this.state}/>
      } else { // 4
        return <VisualFive eligibility={this.state}/>
      }
    }

    render() {
        let color = "red"
        if (this.state.steps[this.state.currentStep].passed.length === this.state.steps[this.state.currentStep].tests.length) {
            color = "green"
        }
        console.log(this.state)
        let total = this.state.steps[this.state.currentStep].tests.length
        if (this.state.win) {
            return <h2 > Congrats, you 're a winner</h2>;
        } else return ( 
            <div className = "App" >
                <div id = "workspace">
                    <div id = "ide1">
                        <AceEditor mode = "javascript"
                        theme = "monokai"
                        name = "ide"
                        value={this.state.steps[this.state.currentStep].value}
                        onLoad = {
                            this.onLoad
                        }
                        onChange = {
                            this.onChange
                        }
                        fontSize = {
                            14
                        }
                        showPrintMargin = {
                            true
                        }
                        showGutter = {
                            true
                        }
                        highlightActiveLine = {
                            true
                        }
                        setOptions = {
                            {
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }
                        }
                        /> 
                        
                      {/* <button class = "runcode" onClick={this.testCode}><a  href="#container">Run Code</a></button> */}
                        <button class = "runcode" onClick={this.testCode}>Run Code</button>
                        <button class="prev" onClick={this.rewind}>Previous</button>
                        <button class= "next" onClick={this.progress}>Next</button>
                    </div>
                    <p id ="pstatement"> <div id="pstatement_content">{this.state.steps[this.state.currentStep].problemStatement()}</div></p>
                </div>
                <div id ="output">
                    <div id="demo">
                        <p id ="demoname"> DEMO </p>
                        {this.renderFirst(this.state.steps[this.state.currentStep].visual)}
                    </div>
                    <div id="op">
                        <div id ="output_container">
                        <div id="pass_msg">
                        <h3 style = {{color: color}}>{"Passed " + this.state.steps[this.state.currentStep].passed.length + "/" + total + " testcases"}</h3>
                        </div>                      
                        <h4>Successful test cases </h4>
                        {
                            this.state.steps[this.state.currentStep].passed.map((item, i) => {
                                return (
                                <div class="testcase">
                                    <p>input: {item.input}</p>
                                    <p>output: {item.output}</p>
                                </div>)
                            })
                        }
                        <br/>
                        <h4>Failed test cases </h4>
                        {
                            this.state.steps[this.state.currentStep].failed.map((item, i) => {
                                return (<div  class="testcase">
                                    <p>input: {item.input}</p>
                                    <p>output: {item.output}</p>
                                </div>)
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

let p1 = () => {
  return (
  
  <div>
    <p class="title"> 1. Email Validation </p>
    <p class = "statement">
      Create a boba finder account! Check and filter valid email addresses.
      <br/> Every email consists of a local name and a domain name, separated by the @ sign. 
      <br/> For example, in alice@leetcode.com, alice is the local name, and leetcode.com is the domain name.
    Besides lowercase letters, these emails may contain '.'s or '+'s. 
    <br/>If you add periods ('.') between some characters in the local name part of an email address, mail sent there will be forwarded to the same address without dots in the local name.  For example, "alice.z@leetcode.com" and "alicez@leetcode.com" forward to the same email address.  (Note that this rule does not apply for domain names.) 
    <br/>
    If you add a plus ('+') in the local name, everything after the first plus sign will be ignored. This allows certain emails to be filtered, for example m.y+name@email.com will be forwarded to my@email.com.  (Again, this rule does not apply for domain names.)
    <br/>It is possible to use both of these rules at the same time.
    Given a list of emails, we send one email to each address in the list.  How many different addresses actually receive mails? 
    </p>
    <p class = "example">
        Example 1:
        <p class="example_list">
            Input: ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"] 
            <br/> 
            <br/> 
            Output: 2 
        <p class="explanation"> 
            Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mails.
        </p>
    </p>
  </p>
 </div>)
}

let p2 = () => {
  return (
  <div>
    <p class="title"> 2. Number of Boba Shops </p>
    <p class = "statement">
        Congrats on successfully signing up! We must now locate all the boba shops in a given city. Since GPS is not too accurate, we have a grid map of points where a boba shop is in vicinity.
        Find the number of boba shops in a given grid map of a city! 
        <br/>
        Given a 2D grid map of '1's (boba shop) and '0's (not boba), count the number of boba shops. 
        A boba shop is surrounded by non-boba shop areas and is formed by connecting adjacent possible boba shop points horizontally or vertically. You may assume all four edges of the grid are all surrounded by areas that are NOT boba shops.
    </p>
    <p class = "example">
        Example 1:
 
    <p class="example_list">
        Input:
        <br/>
        11110
         <br/>
        11010
         <br/>
        11000
         <br/>
        00000
         <br/>
         <br/>
        Output: 1
         <br/>
    </p>
    </p>
    <p class = "example">
        Example 2:
    <p class="example_list">
    
        Input:
         <br/>
        11000
         <br/>
        11000
         <br/>
        00100
         <br/>
        00011
         <br/>
        <br/>
        Output: 3
    </p>
    </p>
    </div>)
}

let p3 = () => {
  return (
  <div>
  
    <p class="title"> 3. Applying Special Offers </p>
    <p class = "statement">
    After finding all boba shops in your city, we need to find the cheapest way to get all the boba types you'd like, given that there are special offers for certain boba types from certain shops.
      <br/>
      In a Boba Store, there are some kinds of items to sell. Each item has a price.
     <br/>
    However, there are some special offers, and a special offer consists of one or more different kinds of items with a sale price.
     <br/>
    You are given the each item's price, a set of special offers, and the number we need to buy for each item. The job is to output the lowest price you have to pay for exactly certain items as given, where you could make optimal use of the special offers.
     <br/>
    Each special offer is represented in the form of an array, the last number represents the price you need to pay for this special offer, other numbers represents how many specific items you could get if you buy this offer.
     <br/>
    You could use any of special offers as many times as you want.
    </p>
    <p class = "example">
        Example 1:
        <br/>
        <p class="example_list">
         <br/>
        Input: [2,5], [[3,0,5],[1,2,10]], [3,2]
         <br/>
         <br/>
        Output: 14
         <br/>
             <p class="explanation">
            Explanation: 
             <br/>
            There are two kinds of items, A and B. Their prices are $2 and $5 respectively. 
            In special offer 1, you can pay $5 for 3A and 0B
            In special offer 2, you can pay $10 for 1A and 2B. 
            You need to buy 3A and 2B, so you may pay $10 for 1A and 2B (special offer #2), and $4 for 2A.
            </p>
        </p>
    </p>
    <p class="example">
        Example 2:
        <p class="example_list">
         <br/>
        Input: [2,3,4], [[1,1,0,4],[2,2,1,9]], [1,2,1]
         <br/>
         <br/>
        Output: 11
         <br/>

    
        <p class="explanation">
            Explanation: 
             <br/>
            The price of A is $2, and $3 for B, $4 for C. 
            You may pay $4 for 1A and 1B, and $9 for 2A ,2B and 1C. 
            You need to buy 1A ,2B and 1C, so you may pay $4 for 1A and 1B (special offer #1), and $3 for 1B, $4 for 1C. 
            You cannot add more items, though only $9 for 2A ,2B and 1C.
         <br/>
         </p>
         </p>
         <br/>
        Note:
         <br/>
        There are at most 6 kinds of items, 100 special offers.
        For each item, you need to buy at most 6 of them.
        You are not allowed to buy more items than you want, even if that would lower the overall price.        

    </p>
  </div>)
}


let p4 = () => {
  return (<div>
    <p class="title"> 4. Finding Number of Routes </p>
    <p class = "statement">
      We've found one ideal boba shop for all your boba needs now! To maximize options for travel to this boba shop, we want to find the total number of possible paths from your starting location to the boba shop.
      Streets in between are represented as edges in a 2D square matrix with length of a side of this square given. You start at the bottom left corner and want to reach the upper right corner, moving only up and to the left.
    </p>
    
    <p class = "example">
      Example:
       <br/>
       <p class="example_list">     
           Input: 5
           <br/>
          Visualize: 
           <br/>
           <div id="visual4_grid">
            <img src= "assets/grid.jpg" id = "5x5 matrix" />
            </div>
            Output: 14 
            <br/>
            </p>
      </p>
    <p class="explanation"> 
       <br/>
       <br/>
      Hint: try dynamic programming by storing number of paths to a certain place!
"    </p>  
  </div>)
}

let p5 = () => {
  return (<div>
  <p class="title"> 5. Finding Bus Routes </p>
  <p class = "statement">
        Now that we've found all the possible paths, we want to see which of the available bus routes in this city can take us from our starting point to our desired boba shop!
         <br/>
        We have a list of bus routes. Each routes[i] is a bus route that the i-th bus repeats forever. For example if routes[0] = [1, 5, 7], this means that the first bus (0-th indexed) travels in the sequence 1->5->7->1->5->7->1->... forever.
       <br/>
        We start at bus stop S (initially not on a bus), and we want to go to bus stop T. Travelling by buses only, what is the least number of buses we must take to reach our destination? Return -1 if it is not possible.

    </p>
    <p class = "example">
        Example:
           <br/>
           <p class="example_list">
            Input: 
               <br/>
            routes = [[1, 2, 7], [3, 6, 7]]
               <br/>
            S = 1
               <br/>
            T = 6
               <br/>
              <br/>
            Output: 2
               <br/>
           </p>
      </p>
    <p class="explanation"> 
        Explanation:
       <br/>
        The best strategy is take the first bus to the bus stop 7, then take the second bus to the bus stop 6.
"     </p>
  </div>)
}



export default App;