import React from 'react';
import { connect } from 'react-redux';
import Hoc from '../hoc/hoc';
import SideBar from './SideBar';
import { List, Avatar, Button, Skeleton } from 'antd';
import * as actions from "../store/actions/assignment";
import { Link } from 'react-router-dom';

const count = 3;
class AdminPage extends React.Component {

    state = {
        initLoading: true,
        loading: false,
        data: this.props.assignments,
        list: [],
    };
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getAssignment(this.props.token)
        }

    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getAssignment(newProps.token)
            }
        }
    }
    render() {
        return (
            <Hoc>
                {this.props.loading ?
                    <Skeleton active />
                    :
                    (!this.props.isAuthenticated ?
                        (<h1 style={{ textAlign: 'center' }}>Please SignUp</h1>)
                        :
                        (
                            <Hoc>
                                <List
                                    className="demo-loadmore-list"

                                    itemLayout="horizontal"
                                    // loadMore={loadMore}
                                    dataSource={this.props.assignments}
                                    renderItem={item => (

                                        <List.Item
                                            actions={[
                                                this.props.username === item.teacher &&
                                                < a key="list-loadmore-edit" >edit</a>
                                                ,
                                                <Link to={`/detail/${item.id}`} key="list-loadmore-more">more</Link>
                                            ]}
                                        >

                                            <List.Item.Meta
                                                title={<a href={`/detail/${item.id}`}>{item.title}</a>}
                                            />
                                            <div>{item.teacher}</div>

                                        </List.Item>
                                    )}
                                />
                            </Hoc>
                        )
                    )
                }
            </Hoc>

        );
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
const mapDispatchToProps = dispatch => {
    return {
        getAssignment: (token) =>
            dispatch(
                actions.getAssignment(token)
            )
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)