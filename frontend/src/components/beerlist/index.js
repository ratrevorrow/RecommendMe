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
    }

    componentDidMount() {
        this.props.getAll();
        this.setState({ beerlist: this.props.beerlist });
    }

    onNCChange() {
        this.setState({
            isNC: !this.state.isNC,
        });
        // const { beerlist } = this.props;
        // if (this.state.isNC) {
        //     this.setState({ beerlist: beerlist.filter((beer) => beer.isNC) });
        // }
    }

    render() {
        // TODO : FAVORITES W/ SAVE BUTTON
        // TODO : What are you in the mood for?? Have some key description words W/ SAVE BUTTON
        const { beerlist } = this.props;

        let beers = beerlist
            ? beerlist
                  .filter((beer) => (this.state.isNC ? beer.isNC : true))
                  .filter((beer) =>
                      this.state.includeOnly.length > 0 ? this.state.includeOnly.includes(beer.container) : true
                  )
            : [];

        let drafts = 0;
        let cans = 0;
        let bottles = 0;
        let flights = 0;

        for (let beer of beers) {
            if (beer.container === "bottled") bottles++;
            else if (beer.container === "draught") drafts++;
            else if (beer.container === "can") cans++;
            else flights++;
        }

        const total = drafts + cans + bottles + flights;

        return (
            <div>
                <>
                    <div className='ta-center'>
                        <AppBar position='relative' color='default' style={{ zIndex: 50 }}>
                            <Toolbar>
                                <Space size={30}>
                                    <FormGroup row>
                                        <Space size={15}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.isNC}
                                                        onChange={this.onNCChange}
                                                        name='isNC'
                                                        color='primary'
                                                    />
                                                }
                                                label='NC Only'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Select
                                                        labelId='demo-mutiple-name-label'
                                                        id='demo-mutiple-name'
                                                        multiple
                                                        value={this.state.includeOnly}
                                                        onChange={(e) =>
                                                            this.setState({
                                                                includeOnly: e.target.value,
                                                            })
                                                        }
                                                        input={<Input />}
                                                        MenuProps={MenuProps}
                                                    >
                                                        <MenuItem key='drafts' value='draught'>
                                                            Drafts
                                                        </MenuItem>
                                                        <MenuItem key='bottles' value='bottled'>
                                                            Bottles
                                                        </MenuItem>
                                                        <MenuItem key='cans' value='can'>
                                                            Cans
                                                        </MenuItem>
                                                        <MenuItem key='flights' value='flight'>
                                                            Flights
                                                        </MenuItem>
                                                    </Select>
                                                }
                                                label='Include Only'
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Container fluid>
                                                        <Row>
                                                            <Col
                                                                style={{
                                                                    display: drafts > 0 ? "inline-block" : "none",
                                                                    padding: 10,
                                                                }}
                                                            >
                                                                {drafts} Drafts
                                                            </Col>
                                                            <Col
                                                                style={{
                                                                    display: cans > 0 ? "inline-block" : "none",
                                                                    padding: 10,
                                                                }}
                                                            >
                                                                {cans} Cans
                                                            </Col>
                                                            <Col
                                                                style={{
                                                                    display: bottles > 0 ? "inline-block" : "none",
                                                                    padding: 10,
                                                                }}
                                                            >
                                                                {bottles} Bottles
                                                            </Col>
                                                            <Col
                                                                style={{
                                                                    display: flights > 0 ? "inline-block" : "none",
                                                                    padding: 10,
                                                                }}
                                                            >
                                                                {flights} Flights
                                                            </Col>
                                                            <Col
                                                                style={{
                                                                    display: total > 0 ? "inline-block" : "none",
                                                                    padding: 10,
                                                                    fontWeight: "bold"
                                                                }}
                                                            >
                                                                {total} Beers Available
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                }
                                                style={{ cursor: "default" }}
                                                label=''
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
                            textAlign: beers.length === 0 ? "center" : "left",
                        }}
                    >
                        {beerlist ? (
                            <Beers beerlist={beers} />
                        ) : (
                            <Spin
                                indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />}
                                style={{
                                    marginTop: 200,
                                }}
                            />
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
        return { ...alldata };
    }
    return { pending, error };
}

const actionCreators = {
    getAll: userActions.getAll,
};

export default connect(mapState, actionCreators)(Beerlist);
