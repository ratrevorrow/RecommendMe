import React from "react";
import "./style.css";
import { Spin, Space } from "antd";
import { Row, Col, Container } from "react-bootstrap";
import Beers from "./beers";
import { userActions } from "../../store/actions/user";
import { connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import {
	AppBar,
	Toolbar,
	Switch,
	FormGroup,
	FormControlLabel,
	Select,
	Input,
	MenuItem,
	TextField,
} from "@material-ui/core";
import { MENU_PROPS } from "./constants";

/**
 * Todo: Scroll to top button
 */
class Beerlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			beerlist: this.props.beerlist,
			isNC: false,
			includeOnly: [],
			search: "",
		};
	}

	componentDidMount() {
		this.props.getAll();
	}

	render() {
		// TODO : FAVORITES W/ SAVE BUTTON
		// TODO : What are you in the mood for?? Have some key description words W/ SAVE BUTTON
		const { beerlist } = this.props;
		console.log(this.state.search);
		// TODO : refactor
		let beers = beerlist
			? beerlist
					.filter(beer => (this.state.isNC ? beer.isNC : true))
					.filter(beer =>
						this.state.includeOnly.length > 0 ? this.state.includeOnly.includes(beer.container) : true
					)
					.filter(beer =>
						this.state.search.length > 0 ? beer.name.toLowerCase().includes(this.state.search) : true
					)
			: [];

		let drafts = 0;
		let cans = 0;
		let bottles = 0;
		let flights = 0;

		for (let beer of beers) {
			if (beer.container === "bottled") bottles++;
			else if (beer.container === "draught") drafts++;
			else if (beer.container === "can") cans++;
			else flights++;
		}

		const total = drafts + cans + bottles + flights;

		return (
			<div>
				<div className='ta-center'>
					<AppBar position='relative' color='default' style={{ zIndex: 50 }}>
						<Toolbar>
							<Space size={30}>
								<FormGroup row>
									<Space size={15}>
										{/* NC only */}
										<FormControlLabel
											control={
												<Switch
													checked={this.state.isNC}
													onChange={() =>
														this.setState({
															isNC: !this.state.isNC,
														})
													}
													name='isNC'
													color='primary'
												/>
											}
											label='NC Only'
										/>
										{/* Container type */}
										<FormControlLabel
											control={
												<Select
													labelId=''
													id=''
													multiple
													value={this.state.includeOnly}
													onChange={e =>
														this.setState({
															includeOnly: e.target.value,
														})
													}
													input={<Input />}
													MenuProps={MENU_PROPS}>
													<MenuItem key='drafts' value='draught'>
														Drafts
													</MenuItem>
													<MenuItem key='bottles' value='bottled'>
														Bottles
													</MenuItem>
													<MenuItem key='cans' value='can'>
														Cans
													</MenuItem>
													<MenuItem key='flights' value='flight'>
														Flights
													</MenuItem>
												</Select>
											}
											label='Include Only'
										/>
										{/* beer stats */}
										<FormControlLabel
											control={
												<Container fluid>
													<Row>
														<Col
															style={{
																display: drafts > 0 ? "inline-block" : "none",
																padding: 10,
															}}>
															{drafts} Drafts
														</Col>
														<Col
															style={{
																display: cans > 0 ? "inline-block" : "none",
																padding: 10,
															}}>
															{cans} Cans
														</Col>
														<Col
															style={{
																display: bottles > 0 ? "inline-block" : "none",
																padding: 10,
															}}>
															{bottles} Bottles
														</Col>
														<Col
															style={{
																display: flights > 0 ? "inline-block" : "none",
																padding: 10,
															}}>
															{flights} Flights
														</Col>
														<Col
															style={{
																display: total > 0 ? "inline-block" : "none",
																padding: 10,
																fontWeight: "bold",
															}}>
															{total} Beers Available
														</Col>
													</Row>
												</Container>
											}
											style={{ cursor: "default" }}
											label=''
										/>
									</Space>
								</FormGroup>
							</Space>
							<div style={{ display: "inline-block" }}>
								{/* Search bar */}
								<TextField
									id='outlined-basic'
									onSelect={e => this.setState({ search: e.target.value })}
									label='Search'
									variant='outlined'
									style={{ width: 300 }}
								/>
							</div>
						</Toolbar>
					</AppBar>
				</div>
				<div
					style={{
						display: "block",
						width: "100%",
						height: "auto",
						textAlign: beers.length === 0 ? "center" : "left",
					}}>
					{beerlist ? (
						<Beers beerlist={beers} />
					) : (
						<Spin
							indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />}
							style={{
								marginTop: 200,
							}}
						/>
					)}
				</div>
			</div>
		);
	}
}

function mapState(state) {
	const { alldata, pending, error } = state.beerlist;
	if (alldata) {
		return { ...alldata };
	}
	return { pending, error };
}

const actionCreators = {
	getAll: userActions.getAll,
};

export default connect(mapState, actionCreators)(Beerlist);
