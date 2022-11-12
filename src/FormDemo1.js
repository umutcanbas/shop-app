import React, { Component } from "react";

export default class FormDemo1 extends Component {
  state = { userName: "" , city:""};
  onChangHandler = (e) => {
   // this.setState({ userName: event.target.value });
   let name = e.target.name
   let value = e.target.value

   this.setState({[name]:value})
    }

    onSubmitHandler=(event)=>{
        event.preventDefault()
        alert(this.state.userName)
    }
  
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <h3>User Name</h3>
          <input name="userName"onChange={this.onChangHandler} type="text"></input>
          <h3>User Name is {this.state.userName} </h3>

          <h3>City</h3>
          <input name="city" onChange={this.onChangHandler} type="text"></input>
          <h3>City {this.state.city} </h3>
          <input type="submit" value="Save" ></input>
        </form>
      </div>
    );
  }
 }
