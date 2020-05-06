import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/assignment';
import { Form, Input, Button, Icon, Divider, notification } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Hoc from '../hoc/hoc';
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
                        ],
                        initialValue: this.props.choice
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



class ChoiceForm1 extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Hoc {...formItemLayout}>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="Choice"
                >
                    {getFieldDecorator(`choiceadd${this.props.index}${this.props.item}`, {

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

class ChoiceForm2 extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Hoc {...formItemLayout}>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="Choice"
                >
                    {getFieldDecorator(`choiceaddagain${this.props.index}${this.props.item}`, {

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
        boxCount: 0
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
        const choicesForm = []
        const choicesForm1 = []
        for (let i = 0; i < (this.props.question.choice).length; i++) {
            choicesForm.push(
                <Hoc key={i}>
                    <ChoiceForm item={i} choice={this.props.question.choice[i]} {...this.props} />
                </Hoc>
            )
        }
        for (let i = 0; i < boxCount; i++) {
            choicesForm1.push(
                <Hoc key={i}>
                    <ChoiceForm1 item={i}  {...this.props} />
                </Hoc>
            )
        }
        const { getFieldDecorator } = this.props.form;
        const { question } = this.props
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
                        ],
                        initialValue: question.question
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
                        ],
                        initialValue: question.answer

                    })(
                        <Input

                            placeholder="Answer"
                        />
                    )}
                </FormItem>
                {choicesForm}
                {choicesForm1}
                <Form.Item style={{ textAlign: '-webkit-right' }} wrapperCol={{ span: 18 }}>
                    <Button

                        type="dashed"
                        // disabled={choices.length === 1}
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

class QuestionForm1 extends React.Component {
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
        const choicesForm2 = []
        for (let i = 0; i < boxCount; i++) {
            choicesForm2.push(
                <Hoc key={i}>
                    <ChoiceForm2 item={i}  {...this.props} />
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
                    {getFieldDecorator(`questionadd${this.props.index}`, {
                        rules: [
                            { required: true, message: "Please input Question!" }
                        ],

                    })
                        (
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
                    {getFieldDecorator(`answeradd${this.props.index}`, {
                        rules: [
                            { required: true, message: "Please input   Answer!" }
                        ]
                    })(
                        <Input

                            placeholder="Answer"
                        />
                    )}
                </FormItem>
                {choicesForm2}
                <Form.Item style={{ textAlign: '-webkit-right' }} wrapperCol={{ span: 18 }}>
                    <Button

                        type="dashed"
                        // disabled={choices.length === 1}
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











class EditAssignment extends React.Component {
    state = {
        boxCount: 0
    }
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
        if (Object.keys(this.props.assignment) > 0) {
            console.log(this.props.assignment)
        }
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
        let id = this.props.match.params.id
        this.props.form.validateFields((err, values) => {
            console.log(values)

            const data = {
                assignment: values,
                teacher: this.props.username,
                userId: this.props.userId,

            }
            console.log(data)
            if (!err) {
                localStorage.setItem('assignmentTitle', JSON.stringify(values.title))
                this.props.editDetailAssignment(data, this.props.token, id)
                console.log('route')
                this.props.history.push('/admin')
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;


        console.log(this.props.assignment)
        const { assignment } = this.props
        const { questions } = assignment


        const questionForm = []
        const questionForm1 = []
        if (Object.keys(assignment).length > 0) {
            for (let i = 0; i < (questions).length; i++) {
                questionForm.push(
                    <Hoc key={i}>

                        <QuestionForm index={i} question={questions[i]} {...this.props} />
                    </Hoc>
                )
            }
            for (let i = 0; i < this.state.boxCount; i++) {
                questionForm1.push(
                    <Hoc key={i}>

                        <QuestionForm1 index={i}  {...this.props} />
                    </Hoc>
                )
            }

        }
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
                                <p>this is page edit</p>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <FormItem
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 15 }}
                                        label="Title"
                                        name="title"


                                    >
                                        {getFieldDecorator("title", {
                                            rules: [
                                                { required: true, message: "Please input  Title!" }
                                            ],
                                            initialValue: assignment.title,
                                        })(
                                            <Input

                                                placeholder=" Title"
                                            />
                                        )}
                                    </FormItem>
                                    {questionForm}
                                    {questionForm1}
                                    <Form.Item style={{ textAlign: '-webkit-right' }} wrapperCol={{ span: 18 }}>
                                        <Button

                                            type="dashed"
                                            disabled={questionForm1.length === 0}
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

                                            onClick={() => { this.props.form.resetFields() }}


                                        >
                                            Reset Fields
                                        </Button>
                                        <Button
                                            // onClick={this.openNotification}
                                            htmlType="submit"
                                            type="primary"
                                            style={{ float: "right" }}
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
const WrappedNormalEditAssignment = Form.create()(EditAssignment);
const mapDispatchToProps = dispatch => {
    return {
        getDetailAssignment: (token, id) =>
            dispatch(
                actions.getDetailAssignment(token, id)
            ),
        editDetailAssignment: (userAnswer, token, id) =>
            dispatch(actions.editDetailAssignment(userAnswer, token, id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalEditAssignment);