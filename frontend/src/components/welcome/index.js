import React from "react";
// import PreferredForm from "./form";
import { connect } from "react-redux";
import QueueAnim from "rc-queue-anim";

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <>
                {/* <PreferredForm /> */}
                <QueueAnim delay={300} className="queue-simple">
                    <div key="a">Recommended beers</div>
                    <div key="b">Recommended beers</div>
                    <div key="c">Recommended beers</div>
                    <div key="d">Recommended beers</div>
                </QueueAnim>
            </>
        );
    }
}

function mapState(state) {
    const { pending, success, error, user } = state.authentication;
    return { pending, success, error, user };
}

export default connect(mapState)(Welcome);
