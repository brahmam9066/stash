import {connect} from "react-redux";
import React, {Component} from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
// import validator from "validator";

import {verifyOtpRequest, verifyForgotPasswordOtpRequest, generateOtp} from "../../../services/authenticate.service";
import VerifyOtp from "../../../templates/authentication/VerifyOtpTemplate";
import {navigateTo} from "../../../utils/utility";

import styles from "./styles";

const propTypes = {
    username: PropTypes.any,
    comingFrom: PropTypes.string
};

const defaultProps = {
    username: "",
    comingFrom: ""
};

class VerifyOtpContainer extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            otp: ""
        };
    }

    getOtp = (otp) => {
        this.setState({
            otp
        });
    }

    onVerifyOtp = () => {
        const payload = {
            username: this.props.username,
            otp: this.state.otp
        };
        if (this.props.comingFrom === "signup") {
            verifyOtpRequest(payload, (data) => {
                if (data) {
                    navigateTo("password", {username: this.props.username});
                }
            });
        } else {
            verifyForgotPasswordOtpRequest(payload, (data) => {
                if (data) {
                    navigateTo("createNewPassword", {username: this.props.username, otp: this.state.otp});
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.appContainer}>
                <VerifyOtp handleVerifyOtp={this.onVerifyOtp} handleGetOtp={this.getOtp} />
            </View>
        );
    }
}

VerifyOtpContainer.defaultProps = defaultProps;

VerifyOtpContainer.propTypes = propTypes;

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtpContainer);
