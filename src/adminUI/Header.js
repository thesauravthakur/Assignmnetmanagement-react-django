import React from 'react';
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, withRouter, NavLink } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
class UiHeader extends React.Component {
    render() {
        return (
            <Header className="header">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    style={{ lineHeight: "64px" }}
                >
                    <Menu.Item key="1" >
                        <NavLink to='/'>Home</NavLink>
                    </Menu.Item>
                    {this.props.isAuthenticated &&
                        <Menu.Item key="3" >
                            <NavLink to='/admin'>Admin</NavLink>
                        </Menu.Item>
                    }
                    {this.props.isAuthenticated ? (
                        <Menu.Item key="2" onClick={this.props.logout}>

                            <NavLink to='/'>Logout</NavLink>

                        </Menu.Item>
                    ) : (
                            <Menu.Item key="2">
                                <NavLink to="/login">Login</NavLink>
                            </Menu.Item>
                        )}
                </Menu>
            </Header>
        );
    }
}

export default UiHeader;