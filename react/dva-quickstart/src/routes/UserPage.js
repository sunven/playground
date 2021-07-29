import { connect } from "dva";
import React, { Component } from "react";

class UserPage extends Component {
  render() {
    console.log("user page this.props", this.props);
    return <div>user page</div>;
  }
}

export default connect(({ user }) => ({ user }))(UserPage);
