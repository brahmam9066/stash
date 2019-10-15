import React, {Component} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import Config from "react-native-config";
import {Button} from "react-native-elements";
import CodeInput from "react-native-confirmation-code-input";
import PropTypes from "prop-types";

import {ProfileIcons} from "../../../assets";
import Toolbar from "../../../components/Toolbar";

import styles from "./styles";

const propTypes = {
    handleGetOtp: PropTypes.func,
    handleVerifyOtp: PropTypes.func,
    resendPress: PropTypes.func
};

const defaultProps = {
    handleGetOtp: () => {},
    handleVerifyOtp: () => {},
    resendPress: () => {}
};

class VerifyOtp extends Component<{}> {

    render() {
        return (
            <View style={styles.appContainer}>
                <Toolbar
                    title={Config.APP_TYPE === "corporate" ? "HAIS" : ""}
                    iconmooOn={Config.APP_TYPE === "corporate" ? "" : ProfileIcons.iconMooOn} />
                <View style={styles.loginWrapper}>
                    {/* <Text style={styles.verifyMobileNumber}>Verify your Mobile Number.</Text> */}
                    <Text style={styles.verifyMobileNumber}>Enter OTP here.</Text>
                    <CodeInput
                        codeLength={4}
                        className="border-b"
                        space={8}
                        size={30}
                        inputPosition="center"
                        inactiveColor="#bbbbbb"
                        activeColor="#ed1c24"
                        keyboardType="phone-pad"
                        codeInputStyle={styles.codeInput}
                        onFulfill={this.props.handleGetOtp} />
                    <Button
                        raised
                        title="Verify"
                        backgroundColor="#ed1c24"
                        borderRadius={4}
                        containerViewStyle={styles.loginButtonStyle}
                        textStyle={styles.loginTextStyle}
                        onPress={this.props.handleVerifyOtp} />
                    <View style={styles.didNotViewStyle}>
                    <Text style={styles.didnotGetCode}>Didn't get the Code?</Text>
                    <TouchableOpacity onPress={() => this.props.resendPress}>
                        <Text style={styles.resendStyle}>Resend code.</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

VerifyOtp.defaultProps = defaultProps;

VerifyOtp.propTypes = propTypes;

export default VerifyOtp;
