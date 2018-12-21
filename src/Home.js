import React, {
    Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import AceEditor from 'react-ace';
import Problem from './Problem';
import Representation from './Representation';
import Form from './Form';
import {Link} from "react-router-dom";
import 'brace/mode/java';
import 'brace/theme/github';

// http://e645cb53.ngrok.io/
class Home extends Component {


    render() {
        return(
            <div>
 
    <div id = "main_page">
        <div id="container">
            <div id="image_left">
                 <img className ="main_img" src= "/assets/coding.png"/>
            </div>
            <div id="info">
                <div id="info_container">
                    <div id="heading">
                        Learn and Apply at the same time
                    </div>
                    <div id="info_details">
                        Have you ever had trouble staying focused with Leetcode? Like many others, you've probably experienced the 'Leetcode grind' while preparing for interviews. While practicing Leetcode is essential to building programming skills, it can get very tedious...
This is where Codebreed will help! Practice well-integrated Leetcode questions that directly contribute to an app you build, step-by-step, from scratch! Make progress on a personal app that uses your leetcode algorithms for practical application. Try Codebreed:
                    </div>
                    
        <Link className= "trial" to  = "/ide" >Take a free trial</Link>
                </div>
            </div>
        </div>
    </div>
    </div>
            )

}

}

export default Home;