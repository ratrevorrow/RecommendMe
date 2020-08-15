import React from "react";
import "./style.css";
import { Tabs, Table, Rate } from "antd";
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart } from "recharts";
import { userActions } from "../../store/actions/user";
import { connect } from "react-redux";

// const { AppleOutlined, AndroidOutlined } = icons;
const { TabPane } = Tabs;

const columns = [
	{
		title: "Beer name",
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

class BeersTasted extends React.Component {
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
		this.props.getTastedBeers();
	}

	render() {
		let beersTasted = null;
		let graphs = null;
		if (this.props.data) {
			let { beers, graphdata } = this.props.data;
			beers.forEach(
				(beer, idx) =>
					(beer.rating = <Rate disabled allowHalf defaultValue={parseFloat(beer.rating)} key={idx} />)
			);
			beersTasted = beers.reverse();
			graphs = graphdata;
		}
		// let graphs = this.props.data ? ({ graphdata } = this.props.data) : null;
		return (
			<div>
				<Tabs defaultActiveKey='1'>
					<TabPane
						tab={
							<span style={{ padding: 10 }} key='1'>
								{/* Add table icon */}
								{/* <AppleOutlined /> */}
								Table
							</span>
						}
						key='1'>
						<Table bordered dataSource={beersTasted} columns={columns} />
					</TabPane>
					<TabPane
						tab={
							<span style={{ padding: 10 }} key='2'>
								{/* Add graph icon */}
								{/* <AndroidOutlined /> */}
								Graph
							</span>
						}
						key='2'>
						<BarChart width={730} height={250} data={graphs}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='name' />
							<YAxis />
							<Tooltip />
							{/* <Legend /> */}
							<Bar dataKey='count' fill='#8884d8' />
						</BarChart>
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

// state, create
export default connect(state => ({ ...state.getTastedBeers }), { getTastedBeers: userActions.getTastedBeers })(
	BeersTasted
);
