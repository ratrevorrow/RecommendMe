import React from "react";
import { Popover } from "antd";
import LoginForm from "./loginform";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "@material-ui/core";
import { AccountCircle, LockOpen } from "@material-ui/icons";
import { userActions } from "../../store/actions/user";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.Logout = this.Logout.bind(this);
    }

    Logout() {
        return (
            <ButtonGroup
                orientation="vertical"
                color="primary"
                aria-label="vertical outlined primary button group"
            >
                <Button
                    variant="contained"
                    onClick={() => this.props.logout()}
                >
                    Logout
                </Button>
            </ButtonGroup>
        );
    }

    render() {
        const { user } = this.props;
        return (
            <>
                <Popover
                    placement="leftTop"
                    content={user ? <this.Logout /> : <LoginForm />}
                    title=""
                    trigger="click"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={!user && <LockOpen />}
                    >
                        {user ? <AccountCircle /> : "Login"}
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

const actionCreators = {
    logout: userActions.logout,
};

export default connect(mapState, actionCreators)(Login);
