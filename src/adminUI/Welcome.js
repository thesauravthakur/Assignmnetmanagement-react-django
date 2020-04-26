import React from 'react';
import { connect } from 'react-redux';
import Hoc from '../hoc/hoc';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Calendar, Skeleton } from 'antd';

const { Header, Content, Footer } = Layout;

class Welcome extends React.Component {
    render() {
        return (

            <Hoc >
                <Calendar />

            </Hoc>

        )
    }
}
const mapStateToProps = state => {
    return {
        assignments: state.assignment.assignments,
        token: state.auth.token,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        username: state.auth.username,

    };
};
export default connect(mapStateToProps)(Welcome);
