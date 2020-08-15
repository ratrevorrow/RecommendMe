import React from "react";
import { connect } from "react-redux";
import QueueAnim from "rc-queue-anim";
import { urls } from "../../services/urls";
import { Spin, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
	Snackbar,
	Button,
	AppBar,
	Toolbar,
	Switch,
	FormGroup,
	FormControlLabel,
	Select,
	Input,
	MenuItem,
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import Beer from "../beerlist/beer";
import { authHeader } from "../../store/helpers/auth-header";
import { MenuProps } from "./constants";

class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			brews: null,
			showNotification: false,
			isNC: false,
			draftsOnly: false,
			includeOnly: [],
			includeStyles: [],
		};
		this.get3RandomBeers = this.get3RandomBeers.bind(this);
	}

	componentDidMount() {
		this.get3RandomBeers();
	}

	get3RandomBeers() {
		this.setState({ brews: null });

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...authHeader(),
			},
			body: JSON.stringify({
				includeOnly: this.state.includeOnly,
				includeStyles: this.state.includeStyles,
				isNC: this.state.isNC,
			}),
		};

		fetch(urls.BEERLIST.concat("/get_three_random_beers"), requestOptions)
			.then(res => res.json())
			.then(beers => {
				this.setState({
					brews: beers.map((beer, idx) => (
						<div key={idx}>
							<Beer beer={beer} />
						</div>
					)),
					showNotification: true,
				});
				setTimeout(() => this.setState({ showNotification: false }), 3000);
			});
	}

	render() {
		return (
			<div
				style={{
					textAlign: !this.state.brews ? "center" : "left",
				}}>
				<AppBar position='relative' color='default' style={{ zIndex: 50 }}>
					<Toolbar>
						<Space size={30}>
							<Button
								onClick={this.get3RandomBeers}
								variant='contained'
								color='primary'
								endIcon={<Refresh />}>
								Random
							</Button>

							<Button
								onClick={this.get3RandomBeers}
								variant='contained'
								color='default'
								style={{ display: !this.props.user && "none" }}
								endIcon={<Refresh />}>
								Tailored
							</Button>

							<FormGroup row>
								<Space size={15}>
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
									<FormControlLabel
										control={
											<Select
												labelId='demo-mutiple-name-label'
												id='demo-mutiple-name'
												multiple
												value={this.state.includeOnly}
												onChange={e =>
													this.setState({
														includeOnly: e.target.value,
													})
												}
												input={<Input />}
												MenuProps={MenuProps}>
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
									{/* <FormControlLabel
										control={
											<Select
												multiple
												value={this.state.includeStyles}
												onChange={e =>
													this.setState({
														includeStyles: e.target.value,
													})
												}
												input={<Input />}
												MenuProps={MenuProps}>
												{this.props.styles &&
													this.props.styles.map(style => (
														<MenuItem key={style} value={style}>
															{style}
														</MenuItem>
													))}
											</Select>
										}
										label='Styles'
									/> */}
								</Space>
							</FormGroup>
						</Space>
					</Toolbar>
				</AppBar>
				{!this.state.brews ? (
					<Spin
						indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />}
						style={{
							marginTop: 200,
						}}
					/>
				) : (
					<QueueAnim delay={300} className='queue-simple'>
						{this.state.brews}
					</QueueAnim>
				)}
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
					open={this.state.showNotification}
					onClose={() => this.setState({ showNotification: false })}
					message='Generated 3 random beers'
					// key={vertical + horizontal}
				/>
			</div>
		);
	}
}

function mapState(state) {
	const { alldata, pending, error } = state.beerlist;
	if (alldata) {
		return { ...alldata, ...state.authentication };
	}
	return { pending, error, ...state.authentication };
}

export default connect(mapState)(Welcome);
