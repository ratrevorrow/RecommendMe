import React from "react";
import { List } from "antd";
import Beer from "./beer";

import "./style.css";

export default class Beers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beerlist: null,
        };
    }

    componentDidMount() {
        this.setState({ beerlist: this.props.beerlist });
    }

    render() {
        return (
            this.state.beerlist && (
                <>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.beerlist}
                        renderItem={(beer) => <Beer beer={beer} />}
                    />
                </>
            )
        );
    }
}
