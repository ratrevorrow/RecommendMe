import React from "react";
// import PreferredForm from "./form";
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

// TODO: refactor
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brews: null,
            showNotification: false,
            isNC: false,
            draftsOnly: false,
            includeOnly: [],
        };
        this.get3RandomBeers = this.get3RandomBeers.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
                isNC: this.state.isNC,
            }),
        };

        fetch(urls.BEERLIST.concat("/get_three_random_beers"), requestOptions)
            .then((res) => res.json())
            .then((beers) => {
                this.setState({
                    brews: beers.map((beer, idx) => (
                        <div key={idx}>
                            <Beer beer={beer} />
                        </div>
                    )),
                    showNotification: true,
                });
                setTimeout(
                    () => this.setState({ showNotification: false }),
                    3000
                );
            });
    }

    handleClose = () => {
        this.setState({ showNotification: false });
    };

    render() {
        return (
            <div
                style={{
                    textAlign: !this.state.brews ? "center" : "left",
                }}
            >
                <AppBar
                    position="relative"
                    color="default"
                    style={{ zIndex: 50 }}
                >
                    <Toolbar>
                        <Space size={30}>
                            <Button
                                onClick={this.get3RandomBeers}
                                variant="contained"
                                color="primary"
                                endIcon={<Refresh />}
                            >
                                Refresh Brews
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
                                                name="isNC"
                                                color="primary"
                                            />
                                        }
                                        label="NC Only"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Select
                                                labelId="demo-mutiple-name-label"
                                                id="demo-mutiple-name"
                                                multiple
                                                value={this.state.includeOnly}
                                                onChange={(e) =>
                                                    this.setState({
                                                        includeOnly:
                                                            e.target.value,
                                                    })
                                                }
                                                input={<Input />}
                                                MenuProps={MenuProps}
                                            >
                                                <MenuItem
                                                    key="drafts"
                                                    value="draught"
                                                >
                                                    Drafts
                                                </MenuItem>
                                                <MenuItem
                                                    key="bottles"
                                                    value="bottled"
                                                >
                                                    Bottles
                                                </MenuItem>
                                                <MenuItem
                                                    key="cans"
                                                    value="can"
                                                >
                                                    Cans
                                                </MenuItem>
                                                <MenuItem
                                                    key="flights"
                                                    value="flight"
                                                >
                                                    Flights
                                                </MenuItem>
                                            </Select>
                                        }
                                        label="Include Only"
                                    />
                                </Space>
                            </FormGroup>
                        </Space>
                    </Toolbar>
                </AppBar>
                {/* <PreferredForm /> */}
                {!this.state.brews ? (
                    <Spin
                        indicator={
                            <LoadingOutlined style={{ fontSize: 80 }} spin />
                        }
                        style={{
                            marginTop: 200,
                        }}
                    />
                ) : (
                    <QueueAnim delay={300} className="queue-simple">
                        {this.state.brews}
                    </QueueAnim>
                )}
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={this.state.showNotification}
                    onClose={this.handleClose}
                    message="Generated 3 random beers"
                    // key={vertical + horizontal}
                />
            </div>
        );
    }
}

function mapState(state) {
    const { pending, success, error, user } = state.authentication;
    return { pending, success, error, user };
}

export default connect(mapState)(Welcome);
