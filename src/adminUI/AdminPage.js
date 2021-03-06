import React from 'react';
import { connect } from 'react-redux';
import Hoc from '../hoc/hoc';
import { List, Avatar, Button, Skeleton } from 'antd';
import * as actions from "../store/actions/assignment";
import { Link } from 'react-router-dom';

const count = 3;
class AdminPage extends React.Component {

    state = {
        initLoading: true,
        loading: false,
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
    handelClick = (id) => {
        this.props.deleteAssignment(id, this.props.token);
        // window.location.reload()
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
                                                <Link to={`/edit/${item.id}`} key="list-loadmore-more">Edit</Link>
                                                ,
                                                this.props.username === item.teacher &&
                                                <Link style={{ color: 'red' }} onClick={() => { this.handelClick(item.id) }} key="list-loadmore-more">Delete</Link>

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
        deletAlert: state.assignment.alert

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAssignment: (token) =>
            dispatch(
                actions.getAssignment(token)
            ),
        deleteAssignment: (id, token) => dispatch(
            actions.deleteAssignment(id, token)
        )
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)