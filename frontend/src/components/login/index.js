import React from "react";
import { Popover, Button } from "antd";
import LoginForm from "./loginform";
import { connect } from "react-redux";
import Texty from "rc-texty";
// const {  UserOutlined, LockOutlined  } = icons;

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginDisplay: "Login",
        };
        this.wrapTexty = this.wrapTexty.bind(this);
    }

    wrapTexty = txt => <Texty type="left" mode="smooth">{txt}</Texty>;

    render() {
        const { user } = this.props;
        return (
            <>
                <Popover
                    placement="leftTop"
                    content={<LoginForm />}
                    title=""
                    trigger="click"
                >
                    <Button
                        onMouseEnter={() =>
                            this.setState({ loginDisplay: this.wrapTexty("Logout") })
                        }
                        onMouseLeave={() =>
                            this.setState({
                                loginDisplay: this.wrapTexty(user ? user : "Login"),
                            })
                        }
                    >
                        {this.wrapTexty(user ? user : "Login")}
                    </Button>
                </Popover>
            </>
        );
    }
}

function mapState(state) {
    const { pending, success, error, user } = state.authentication;
    return { pending, success, error, user };
}

// const actionCreators = {
//     login: userActions.login,
// };

export default connect(mapState)(Login);
