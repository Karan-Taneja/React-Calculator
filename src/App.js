import React, { Component } from 'react';
import Buttons from './components/buttons';
import Display from './components/display';
import math from 'mathjs';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      display: "0",
      currentOps: [],
      previousVal: undefined,
      clear: 'AC'
    }

  }

  onClick = e => {
    
    const value = e.target.value;
    const clear = this.state.clear;
    let ops = [...this.state.currentOps];
    const last = ops.length-1

    const functions = {"AC":true,"C":true,}
    const operators = {'+':true,'-':true,'*':true,'/':true,}
    const assignment = {"=":true,};
    const digits = {'0':true, '1':true, '2':true, '3':true, '4':true, 
                    '5':true, '6':true, '7':true,'8':true,'9':true,};
    const decimal = {'.':true};
    const toggle = {'* -1': true, '/ 100': true}

    if(functions[value]){
      if(clear === 'AC'){
        this.setState({
            display: "0",
            currentOps:[],
            previousVal: null,
        })
      }
      else{
        if(ops.length === 1){
          this.setState({display: "0", currentOps:[], clear: 'AC'})
        }
        else if(ops.length === 2){
          if(this.state.previousVal !== null){
            const newOps = [this.state.display, ops[1]]
            this.setState({previousVal:this.state.display, display: "0", currentOps:newOps, clear: 'AC'});
          }
          else{
            const newOps = [ops[0], null]
            this.setState({currentOps:newOps, clear: 'AC'})
          }
        }
        else if(ops.length === 3){
          const newOps = [ops[0], ops[1]]
          this.setState({display:"0", currentOps:newOps, clear: 'AC'})
        }
        else{
          console.log('Something went wrong')
        }
      }
    }
    else if(digits[value]){
      if(value !== "0"){
        this.setState({clear:'C'})
      }
      if(ops[1] === null){
        this.setState({display: value, currentOps: [value]})
      }
      else{
        if(isNaN(ops[last])){
          ops.push(value)
          this.setState({display:value, currentOps:ops})
        }
        else{
          if(ops[last] === "0"){
            ops[last]=value
            this.setState({display:ops[last], currentOps:ops})
          }
          else{
            ops[last]+=value
            this.setState({display:ops[last], currentOps:ops})
          }
        }
      }
    }
    else if(decimal[value]){
      this.setState({clear:'C'})
      if(isNaN(ops[last])){
        ops.push("0.")
        this.setState({display:"0.", currentOps:ops})
      }
      else{
        if(ops[last].includes('.')) return;
        else{
          ops[last]+=value
          this.setState({display:ops[last], currentOps:ops})
        }
      }
    }
    else{
      console.log('Something went wrong.')
    }

  }

  render() {
    return (
      <>
        <div className="wholePage" onKeyDown={this.onKeyDown}>
          <div className="flex-container row justify-content-center holder">
          <div className="calculator col-10 col-sm-6 col-lg-4 col-xl-4">
            <Display value={this.state.display}/>
            <Buttons clear={this.state.clear} onClick={this.onClick} />
          </div>
        </div>
        </div>
      </>)
  }

}

export default App;