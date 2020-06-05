import React from "react";
import { Form, Input, Checkbox, message } from "antd";
import "./style.css";
import { userActions } from "../../store/actions/user";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { LockOpen, PersonAdd } from "@material-ui/icons";

/**
 * Todo: separate this into registration and login forms
 */
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisterClicked: false,
        };
        this.onFinish = this.onFinish.bind(this);
    }

    componentDidUpdate = () => {
        // TODO: refactor
        const { success, error } = this.props;
        if (success) message.success(success, 4);
        if (error) message.error(error, 4);
    };

    onFinish = (values) => {
        console.log(
            this.state.isRegisterClicked ? `registering` : `logging in`
        );
        this.state.isRegisterClicked
            ? this.props.register(values)
            : this.props.login(values);
    };

    render() {
        // const { pending } = this.props;

        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: false,
                    username: "randomuser1",
                    email: "testing@gmail.com",
                    password: "testing1234",
                }}
                style={{zIndex: 999999}}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username",
                        },
                    ]}
                >
                    <Input
                        // prefix={
                        //     <UserOutlined className="site-form-item-icon" />
                        // }
                        placeholder="Username"
                    />
                </Form.Item>
                {this.state.isRegisterClicked ? (
                    <Form.Item
                        name="email"
                        // label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email address",
                                type: "email",
                            },
                        ]}
                    >
                        <Input type="email" placeholder="Email" />
                    </Form.Item>
                ) : (
                    <></>
                )}
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password",
                        },
                    ]}
                >
                    <Input
                        // prefix={
                        //     <LockOutlined className="site-form-item-icon" />
                        // }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                {this.state.isRegisterClicked ? (
                    <></>
                ) : (
                    // TODO
                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>
                )}
                <Form.Item>
                    <Button
                        type="submit"
                        variant="contained"
                        color={"primary"}
                        endIcon={this.state.isRegisterClicked ? <PersonAdd /> : <LockOpen />}
                        className="login-form-button"
                    >
                        {this.state.isRegisterClicked ? "Register" : "Log in"}
                    </Button>
                    Or{" "}
                    <a
                        onClick={() =>
                            this.setState({
                                isRegisterClicked: !this.state
                                    .isRegisterClicked,
                            })
                        }
                    >
                        {this.state.isRegisterClicked
                            ? "Log in"
                            : "Register now!"}
                    </a>
                </Form.Item>
            </Form>
        );
    }
}

function mapState(state) {
    const { pending, success, error } = state.registration;
    return { pending, success, error };
}

const actionCreators = {
    register: userActions.register,
    login: userActions.login,
};

export default connect(mapState, actionCreators)(LoginForm);
