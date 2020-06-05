import React from "react";
import { Menu, Layout } from "antd";
import { Switch, Route, Link } from "react-router-dom";
import Welcome from "../welcome/index";
import Beerlist from "../beerlist/index";
import BeersTasted from "../tasted/index";
import Login from "../login/index";
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #F44336
const { Header } = Layout;

// TODO: implement dark mode option
// TODO: Make mobile friendly: https://material-ui.com/components/app-bar/ 
export default class Navbar extends React.Component {
    state = {
        current: "welcome",
    };

    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        // console.log("click ", e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <>
                <Layout>
                    <Header style={{backgroundColor: 'white'}}>
                        <div className="logo" />
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                            theme="light"
                            style={{ lineHeight: "64px" }}
                        >
                            <Menu.Item key="welcome">
                                <Link to="/">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/beerlist">Beerlist</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/tasted">Beers Tasted</Link>
                            </Menu.Item>

                            <div style={{float: 'right'}}>
                                <Login />
                            </div>
                        </Menu>
                    </Header>
                </Layout>

                <Switch>
                    <Route exact path="/">
                        <Welcome />
                    </Route>
                    <Route path="/beerlist">
                        <Beerlist />
                    </Route>
                    <Route path="/tasted">
                        <BeersTasted />
                    </Route>
                    {/* <Route path="/dashboard">
                        <Dashboard />
                    </Route> */}
                </Switch>
            </>
        );
    }
}
