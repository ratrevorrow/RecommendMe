import React, { useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import "./style.css";
import { userActions } from "../../store/actions/user";
import { connect } from "react-redux";

/**
 * Todo: separate this into registration and login forms
 */
function LoginForm(props) {
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);

    const onFinish = (values) => {
        console.log(`registering/logging in`);
        isRegisterClicked ? props.register(values) : props.login(values);
    };

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
            onFinish={onFinish}
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
            {isRegisterClicked ? (
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
            {isRegisterClicked ? (
                <></>
            ) : (
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>
            )}
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={props.registering}
                    // style={{backgroundColor: 'red', borderColor: 'red'}}
                >
                    {isRegisterClicked ? "Register" : "Log in"}
                </Button>
                Or{" "}
                <a onClick={() => setIsRegisterClicked(!isRegisterClicked)}>
                    {isRegisterClicked ? "Log in" : "Register now!"}
                </a>
            </Form.Item>
        </Form>
    );
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register,
    login: userActions.login,
};

export default connect(mapState, actionCreators)(LoginForm);
