import React from "react";
import { Menu, Layout } from "antd";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import Welcome from "../welcome/index";
import Beerlist from "../beerlist/index";
import BeersTasted from "../tasted/index";
import Login from "../login/index";
import { connect } from "react-redux";

const { Header } = Layout;

// TODO: implement dark mode option
// TODO: Make mobile friendly: https://material-ui.com/components/app-bar/
class Navbar extends React.Component {
    state = {
        current: "1",
    };

    constructor(props) {
        super(props);
        const pathname = window.location.pathname;
        this.setState({
            current:
                pathname === "/beerlist"
                    ? "2"
                    : pathname === "/tasted"
                    ? "3"
                    : "1",
        });
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    };

    render() {
        const { user } = this.props;
        return (
            <>
                <Layout>
                    <Header style={{ backgroundColor: "white" }}>
                        <div className="logo" />
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                            theme="light"
                            style={{ lineHeight: "64px" }}
                        >
                            <Menu.Item key="1">
                                <Link to="/">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/beerlist">Beerlist</Link>
                            </Menu.Item>
                            {user && (
                                <Menu.Item key="3">
                                    <Link to="/tasted">Beers Tasted</Link>
                                </Menu.Item>
                            )}

                            <div style={{ float: "right" }}>
                                <Login />
                            </div>
                        </Menu>
                    </Header>
                </Layout>

                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/beerlist" component={Beerlist} />
                    <Route path="/tasted" component={BeersTasted} />
                </Switch>
            </>
        );
    }
}

function mapState(state) {
    const { user } = state.authentication;
    return { user };
}

export default connect(mapState)(Navbar);
