import React from "react";
import "./style.css";
import { Checkbox, Spin } from "antd";
import { Row, Col, Container } from "react-bootstrap";
import Beers from "./beers";
import { userActions } from "../../store/actions/user";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

/**
 * Todo: Scroll to top button
 */
class Beerlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beerlist: null,
            styles: null,
            stylesChosen: [],
            onlyNC: false,
            onlyDrafts: false,
            bottles: 0,
            drafts: 0,
            cans: 0,
        };
        this.selectNC = this.selectNC.bind(this);
        this.selectDrafts = this.selectDrafts.bind(this);
    }

    componentDidMount() {
        const { getAll } = this.props;
        getAll();
    }

    selectNC() {
        this.setState({ onlyNC: !this.state.onlyNC });
    }

    selectDrafts() {
        this.setState({ onlyDrafts: !this.state.onlyDrafts });
    }

    render() {
        // TODO : FAVORITES W/ SAVE BUTTON
        // TODO : What are you in the mood for?? Have some key description words W/ SAVE BUTTON
        const { beerlist, drafts, bottles, cans } = this.props;
        const total = cans + drafts + bottles;
        const spin = <Spin indicator={antIcon} />;
        return (
            <div>
                <>
                    <div className="ta-center">
                        <Paper
                            elevation={7}
                            style={{
                                display: "block",
                                width: "100%",
                                paddingBottom: 15,
                            }}
                        >
                            <Container fluid>
                                <Row noGutters>
                                    <Col
                                        style={{
                                            display: "inline-block",
                                            padding: 10,
                                        }}
                                    ></Col>
                                    <Col
                                        style={{
                                            display: "inline-block",
                                            padding: 10,
                                        }}
                                    >
                                        <Checkbox onChange={this.selectNC}>
                                            NC Pints only
                                        </Checkbox>
                                    </Col>
                                    <Col
                                        style={{
                                            display: "inline-block",
                                            padding: 10,
                                        }}
                                    >
                                        <Checkbox onChange={this.selectDrafts}>
                                            Drafts only
                                        </Checkbox>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col
                                        style={{
                                            display: "inline-block",
                                            padding: 10,
                                        }}
                                    >
                                        {!drafts ? spin : drafts} Drafts
                                    </Col>
                                    <Col
                                        style={{
                                            display: "inline-block",
                                            padding: 10,
                                        }}
                                    >
                                        {!cans ? spin : cans} Cans
                                    </Col>
                                    <Col
                                        style={{
                                            display: "inline-block",
                                            padding: 10,
                                        }}
                                    >
                                        {!bottles ? spin : bottles} Bottles
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {!total ? spin : total} Beers Available
                                    </Col>
                                </Row>
                            </Container>
                        </Paper>
                    </div>
                    <div
                        style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                            textAlign: !beerlist ? 'center' : 'left'
                        }}
                    >
                        {!beerlist ? (
                            <Spin
                                indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />}
                                style={{
                                    marginTop: 200
                                }}
                            />
                        ) : (
                            <Beers beerlist={beerlist} />
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
