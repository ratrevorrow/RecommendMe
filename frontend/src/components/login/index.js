import React from "react";
import { Popover, Button } from "antd";
import LoginForm from "./loginform";
// const {  UserOutlined, LockOutlined  } = icons;

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Popover
                    placement="leftTop"
                    content={<LoginForm />}
                    title=""
                    trigger="click"
                >
                    <Button>Login</Button>
                </Popover>
            </>
        );
    }
}
