import React, { useState, useEffect } from "react";
import { Card, Avatar, Button, Modal, List } from "antd";
import bottle from "../../resources/bottle.jpeg";
import pint from "../../resources/pint.jpeg";
import can from "../../resources/can.jpeg";
import { client } from "../../util/axios";
import Beer from './beer';

import "./style.css";

const { Meta } = Card;

/**
 *  brew_id: "17368796"
    brewer: "Deep River Brewing"
    city: "Clayton, NC"
    container: "bottled"
    country: "United States"
    description: "<p>This is a sweet stout brewed with generous amounts of freshly ground cocoa, chocolate malt and cocoa nibs from North Carolina chocolatiers. Espresso notes, dark chocolate, hints of tobacco, and roasted coffee beans are all in the mix. 5.3% ABV.</p>
    name: "Deep River 4042 Stout (CAN)"
    reviews: "0"
    stars: 0
    store_id: "13877"
    style: "American Stout"
 */

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
                        renderItem={(beer) => (
                            <Beer beer={beer}/>
                        )}
                    />
                </>
            )
        );
    }
}
