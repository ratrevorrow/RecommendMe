import React from "react";
import { List } from "antd";
import Beer from "./beer";

import "./style.css";

export default function Beers({ beerlist }) {
    return (
        <List
            itemLayout="horizontal"
            dataSource={beerlist}
            renderItem={(beer) => <Beer beer={beer} />}
        />
    );
}
