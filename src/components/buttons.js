import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Buttons = (props) => {
  return (
  <>
  <div className="row">
    <button className="col-3 button change" onClick = {props.onClick} value={props.clear}>{props.clear}</button>
    <button className="col-3 button change" onClick = {props.onClick} value="* -1">±</button>
    <button className="col-3 button change" onClick = {props.onClick} value="/ 100">﹪</button>
    <button className="col-3 button operation" onClick = {props.onClick} data-buttontype="operator" value="/">÷</button>
    <button className="col-3 button number" onClick = {props.onClick} value="7">7</button>
    <button className="col-3 button number" onClick = {props.onClick} value="8">8</button>
    <button className="col-3 button number" onClick = {props.onClick} value="9">9</button>
    <button className="col-3 button operation" onClick = {props.onClick} value="*">x</button>
    <button className="col-3 button number" onClick = {props.onClick} value="4">4</button>
    <button className="col-3 button number" onClick = {props.onClick} value="5">5</button>
    <button className="col-3 button number" onClick = {props.onClick} value="6">6</button>
    <button className="col-3 button operation" onClick = {props.onClick} data-buttontype="operator" value="-">—</button>
    <button className="col-3 button number" onClick = {props.onClick} value="1">1</button>
    <button className="col-3 button number" onClick = {props.onClick} value="2">2</button>
    <button className="col-3 button number" onClick = {props.onClick} value="3">3</button>
    <button className="col-3 button operation" onClick = {props.onClick} value="+">+</button>
    <button className="col-6 button number" onClick = {props.onClick} value="0">0</button>
    <button className="col-3 button number" onClick = {props.onClick} value=".">.</button>
    <button className="col-3 button operation" onClick = {props.onClick} value="=">=</button>
  </div>
  </>
  );
}

export default Buttons;