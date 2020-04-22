import Ract from 'react';
import { Form, Input, Icon, Button } from 'antd';
const FormItem = Form.Item
let id = 0;
class CreateAssignment extends React.Component {
    state = {
        boxCount: 1
    }

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(++id);
        form.setFieldValue({
            keys: nextKeys
        })
    }
    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) return;
        form.setFieldValue({
            keys: Keys.filter(key => key != k)
        })
    }

    render() {

        const { boxCount } = this.state;
        const question = []
        for (let i = 0; i < boxCount; i++) {

        }
        const { getFieldDecorator, getFieldValue } = this.props.form;
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
                                        label={index==0?"Choices"}
                                        name="title">
                                        {getFieldDecorator("title", {
                                            rules: [
                                                { required: true, message: "Please input your Assignment Title!" }
                                            ]
                                        })(
                                            <Input

                                                placeholder="Assignment Title"
                                            />
                                        )}
                                    </FormItem>
                                    {question}
                                    <Form.Item style={{ textAlign: '-webkit-right' }} wrapperCol={{ span: 18 }}>
                                        <Button
                                            type="dashed"
                                            onClick={
                                                this.add
                                            }
                                            style={{ width: '60%' }}
                                        >
                                            <PlusOutlined /> Add Question
                                      </Button>
                                    </Form.Item>
                                    <FormItem>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            style={{ marginRight: "10px" }}
                                        >
                                            Login
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



export default QuestionForm;

