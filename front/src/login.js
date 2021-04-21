import axios from "axios";
import React from "react";
import { Component } from "react";
import "./css/login.css";
import auth from "./services/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
    };
  }
  onChangeUserEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeUserPassword(e) {
    this.setState({ password: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const loginObject = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://127.0.0.1:5000/login", loginObject)
      .then((res) => {
        console.log(res.data.token);
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        auth.login(() => {
          this.props.history.push("/dash");
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Either email or password is wrong', {
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
      password: "",
      email: "",
    });
  }

  render() {
    return (
      <div class="login-fg">
        <div class="container-fluid">
          <div class="row">
            <div class="back col-xl-7 col-lg-7 col-md-12 bg">
              {/* <div class="info">
                        <h1>Furkan Giray</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div> */}
            </div>
            <div class="col-xl-4 col-lg-5 col-md-12 login">
              <div className="box">
                <div class="login-section">
                  <div class="logo clearfix">
                    <a>Covid Vaccine Portal</a>
                  </div>
                  <h3>Sign in into your account</h3>
                  <div class="form-container">
                    <form onSubmit={this.onSubmit}>
                      <div class="form-group form-fg">
                        <input
                          type="email"
                          required
                          name="email"
                          className="form-group input-text"
                          value={this.state.email}
                          onChange={this.onChangeUserEmail}
                          placeholder="Email Address"
                        />
                        <i class="fa fa-envelope"></i>
                      </div>
                      <div class="form-group form-fg">
                        <input
                          value={this.state.password}
                          onChange={this.onChangeUserPassword}
                          type="password"
                          name="email"
                          required
                          className="form-group input-text"
                          placeholder="Password"
                        />
                        <i class="fa fa-unlock-alt"></i>
                      </div>
                      <div class="form-group mt-2">
                        <button
                          value="Create User"
                          type="submit"
                          className="form-group btn-md btn-fg btn-block"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <p>
                    Don't have an account?{" "}
                    <a href="/signup" class="linkButton">
                      {" "}
                      Register
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <ToastContainer
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
