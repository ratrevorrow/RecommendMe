import React from "react";
import { client } from "../../util/axios";
import "./style.css";
import { Select, Table, Rate } from "antd";
import { Row, Col, Container } from "react-bootstrap";

const { Option } = Select;

const dataSource = [
    {
        key: "1",
        name: "Carolina Strawberry",
        date: "10/1/2017",
        rate: "4",
    },
    {
        key: "2",
        name: "Some Sorta Tripel",
        date: "10/2/2017",
        rate: "3",
    },
];

const columns = [
    {
        title: "Beername",
        dataIndex: "beername",
        key: "beername",
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
    },
];

export default class BeersTasted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beers: [],
        };
    }

    componentDidMount() {
        // client.get("get_checked_in_beers").then((res) => {

        // res.data.forEach(
        //     (beer) =>
        //         (beer.rating = (
        //             <Rate disabled allowHalf defaultValue={beer.rating} />
        //         ))
        // );
        //     console.log(res.data);
        //     this.setState({ beers: res.data });
        // });
        fetch("http://localhost:5000/users/get_tasted_beers")
            .then((response) => response.json())
            .then(
                (data) => {
                    data.forEach(
                        (beer) =>
                            (beer.rating = (
                                <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={beer.rating}
                                />
                            ))
                    );
                    this.setState({ beers: data });
                },
                (errResp) => console.error(errResp)
            );
    }
    render() {
        return (
            <div>
                <Table
                    bordered
                    dataSource={this.state.beers}
                    columns={columns}
                />
                ;
            </div>
        );
    }
}
