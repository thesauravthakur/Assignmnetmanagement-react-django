import React from 'react';
import { connect } from 'react-redux';
import Hoc from '../hoc/hoc';
import { Form, Input, Button, Icon, Divider } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import * as actions from "../store/actions/assignment";

import { Skeleton } from 'antd';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};



class ChoiceForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Hoc {...formItemLayout}>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="Choice"
                >
                    {getFieldDecorator(`choice${this.props.index}${this.props.item}`, {

                        rules: [
                            { required: true, message: "Please input  Choice !" }
                        ]
                    })(
                        <Input

                            placeholder="Choice"
                        />
                    )}
                </FormItem>
            </Hoc>
        );
    }
}

class QuestionForm extends React.Component {
    state = {
        boxCount: 1
    }

    add = () => {
        const { boxCount } = this.state
        this.setState({
            boxCount: boxCount + 1
        })
    }
    remove = () => {
        const { boxCount } = this.state
        this.setState({
            boxCount: boxCount - 1
        })
    }
    render() {
        const { boxCount } = this.state;
        const choices = []
        for (let i = 0; i < boxCount; i++) {
            choices.push(
                <Hoc key={i}>
                    <ChoiceForm item={i}  {...this.props} />
                </Hoc>
            )
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Hoc {...formItemLayout}>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="Question"
                    name="question">
                    {getFieldDecorator(`question${this.props.index}`, {
                        rules: [
                            { required: true, message: "Please input Question!" }
                        ]
                    })(
                        <Input

                            placeholder="Question"
                        />
                    )}
                </FormItem>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="Answer"
                    name="answer">
                    {getFieldDecorator(`answer${this.props.index}`, {
                        rules: [
                            { required: true, message: "Please input   Answer!" }
                        ]
                    })(
                        <Input

                            placeholder="Answer"
                        />
                    )}
                </FormItem>
                {choices}
                <Form.Item style={{ textAlign: '-webkit-right' }} wrapperCol={{ span: 18 }}>
                    <Button

                        type="dashed"
                        disabled={choices.length === 1}
                        onClick={() => this.remove()}
                        style={{ width: '30%' }}
                    >
                        <MinusOutlined /> Remove Choices
                     </Button>
                    <Button
                        type="dashed"
                        onClick={
                            this.add
                        }
                        style={{ width: '30%', marginLeft: '5px' }}
                    >
                        <PlusOutlined /> Add Choices
                                      </Button>
                </Form.Item>
                <Divider />
            </Hoc>
        );
    }
}










class CreateAssignment extends React.Component {
    state = {
        boxCount: 1
    }

    add = () => {
        const { boxCount } = this.state
        this.setState({
            boxCount: boxCount + 1
        })
    }
    remove = () => {
        const { boxCount } = this.state
        this.setState({
            boxCount: boxCount - 1
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        const choices = []
        this.props.form.validateFields((err, values) => {



            const data = {
                assignment: values,
                teacher: this.props.username,
                userId: this.props.userId,

            }
            console.log(data)
            if (!err) {
                localStorage.setItem('assignmentTitle', JSON.stringify(values.title))
                this.props.postAssignment(data, this.props.token)
                console.log('route')
                this.props.history.push('/admin')
            }
        });
    };
    render() {
        const choiceData = []
        const { boxCount } = this.state;
        const question = []
        for (let i = 0; i < boxCount; i++) {
            question.push(
                <Hoc key={i}>

                    <QuestionForm index={i}  {...this.props} />
                </Hoc>
            )
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Hoc >
                {this.props.loading ?
                    <Skeleton active />
                    :
                    (!this.props.isAuthenticated ?
                        (<h1 style={{ textAlign: 'center' }}>Please SignUp</h1>)
                        :
                        (
                            <Hoc >
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <FormItem
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 15 }}
                                        label="Title"
                                        name="title">
                                        {getFieldDecorator("title", {
                                            rules: [
                                                { required: true, message: "Please input  Title!" }
                                            ]
                                        })(
                                            <Input

                                                placeholder=" Title"
                                            />
                                        )}
                                    </FormItem>
                                    {question}
                                    <Form.Item style={{ textAlign: '-webkit-right' }} wrapperCol={{ span: 18 }}>
                                        <Button

                                            type="dashed"
                                            disabled={question.length === 1}
                                            onClick={() => this.remove()}
                                            style={{ width: '30%' }}
                                        >
                                            <MinusOutlined /> Remove Question
</Button>
                                        <Button
                                            type="dashed"
                                            onClick={
                                                this.add
                                            }
                                            style={{ width: '30%', marginLeft: '5px' }}
                                        >
                                            <PlusOutlined /> Add Question
                                      </Button>

                                    </Form.Item>
                                    <FormItem>
                                        <Button
                                            type="danger"
                                            htmlType="submit"
                                            onClick={() => { this.props.form.resetFields() }}
                                            style={{ marginRight: "10px" }}

                                        >
                                            Reset Fields
                                        </Button>
                                        <Button
                                            type="primary"
                                            style={{ marginRight: "10px", float: "right" }}
                                        >
                                            <PlusOutlined /> Submit
                                        </Button>
                                    </FormItem>
                                </Form>

                            </Hoc>
                        )
                    )
                }
            </Hoc>

        );

    }
}

const WrappedNormalLoginForm = Form.create()(CreateAssignment);
const mapStateToProps = state => {
    console.log(state.auth.userId)
    return {
        token: state.auth.token,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        userId: state.auth.userId,
        username: state.auth.username,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        postAssignment: (assignment, token) =>
            dispatch(
                actions.postAssignment(assignment, token)
            )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)



