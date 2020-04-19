import React from "react";
import "./style.css";
import { Tabs, Table, Rate } from "antd";
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from "recharts";

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
        };
    }

    componentDidMount() {
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
        /**
         * Replace name with date
         * replace uv and pv keys with beer styles
         *      replace values with count of beer style for that day
         */
        const data = [
            {
                name: "Page A",
                uv: 4000,
                pv: 2400,
                amt: 2400,
            },
            {
                name: "Page B",
                uv: 3000,
                pv: 1398,
                amt: 2210,
            },
            {
                name: "Page C",
                uv: 2000,
                pv: 9800,
                amt: 2290,
            },
            {
                name: "Page D",
                uv: 2780,
                pv: 3908,
                amt: 2000,
            },
            {
                name: "Page E",
                uv: 1890,
                pv: 4800,
                amt: 2181,
            },
            {
                name: "Page F",
                uv: 2390,
                pv: 3800,
                amt: 2500,
            },
            {
                name: "Page G",
                uv: 3490,
                pv: 4300,
                amt: 2100,
            },
        ];
        return (
            <div>
                {/* TODO: 2 Tabs: 1 for table, 1 for graph showing beers had in the past x amount of time */}
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
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
                            <span>
                                {/* Add graph icon */}
                                {/* <AndroidOutlined /> */}
                                Graph
                                {/* https://recharts.org/en-US/api/LineChart */}
                                
                            </span>
                        }
                        key="2"
                    >
                        <LineChart
                                    width={730}
                                    height={250}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {/* #styles == #line */}
                                    <Line
                                        type="monotone"
                                        dataKey="IPA"
                                        stroke="#8884d8"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="Stout"
                                        stroke="#82ca9d"
                                    />
                                </LineChart>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
