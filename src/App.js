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

  onKeyDown = e => {
    const value = e.key;
    const clear = this.state.clear;
    let ops = [...this.state.currentOps];
    const last = ops.length-1

    const functions = {"Escape":true,}
    const operators = {'+':true,'-':true,'*':true,'/':true,}
    const assignment = {"Enter": true, "=":true,};
    const digits = {'0':true, '1':true, '2':true, '3':true, '4':true, 
                    '5':true, '6':true, '7':true,'8':true,'9':true,};
    const decimal = {'.':true};
    const toggle = {'%': true,}
    const backspace = {"Backspace":true,}

    if(backspace[value]){
      if(isNaN(ops[last])) return;
      else{
        if(ops[last].length > 1){
          ops[last] = ops[last].slice(0,-1)
          console.log(ops[last])
          console.log(ops)
          this.setState({display: ops[last], currentOps: ops})
        }
        else{
          ops[last] = "0"
          this.setState({display: ops[last], currentOps: ops})
        }
      }
    }
    else if(functions[value]){
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
          console.log('Something went wrong in functions')
        }
      }
    }
    else if(operators[value]){
      if(ops.length === 0){
        ops.push("0")
        ops.push(value)
        this.setState({currentOps: ops})
      }
      else if(ops.length === 1){
        ops.push(value)
        this.setState({currentOps: ops})
      }
      else if(ops.length === 2){
        ops[1] = value;
        this.setState({currentOps: ops, previousVal:this.state.display})
      }
      else if(ops.length === 3){
        const result = `${math.eval(ops.join(""))}`
        this.setState({display: result, previousVal:ops[2], currentOps:[result, value]})
      }
      else{
        console.log('Something went wrong in operators')
      }
    }
    else if(assignment[value]){
      if(ops.length === 0) return;
      else if(ops.length === 1) return;
      else if(ops.length === 2){
        if(this.state.previousVal){
          const result = `${math.eval(ops.join("")+this.state.previousVal)}`
          this.setState({display: result, currentOps:[result, ops[1]]})
        }else{
          ops.push(ops[0])
          const result = `${math.eval(ops.join(""))}`
          this.setState({display: result, previousVal:ops[2], currentOps:[result, ops[1]]})
        }
      }
      else if(ops.length === 3){
        const result = `${math.eval(ops.join(""))}`
        this.setState({display: result, previousVal:ops[2], currentOps:[result, ops[1]]})
      }
      else{
        console.log('Something went wrong in assignment')
      }
    }
    else if(toggle[value]){
      if(ops.length === 0) return;
      else if(ops.length === 1 || ops.length === 2){
        if(ops[0] === "0") return;
        else{
          const result = `${math.eval(ops[0]+"/ 100")}`
          ops[0] = result
          this.setState({display:result, currentOps:ops})
        }
      }
      else if(ops.length === 3){
        if(ops[2] === 0) return;
        else{
          const result = `${math.eval(ops[2]+value)}`
          ops[2] = result
          this.setState({display:result, currentOps:ops})
        }
      }
      else{
        console.log('Something went wrong in toggle');
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
      console.log('Something went wrong in general.')
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
    else if(operators[value]){
      if(ops.length === 0){
        ops.push("0")
        ops.push(value)
        this.setState({currentOps: ops})
      }
      else if(ops.length === 1){
        ops.push(value)
        this.setState({currentOps: ops})
      }
      else if(ops.length === 2){
        ops[1] = value;
        this.setState({currentOps: ops, previousVal:this.state.display})
      }
      else if(ops.length === 3){
        const result = `${math.eval(ops.join(""))}`
        this.setState({display: result, previousVal:ops[2], currentOps:[result, value]})
      }
      else{
        console.log('Something went wrong')
      }
    }
    else if(assignment[value]){
      if(ops.length === 0) return;
      else if(ops.length === 1) return;
      else if(ops.length === 2){
        if(this.state.previousVal){
          const result = `${math.eval(ops.join("")+this.state.previousVal)}`
          this.setState({display: result, currentOps:[result, ops[1]]})
        }else{
          ops.push(ops[0])
          const result = `${math.eval(ops.join(""))}`
          this.setState({display: result, previousVal:ops[2], currentOps:[result, ops[1]]})
        }
      }
      else if(ops.length === 3){
        const result = `${math.eval(ops.join(""))}`
        this.setState({display: result, previousVal:ops[2], currentOps:[result, ops[1]]})
      }
      else{
        console.log('Something went wrong')
      }
    }
    else if(toggle[value]){
      if(ops.length === 0) return;
      else if(ops.length === 1 || ops.length === 2){
        if(ops[0] === "0") return;
        else{
          const result = `${math.eval(ops[0]+value)}`
          ops[0] = result
          this.setState({display:result, currentOps:ops})
        }
      }
      else if(ops.length === 3){
        if(ops[2] === 0) return;
        else{
          const result = `${math.eval(ops[2]+value)}`
          ops[2] = result
          this.setState({display:result, currentOps:ops})
        }
      }
      else{
        console.log('Something went wrong');
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