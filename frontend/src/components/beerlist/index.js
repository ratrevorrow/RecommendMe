import React from "react";
import { client } from "../../util/axios";
import "./style.css";
import { Select, Checkbox } from "antd";
import { Row, Col, Container } from "react-bootstrap";
import Beers from "./beers";

const { Option } = Select;

export default class Beerlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beerlist: null,
            styles: null,
            stylesChosen: [],
            onlyNC: false,
            onlyDrafts: false,
            bottledCount: 0,
            draftCount: 0,
            cansCount: 0,
        };
        // this.onSelect = this.onSelect.bind(this);
        this.selectNC = this.selectNC.bind(this);
        this.selectDrafts = this.selectDrafts.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:5000/beerlist/get_everything")
            .then((response) => response.json())
            .then(
                (data) => {
                    this.setState({
                        beerlist: data.beerlist,
                        draftCount: data.drafts,
                        bottledCount: data.bottles,
                        cansCount: data.cans,
                    });
                },
                (errResp) => console.error(errResp)
            );

        // client.get("beerlist/get_everything").then(response => {
        //     var data = response.data;
        // this.setState({
        //     beerlist: data.beers,
        //     draftCount: data.drafts,
        //     bottledCount: data.bottles,
        //     cansCount: data.cans
        // });
        // });
    }

    // onSelect(value) {
    //     console.log(value);
    //     this.setState({ stylesChosen: value });
    // }

    selectNC() {
        this.setState({ onlyNC: !this.state.onlyNC });
    }

    selectDrafts() {
        this.setState({ onlyDrafts: !this.state.onlyDrafts });
    }

    render() {
        // TODO : FAVORITES W/ SAVE BUTTON
        // TODO : What are you in the mood for?? Have some key description words W/ SAVE BUTTON
        return (
            <>
                <div className="ta-center">
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

                            <br />

                            <Col
                                style={{
                                    display: "inline-block",
                                    padding: 10,
                                }}
                            >
                                {this.state.draftCount} Drafts
                            </Col>
                            <Col
                                style={{
                                    display: "inline-block",
                                    padding: 10,
                                }}
                            >
                                {this.state.cansCount} Cans
                            </Col>
                            <Col
                                style={{
                                    display: "inline-block",
                                    padding: 10,
                                }}
                            >
                                {this.state.bottledCount} Bottles
                            </Col>
                            <Col>
                                {this.state.cansCount +
                                    this.state.draftCount +
                                    this.state.bottledCount}{" "}
                                beers available
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div>
                    {this.state.beerlist && (
                        <Beers beerlist={this.state.beerlist} />
                    )}
                </div>
            </>
        );
    }
}
