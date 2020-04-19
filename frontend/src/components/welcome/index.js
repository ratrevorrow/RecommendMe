import React from "react";
import { client } from "../../util/axios";
import { Select } from "antd";
import PreferredForm from "./form";

const { Option } = Select;

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adjectives: null,
            words: null,
            loading: false,
            beerlist: null,
        };
        this.onSelect = this.onSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        // client
        //     .get("initiate_adjectives")
        //     .then((res) =>
        //         this.setState({ adjectives: res.data, loading: false })
        //     );
    }

    onSelect(words) {
        this.setState({ words: words });
    }

    onSubmit() {
        const adj = this.state.words;
        this.setState({ beerlist: null });
        client
            .post("get_beers_from_adjs", { adjectives: adj })
            .then((res) => this.setState({ beerlist: res.data }));
    }

    render() {
        return (
            <>
                {/* <Select
                    mode="multiple"
                    style={{ width: 250 }}
                    placeholder="Choose Adjective"
                    // defaultValue={["a10", "c12"]}
                    // onSelect={this.onSelect}
                    onChange={this.onSelect}
                    loading={this.state.loading}
                >
                    {this.state.adjectives &&
                        this.state.adjectives.map((adjective, i) => (
                            <Option value={adjective} key={i}>
                                {adjective}
                            </Option>
                        ))}
                </Select>
                <Button onClick={this.onSubmit}>Submit</Button>
                <Divider /> */}
                <PreferredForm/>
                {/* {this.state.beerlist && (
                    <Beers beerlist={this.state.beerlist} />
                )} */}
            </>
        );
    }
}
