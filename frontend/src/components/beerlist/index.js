import React from "react";
import "./style.css";
import { Checkbox } from "antd";
import { Row, Col, Container } from "react-bootstrap";
import Beers from "./beers";
import { userActions } from "../../store/actions/user";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";

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
        const { pending, beerlist, drafts, bottles, cans } = this.props;
        return (
            <div>
                {pending ? (
                    <div>loading</div> // TODO: https://material-ui.com/components/backdrop/
                ) : (
                    <>
                        <div className="ta-center">
                            <Paper
                                elevation={7}
                                style={{ display: "block", width: "100%" }}
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
                                            <Checkbox
                                                onChange={this.selectDrafts}
                                            >
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
                                            {drafts} Drafts
                                        </Col>
                                        <Col
                                            style={{
                                                display: "inline-block",
                                                padding: 10,
                                            }}
                                        >
                                            {cans} Cans
                                        </Col>
                                        <Col
                                            style={{
                                                display: "inline-block",
                                                padding: 10,
                                            }}
                                        >
                                            {bottles} Bottles
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {cans + drafts + bottles} beers
                                            available
                                        </Col>
                                    </Row>
                                </Container>
                            </Paper>
                        </div>
                        <div>{beerlist && <Beers beerlist={beerlist} />}</div>
                    </>
                )}
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
