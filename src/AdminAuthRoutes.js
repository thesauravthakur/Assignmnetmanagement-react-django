import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";
import * as actions from "./store/actions/auth";
import { connect } from "react-redux";

import Login from "./adminUI/Login";
import Signup from "./adminUI/Signup";
import CustomLayout from './adminUI/Layout';
import Welcome from './adminUI/Welcome';
import AdminPage from "./adminUI/AdminPage";
import CreateAssignment from './adminUI/CreateAssignment';
class AdminAuthRoutes extends React.Component {
  render() {
    return (
      <Hoc>
        <CustomLayout {...this.props}>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/create-assignment" component={CreateAssignment} />
        </CustomLayout>

      </Hoc>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminAuthRoutes);
