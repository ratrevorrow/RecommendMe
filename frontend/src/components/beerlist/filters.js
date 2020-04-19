


function Filters(props) {
    return (
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
    );
}

export default Filters;