import React, { useEffect, useState } from "react";
import { Select, Button, Form, Row, Col } from "antd";
import { client } from "../../util/axios";

const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

function PreferredForm(props) {
    var [form] = Form.useForm();
    const [adjs, setAdjs] = useState(null);
    const [breweries, setBreweries] = useState(null);
    const [names, setNames] = useState(null);
    const [styles, setStyles] = useState(null);

    const [loadingAdj, setLoadingAdj] = useState(null);
    const [loadingBreweries, setLoadingBreweries] = useState(null);
    const [loadingNames, setLoadingNames] = useState(null);
    const [loadingStyles, setLoadingStyles] = useState(null);

    useEffect(() => {
        setLoadingAdj(true);
        setLoadingBreweries(true);
        setLoadingNames(true);
        setLoadingStyles(true);
        // fetch("http://localhost:5000/beerlist/get_everything")
        //     .then((response) => response.json())
        //     .then(
        //         (data) => {
        //             this.setState({
        //                 beerlist: data.beerlist,
        //                 draftCount: data.drafts,
        //                 bottledCount: data.bottles,
        //                 cansCount: data.cans,
        //             });
        //         },
        //         (errResp) => console.error(errResp)
        //     );
        // client.get("beerlist/get_everything").then((res) => {
        //  });
        fetch("http://localhost:5000/beerlist/get_everything")
            .then((response) => response.json())
            .then((res) => {
                setBreweries(res.breweries);
                setNames(res.names);
                setStyles(res.styles);
                setAdjs(res.adjectives);
                setLoadingAdj(false);
                setLoadingBreweries(false);
                setLoadingNames(false);
                setLoadingStyles(false);
            });
    }, []);

    const onFinish = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div>
            <Row style={{ marginTop: 100 }}>
                <Col span={10} offset={6}>
                    <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                    >
                        <Form.Item name="adjs" label="Adjectives">
                            <Select
                                mode="multiple"
                                placeholder="What do you look for in a drink?"
                                // onChange={this.onSelect}
                                loading={loadingAdj}
                            >
                                {adjs &&
                                    adjs.map((adjective, i) => (
                                        <Option value={adjective} key={i}>
                                            {adjective}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="breweries" label="Breweries">
                            <Select
                                mode="multiple"
                                placeholder="Like any of these breweries?"
                                // onChange={this.onSelect}
                                loading={loadingBreweries}
                            >
                                {breweries &&
                                    breweries.map((brewery, i) => (
                                        <Option value={brewery} key={i}>
                                            {brewery}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="names" label="Names">
                            <Select
                                mode="multiple"
                                placeholder="Any names stand out?"
                                // onChange={this.onSelect}
                                loading={loadingNames}
                            >
                                {names &&
                                    names.map((name, i) => (
                                        <Option value={name} key={i}>
                                            {name}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="styles" label="Styles">
                            <Select
                                mode="multiple"
                                placeholder="Any favorite styles?"
                                // onChange={this.onSelect}
                                loading={loadingStyles}
                            >
                                {styles &&
                                    styles.map((style, i) => (
                                        <Option value={style} key={i}>
                                            {style}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default PreferredForm;
