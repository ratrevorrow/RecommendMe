import React from "react";
import "./style.css";
import { Spin, Space } from "antd";
import { Row, Col, Container } from "react-bootstrap";
import Beers from "./beers";
import { userActions } from "../../store/actions/user";
import { connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import {
    AppBar,
    Toolbar,
    Switch,
    FormGroup,
    FormControlLabel,
    Select,
    Input,
    MenuItem,
} from "@material-ui/core";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

/**
 * Todo: Scroll to top button
 */
class Beerlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beerlist: this.props.beerlist,
            isNC: false,
            bottles: 0,
            drafts: 0,
            cans: 0,
            includeOnly: [],
        };
        this.onNCChange = this.onNCChange.bind(this);
        this.onContainerChange = this.onContainerChange.bind(this);
    }

    componentDidMount() {
        const { getAll } = this.props;
        getAll();
    }

    onNCChange() {
        this.setState({
            isNC: !this.state.isNC,
        });
        const { beerlist } = this.props;
        if (this.state.isNC) {
            this.setState({ beerlist: beerlist.filter((beer) => beer.isNC) });
        }
    }

    onContainerChange(e) {
        const includeOnly = e.target.value;
        const { beerlist } = this.props;
        if (includeOnly.length > 0) {
            this.setState({
                beerlist: beerlist.filter((beer) =>
                    this.state.includeOnly.includes(beer.container)
                ),
            });
        }
    }

    render() {
        // TODO : FAVORITES W/ SAVE BUTTON
        // TODO : What are you in the mood for?? Have some key description words W/ SAVE BUTTON
        const { drafts, bottles, cans } = this.props;
        const total = cans + drafts + bottles;
        const spin = <Spin indicator={antIcon} />;
        return (
            <div>
                <>
                    <div className="ta-center">
                        <AppBar
                            position="relative"
                            color="default"
                            style={{ zIndex: 50 }}
                        >
                            <Toolbar>
                                <Space size={30}>
                                    <FormGroup row>
                                        <Space size={15}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={
                                                            this.state.isNC
                                                        }
                                                        onChange={
                                                            this.onNCChange
                                                        }
                                                        name="isNC"
                                                        color="primary"
                                                    />
                                                }
                                                label="NC Only"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Select
                                                        labelId="demo-mutiple-name-label"
                                                        id="demo-mutiple-name"
                                                        multiple
                                                        value={
                                                            this.state
                                                                .includeOnly
                                                        }
                                                        onChange={
                                                            this
                                                                .onContainerChange
                                                        }
                                                        input={<Input />}
                                                        MenuProps={MenuProps}
                                                    >
                                                        <MenuItem
                                                            key="drafts"
                                                            value="draught"
                                                        >
                                                            Drafts
                                                        </MenuItem>
                                                        <MenuItem
                                                            key="bottles"
                                                            value="bottled"
                                                        >
                                                            Bottles
                                                        </MenuItem>
                                                        <MenuItem
                                                            key="cans"
                                                            value="can"
                                                        >
                                                            Cans
                                                        </MenuItem>
                                                        <MenuItem
                                                            key="flights"
                                                            value="flight"
                                                        >
                                                            Flights
                                                        </MenuItem>
                                                    </Select>
                                                }
                                                label="Include Only"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Container fluid>
                                                        <Row>
                                                            <Col
                                                                style={{
                                                                    display:
                                                                        "inline-block",
                                                                    padding: 10,
                                                                }}
                                                            >
                                                                {!drafts
                                                                    ? spin
                                                                    : drafts}{" "}
                                                                Drafts
                                                            </Col>
                                                            <Col
                                                                style={{
                                                                    display:
                                                                        "inline-block",
                                                                    padding: 10,
                                                                }}
                                                            >
                                                                {!cans
                                                                    ? spin
                                                                    : cans}{" "}
                                                                Cans
                                                            </Col>
                                                            <Col
                                                                style={{
                                                                    display:
                                                                        "inline-block",
                                                                    padding: 10,
                                                                }}
                                                            >
                                                                {!bottles
                                                                    ? spin
                                                                    : bottles}{" "}
                                                                Bottles
                                                            </Col>
                                                            <Col
                                                                style={{
                                                                    display:
                                                                        "inline-block",
                                                                    padding: 10,
                                                                }}
                                                            >
                                                                {!total
                                                                    ? spin
                                                                    : total}{" "}
                                                                Beers Available
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                }
                                                label=""
                                            />
                                        </Space>
                                    </FormGroup>
                                </Space>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <div
                        style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                            textAlign: !this.state.beerlist ? "center" : "left",
                        }}
                    >
                        {!this.state.beerlist ? (
                            <Spin
                                indicator={
                                    <LoadingOutlined
                                        style={{ fontSize: 80 }}
                                        spin
                                    />
                                }
                                style={{
                                    marginTop: 200,
                                }}
                            />
                        ) : (
                            <Beers beerlist={this.state.beerlist} />
                        )}
                    </div>
                </>
            </div>
        );
    }
}

function mapState(state) {
    const { alldata, pending, error } = state.beerlist;
    if (alldata) {
        const { beerlist, bottles, cans, drafts } = alldata;
        return { beerlist, bottles, cans, drafts, pending, error };
    }
    return { pending, error };
}

const actionCreators = {
    getAll: userActions.getAll,
};

export default connect(mapState, actionCreators)(Beerlist);
