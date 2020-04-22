import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, withRouter, NavLink } from "react-router-dom";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import SideBar from './SideBar';
import '../static/Layout.css';
import UiHeader from "./Header";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class CustomLayout extends React.Component {


  render() {
    const user = JSON.parse(localStorage.getItem("user"))
    return (
      <Layout>
        <UiHeader {...this.props} />
        <Content style={{ padding: '0 50px' }}>

          {this.props.isAuthenticated ?
            (
              <Breadcrumb style={{ margin: '16px 0' }}>

                <Breadcrumb.Item ><NavLink to='/profile' style={{ color: '#001529' }}>Profile</NavLink></Breadcrumb.Item>
                {user.is_teacher &&
                  <Breadcrumb.Item><NavLink to='/create-assignment' style={{ color: '#001529' }}> Create</NavLink></Breadcrumb.Item>
                }

              </Breadcrumb>
            )
            :
            (null)
          }

          <Layout className="site-layout-background" style={{}}>

            <Content style={{ padding: '15px 24px', minHeight: 440, backgroundColor: 'white' }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Admin Dashboard</Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);


