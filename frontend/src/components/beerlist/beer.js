import React, { useState } from "react";
import { Card, Button, Modal, List, Rate, Divider, message } from "antd";
import bottle from "../../resources/bottle.jpeg";
import pint from "../../resources/pint.jpeg";
import can from "../../resources/can.jpeg";
// import { userActions } from "../../store/actions/user";
// import { connect } from "react-redux";
import { authHeader } from "../../store/helpers/auth-header";
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
                    <Rate
                        tooltips={desc}
                        onChange={handleValue}
                        value={value}
                    />
                </div>
            </div>
        );
    }

    const handleValue = (value) => {
        setValue(value);
    };

    const showModal = () => {
        setVisible(true);
    };

    const showRatingModal = () => {
        setRateVisible(true);
    };

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
            .then((response) => response.json())
            .then(
                (resp) => {
                    message.success(resp.response, 4);
                    setLoading(false);
                    setVisible(false);
                    setRateVisible(false);
                },
                (errResp) => {
                    message.success(errResp.error, 4);
                    setLoading(false);
                    setVisible(false);
                    setRateVisible(false);
                }
            );
    };

    const handleCancel = () => {
        setVisible(false);
        setRateVisible(false);
    };

    return (
        <Paper elevation={7} style={{ display: "block", width: "100%" }}>
            <List.Item
                actions={[
                    <a onClick={showRatingModal}>Check in</a>,
                    <a onClick={showModal}>Description</a>,
                ]}
            >
                <List.Item.Meta
                    avatar={
                        <img
                            src={
                                beer.container == "draught"
                                    ? pint
                                    : beer.container == "can"
                                    ? can
                                    : bottle
                            }
                            alt="bottle"
                            style={{
                                height: 60,
                                width: 60,
                                textAlign: "center",
                            }}
                        />
                    }
                    title={beer.brewer + " " + beer.percentage}
                    description={beer.name}
                />
                <Modal
                    visible={visible}
                    title={beer.name}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Return
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={loading}
                            onClick={handleOk}
                        >
                            Check in
                        </Button>,
                    ]}
                >
                    {<ModalDescription />}
                </Modal>
                <Modal
                    visible={rateVisible}
                    title={beer.name}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Return
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={loading}
                            onClick={handleOk}
                        >
                            Submit
                        </Button>,
                    ]}
                >
                    What would you rate this beer?
                    <Divider />
                    <div>
                        <Rate
                            tooltips={desc}
                            onChange={handleValue}
                            value={value}
                            allowHalf
                        />
                    </div>
                </Modal>
                <Rate
                    character="$"
                    disabled
                    style={{ fontSize: 36 }}
                    defaultValue={beer.dcount || 1}
                />
            </List.Item>
        </Paper>
    );
}

export default Beer;
