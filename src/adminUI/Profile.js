import React from 'react';
import { PageHeader, Skeleton, Progress, List } from 'antd';
import { connect } from 'react-redux';
import Hoc from '../hoc/hoc';
import * as actions from "../store/actions/auth";
import * as assActions from "../store/actions/assignment";


class Result extends React.Component {
    render() {
        console.log(this.props)

        return (
            <Hoc style={{ textAlign: 'center' }}>
                <Progress className='row' style={{ padding: '10px' }} type="circle" percent={this.props.grade} width={80} />
                <div style={{ overflowWrap: 'break-word' }}>{this.props.assignment}</div>
            </Hoc>
        );
    }
}


class Profile extends React.Component {
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getUserData()
            this.props.getGradedAssignment(this.props.username, this.props.token)
        }

    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getUserData()
                this.props.getGradedAssignment(newProps.username, newProps.token)
            }
        }
    }

    render() {
        const { userData } = this.props
        const grade = this.props.grade[0]
        console.log(this.props.grade[0])
        console.log(grade)
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
                                <PageHeader
                                    className="site-page-header"
                                    onBack={() => this.props.history.push('/admin')}
                                    title={`${userData.first_name} ${userData.last_name}`}
                                    subTitle={`(@${userData.username})`}
                                    extra={userData.is_teacher ? <p>Teacher</p> : <p>Student</p>}
                                />

                                <List
                                    size="large"
                                    style={{ textAlign: 'center' }}
                                    dataSource={this.props.grade}
                                    renderItem={assignment => <Result key={assignment.id} grade={assignment.grade} assignment={assignment.assignment} />}
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
    console.log(state.assignment.grade)
    return {
        assignments: state.assignment.assignments,
        token: state.auth.token,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        username: state.auth.username,
        userData: state.auth.userData,
        grade: state.assignment.grade


    };
};
const mapDispatchToProps = dispatch => {
    return {
        getUserData: () =>
            dispatch(
                actions.getUserData()
            ),
        getGradedAssignment: (username, token) => dispatch(
            assActions.getGradedAssignment(username, token)
        )

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)