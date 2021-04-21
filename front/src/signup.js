import axios from "axios";
import React from "react";
import { Component } from "react";
import "./css/signup.css";
import covid from "./img/covid.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeUserContact = this.onChangeUserContact.bind(this);
    this.onChangeUserDesignation = this.onChangeUserDesignation.bind(this);
    this.onChangeUserAge = this.onChangeUserAge.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      contact: "",
      designation: "",
      age: "",
      password: "",
      persons: [],
    };
  }

  onChangeUserName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeUserEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangeUserContact(e) {
    this.setState({ contact: e.target.value });
  }
  onChangeUserDesignation(e) {
    this.setState({ designation: e.target.value });
  }
  onChangeUserAge(e) {
    this.setState({ age: e.target.value });
  }
  onChangeUserPassword(e) {
    this.setState({ password: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      name: this.state.name,
      email: this.state.email,
      contact: this.state.contact,
      designation: this.state.designation,
      age: this.state.age,
      password: this.state.password,
    };

    axios
      .post("http://127.0.0.1:5000/signup", userObject)
      .then((res) => {
        console.log(res.data);
        window.location='/'
      })
      .catch((error) => {
        console.log(error);
        toast.error('User is already registered', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      });

    this.setState({
      name: "",
      email: "",
      contact: "",
      designation: "",
      age: "",
      password: "",
    });
  }

  render() {
    return (
      <section class="section">
        <div class="main">
          <div class="intro-section">
            <h6 class="intro-heading">Covid Vaccine Portal</h6>
            <p class="intro-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
              dignissimos officia sint animi voluptatum est praesentium nostrum,
              iusto earum fugit.
            </p>
            <img
              src={covid}
              style={{ marginTop: "10px" }}
              width="65%"
              alt="Laptop"
            />
          </div>

          <div class="sign-section">
            <div class="sign-block">
              <form onSubmit={this.onSubmit}>
                <h3 class="sign-heading">Sign up here</h3>
                <div class="input-block">
                  <input
                    required
                    value={this.state.name}
                    onChange={this.onChangeUserName}
                    className="input form-group"
                    placeholder="| &nbsp;Name"
                    type="text"
                  />
                  <input
                    value={this.state.email}
                    required
                    onChange={this.onChangeUserEmail}
                    className="input form-group"
                    placeholder="| &nbsp;Email"
                    type="text"
                  />
                  <input
                    value={this.state.contact}
                    required
                    onChange={this.onChangeUserContact}
                    className="input form-group"
                    placeholder="| &nbsp;Contact"
                    type="text"
                  />
                  <input
                    value={this.state.designation}
                    required
                    onChange={this.onChangeUserDesignation}
                    className="input form-group"
                    placeholder="| &nbsp;Designation"
                    type="text"
                  />
                  <input
                    value={this.state.age}
                    required
                    onChange={this.onChangeUserAge}
                    className="input form-group"
                    placeholder="| &nbsp;Age"
                    type="text"
                  />
                  <input
                    value={this.state.password}
                    required
                    onChange={this.onChangeUserPassword}
                    className="input form-group"
                    placeholder="| &nbsp;password"
                    type="password"
                  />
                </div>

                <button
                  type="submit"
                  value="Create User"
                  className="form-group sign-button"
                  style={{marginTop:'10px'}}
                >
                  Sign Up
                </button>
                <div style={{justifyContent:'center',paddingTop:'10px', fontSize:'12px'}} class="password-block">
                  <a class="password-link" href="/">
                    Already have an acount? Login
                  </a>
                </div>
              </form>
            </div>
          </div>
          <ToastContainer
            />
        </div>
      </section>
    );
  }
}
export default Signup;
