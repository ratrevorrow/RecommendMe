import React, { useState, useEffect } from "react";
import { Menu, Layout } from "antd";
import { Switch, Route, Link, useHistory, useLocation } from "react-router-dom";
import Welcome from "../welcome/index";
import Beerlist from "../beerlist/index";
import BeersTasted from "../tasted/index";
import Login from "../login/index";
import { connect } from "react-redux";

import "./style.css";

const { Header } = Layout;

const navItems = [
    { key: "1", label: "RecommendME", path: "/", show: true },
    { key: "2", label: "Beerlist", path: "/beerlist", show: true },
    { key: "3", label: "Beers Tasted", path: "/tasted", show: false },
];

// TODO: implement dark mode option
// TODO: Make mobile friendly: https://material-ui.com/components/app-bar/
const Navbar = ({ user }) => {
    const location = useLocation();
    const history = useHistory();
    const [current, setCurrent] = useState(navItems.find((item) => location.pathname.startsWith(item.path)).key);

    const onClickMenu = (_item) => history.push(navItems.find((item) => item.key === _item.key));

    useEffect(() => {
        setCurrent(navItems.find((item) => location.pathname === item.path).key);
    }, [location]);

    navItems[2].show = user ? "true" : false;

    return (
        <>
            <Layout>
                <Header style={{ backgroundColor: "white" }}>
                    {/* <div className='logo' /> */}
                    <Menu
                        onClick={onClickMenu}
                        selectedKeys={[current]}
                        mode='horizontal'
                        theme='light'
                        className='lh-64'
                    >
                        {navItems.map(
                            (item) =>
                                item.show && (
                                    <Menu.Item key={item.key}>
                                        <Link to={item.path}>{item.label}</Link>
                                    </Menu.Item>
                                )
                        )}

                        <div className='float-right'>
                            <Login />
                        </div>
                    </Menu>
                </Header>
            </Layout>

            <Switch>
                <Route exact path='/' component={Welcome} />
                <Route path='/beerlist' component={Beerlist} />
                <Route path='/tasted' component={BeersTasted} />
            </Switch>
        </>
    );
};

export default connect((state) => ({ ...state.authentication }))(Navbar);
