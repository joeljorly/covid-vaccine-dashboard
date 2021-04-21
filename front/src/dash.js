import React from "react";
import axios from "axios";
import authHeader from "./services/auth_header";
import auth from "./services/auth";
import "./css/dash.css";
import user from "./img/user.png";
import { Link } from "react-router-dom";

export default class Dash extends React.Component {
  state = {
    name: [],
    position: "",
  };
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:5000/name`, { headers: authHeader() })
      .then((res) => {
        const name = res.data;
        console.log(name);
        this.setState({ name });
      });

    axios
      .get(`http://127.0.0.1:5000/position`, { headers: authHeader() })
      .then((res) => {
        const position = res.data;
        console.log(position);
        this.setState({ position });
      });
  }
  render() {
    return (
      <>
        <div class="particle">
          <div class="container">
            <div class="row top">
              <div class="twelve column">
                <div class="logo">Welcome to Covid Portal</div>
                <h1>Hi! {this.state.name},</h1>
                <h2> Your Current Waiting Position is:</h2>
              </div>
            </div>

            <div class="row">
              <div class="outerbody">
                <img
                  src="https://rahulsahofficial.github.io/profile_card_component/images/bg-pattern-top.svg"
                  class="bgtopcircle"
                />
                <img
                  src="https://rahulsahofficial.github.io/profile_card_component/images/bg-pattern-bottom.svg"
                  class="bgbottomcircle"
                />
                <div class="card">
                  <div class="toppart">
                    <img src={user} alt="DP" />
                  </div>
                  <div class="bottompart">
                    <div class="detdiv">
                      <div class="eachdiv">
                        <h1 style={{ fontSize: "40px" }}>
                          {this.state.position}
                        </h1>
                        <h2>Position</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="/">
            <div id="logout" class="contain">
              <div class="button">
                <span>Logout</span>
              </div>
            </div>
          </a>
        </div>
      </>
    );
  }
}
