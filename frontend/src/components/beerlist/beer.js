import React, { useState } from "react";
import { Button, Modal, List, Rate, Divider, message } from "antd";
import bottle from "../../resources/bottle.jpeg";
import pint from "../../resources/pint.jpeg";
import can from "../../resources/can.jpeg";
import flight from "../../resources/flight.jpg";
// import { userActions } from "../../store/actions/user";
// import { connect } from "react-redux";
import { authHeader } from "../../store/helpers/auth-header";
import { userService } from "../../services/user";
import { urls } from "../../services/urls";
import { Paper } from "@material-ui/core";

import "./style.css";

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
/**
 * TODO: Clean this page up
 *
 * @param {beer} Beer object that contains the necessary fields/values
 */
function Beer({ beer }) {
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [rateVisible, setRateVisible] = useState(false);

	const [value, setValue] = useState(0);
	// const beer = props.beer;
	const desc = ["terrible", "bad", "normal", "good", "wonderful"];

	function ModalDescription() {
		return (
			<div>
				<p>{beer.brewer}</p>
				<p>{beer.name}</p>
				<p>{beer.country}</p>
				<p>{beer.city}</p>
				<p>{beer.description.replace("<p>", "").replace("</p>", "")}</p>
				<div>
					<Rate tooltips={desc} onChange={e => setValue(e)} value={value} />
				</div>
			</div>
		);
	}

	const handleOk = () => {
		const obj = {
			beername: beer.name,
			rating: value,
			style: beer.style,
			description: beer.description,
		};

		const requestOptions = {
			method: "POST",
			headers: {
				...authHeader(),
				"Content-Type": "application/json",
			},
			body: JSON.stringify(obj),
		};

		fetch(urls.USERS.concat("/tasted"), requestOptions)
			.then(userService.handleResponse)
			.then(
				resp => {
					message.success(resp.response, 4);
					reset();
				},
				errResp => {
					message.error(errResp === "Unauthorized" ? "Create an account first" : errResp, 4);
					reset();
				}
			);
	};

	const reset = () => {
		setLoading(false);
		setVisible(false);
		setRateVisible(false);
	};

	return (
		<Paper elevation={7} style={{ display: "block", width: "100%" }}>
			<List.Item
				actions={[
					<a onClick={() => setRateVisible(true)}>Check in</a>,
					<a onClick={() => setVisible(true)}>Description</a>,
				]}>
				<List.Item.Meta
					avatar={
						<img
							src={
								beer.container === "draught"
									? pint
									: beer.container === "can"
									? can
									: beer.container === "bottled"
									? bottle
									: flight
							}
							alt='bottle'
							style={{
								height: 60,
								width: 60,
								textAlign: "center",
							}}
						/>
					}
					title={
						beer.brewer !== "unassigned" && beer.brewer !== "n/a"
							? [beer.brewer, beer.percentage].join(" ")
							: "Specialty"
					}
					description={beer.name}
				/>
				<Modal
					visible={visible}
					title={beer.name}
					onOk={handleOk}
					onCancel={reset}
					footer={[
						<Button key='back' onClick={reset}>
							Return
						</Button>,
						<Button key='submit' type='primary' loading={loading} onClick={handleOk}>
							Check in
						</Button>,
					]}>
					{<ModalDescription />}
				</Modal>
				<Modal
					visible={rateVisible}
					title={beer.name}
					onOk={handleOk}
					onCancel={reset}
					footer={[
						<Button key='back' onClick={reset}>
							Return
						</Button>,
						<Button key='submit' type='primary' loading={loading} onClick={handleOk}>
							Submit
						</Button>,
					]}>
					What would you rate this beer?
					<div>
						<Rate tooltips={desc} onChange={e => setValue(e)} value={value} allowHalf />
					</div>
				</Modal>
				<Rate character='$' disabled style={{ fontSize: 36 }} defaultValue={beer.dcount || 1} />
			</List.Item>
		</Paper>
	);
}

export default Beer;
