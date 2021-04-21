import "./App.css";
import axios from "axios";
import React from "react";
import Signup from "./signup";
import Login from "./login";
import Dash from "./dash"
import { ProtectedRoute } from "./protected.route";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeUserAuthor = this.onChangeUserAuthor.bind(this);
    this.onChangeUserDesc = this.onChangeUserDesc.bind(this);
    this.onChangeUserTitle = this.onChangeUserTitle.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      author: "",
      description: "",
      title: "",
      count: [],
    };
  }

  onChangeUserAuthor(e) {
    this.setState({ author: e.target.value });
  }

  onChangeUserDesc(e) {
    this.setState({ description: e.target.value });
  }
  onChangeUserTitle(e) {
    this.setState({ title: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
    };

    axios
      .post("http://127.0.0.1:5000/post", userObject)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ name: "", email: "" });
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:5000/count`).then((res) => {
      const persons = res.data;
      console.log(persons);
      this.setState({ persons });
    });
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <ProtectedRoute exact path="/dash" component={Dash} />

      </Router>
      // <div className="wrapper">
      //     <form onSubmit={this.onSubmit}>
      //         <div className="form-group">
      //             <label>Add title</label>
      //             <input type="text" value={this.state.title} onChange={this.onChangeUserTitle} className="form-control" />
      //         </div>
      //         <div className="form-group">
      //             <label>Add description</label>
      //             <input type="text" value={this.state.description} onChange={this.onChangeUserDesc} className="form-control" />
      //         </div>
      //         <div className="form-group">
      //             <label>Add author</label>
      //             <input type="text" value={this.state.author} onChange={this.onChangeUserAuthor} className="form-control" />
      //         </div>
      //         <div className="form-group">
      //             <input type="submit" value="Create User" className="btn btn-success btn-block" />
      //         </div>
      //     </form>
      // </div>
    );
  }
}
