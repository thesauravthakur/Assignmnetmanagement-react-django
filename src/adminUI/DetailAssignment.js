import React from 'react';
import { connect } from 'react-redux';
import { Skeleton, PageHeader, Card, List, Form, Radio, Button } from 'antd';
import Hoc from '../hoc/hoc';
import * as actions from '../store/actions/assignment';
const userAnswer = []
class DetailAssignment extends React.Component {
    state = {
        value: 1,
        length: 0,
    };

    componentDidMount() {
        let id = this.props.match.params.id
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getDetailAssignment(this.props.token, id)
        }

    }
    componentWillReceiveProps(newProps) {
        let id = this.props.match.params.id
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getDetailAssignment(newProps.token, id)
            }
        }
    }
    onChange = (e, index) => {
        console.log('radio checked', e.target.value);

        userAnswer[index] = e.target.value
        console.log(userAnswer)
    };
    handleSubmit = (e, assignmentId, qlength) => {
        e.preventDefault();
        const data = {
            userAnswer: userAnswer,
            username: this.props.username,
            userId: this.props.userId,
            assignmentId: assignmentId,
            questionLength: qlength,
        }
        console.log(data)
        this.props.submitAssignment(data, this.props.token)
        console.log('submit success')
        this.props.history.push('/admin')

    };
    render() {
        const { assignment } = this.props
        const questions = assignment.questions
        const { value } = this.state;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

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
                                    onBack={() => this.props.history.push('/admin')}
                                    title={assignment.title}
                                    extra={<p>{assignment.teacher}</p>}
                                />

                                <Form onSubmit={(e) => this.handleSubmit(e, assignment.id, questions.length)} className="login-form">

                                    {Object.keys(assignment).length > 0 ?


                                        (questions.map((question, index) => {
                                            return (
                                                <Card key={index} title={`${index + 1}. ${question.question}`} bordered={false} >
                                                    <Radio.Group onChange={(e, questionId) => this.onChange(e, index)}  >
                                                        {
                                                            question.choice.map((choice, index) => {
                                                                return (
                                                                    <Radio key={index} style={radioStyle} value={`${question.question}:${question.id}:${choice}`}>
                                                                        {choice}
                                                                    </Radio>

                                                                )
                                                            })
                                                        }
                                                    </Radio.Group>
                                                </Card>
                                            )
                                        }))
                                        : (null)}
                                    <Button
                                        onClick={this.openNotification}
                                        htmlType="submit"
                                        type="primary"
                                        style={{ float: "right" }}
                                    >
                                        Submit
                                        </Button>
                                </Form>

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
        assignment: state.assignment.assignment,
        token: state.auth.token,
        loading: state.assignment.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        username: state.auth.username,
        userId: state.auth.userId,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDetailAssignment: (token, id) =>
            dispatch(
                actions.getDetailAssignment(token, id)
            ),
        submitAssignment: (userAnswer, token) =>
            dispatch(actions.submitAssignment(userAnswer, token))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailAssignment)