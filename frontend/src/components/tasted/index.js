import React from "react";
import "./style.css";
import { Tabs, Table, Rate } from "antd";
import {
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Bar,
    BarChart,
} from "recharts";

// const { AppleOutlined, AndroidOutlined } = icons;
const { TabPane } = Tabs;

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
            data: [],
            graphdata: null,
            lines: null,
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/users/get_tasted_beers")
            .then((response) => response.json())
            .then(
                (data) => {
                    data.beers.forEach(
                        (beer, idx) =>
                            (beer.rating = (
                                <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={parseFloat(beer.rating)}
                                    key={idx}
                                />
                            ))
                    );
                    this.setState({
                        beers: data.beers,
                        graphdata: data.graphdata,
                    });
                },
                (errResp) => console.error(errResp)
            );
    }
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span style={{ padding: 10 }} key="1">
                                {/* Add table icon */}
                                {/* <AppleOutlined /> */}
                                Table
                            </span>
                        }
                        key="1"
                    >
                        <Table
                            bordered
                            dataSource={this.state.beers}
                            columns={columns}
                        />
                    </TabPane>
                    <TabPane
                        tab={
                            <span style={{ padding: 10 }} key="2">
                                {/* Add graph icon */}
                                {/* <AndroidOutlined /> */}
                                Graph
                            </span>
                        }
                        key="2"
                    >
                        <BarChart
                            width={730}
                            height={250}
                            data={this.state.graphdata}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            {/* <Legend /> */}
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
