import React, {Component} from "react";
import {Text, View, ScrollView} from "react-native";
import {Button} from "react-native-elements";
import PropTypes from "prop-types";

import Toolbar from "../../../../components/Toolbar";

import styles from "./styles";

const propTypes = {
    FarmProfileRegistrationForm: PropTypes.element,
    handleFarmRegistration: PropTypes.func,
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string
};

const defaultProps = {
    FarmProfileRegistrationForm: (<Text>Farm Registration</Text>),
    handleFarmRegistration: () => {},
    onbackPress: () => {},
    toolbarTitle: ""
};

class FarmProfileForm extends Component<{}> {

    render() {
        return (
            <View style={styles.appContainer}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <ScrollView contentContainerStyle={styles.loginWrapper}>
                    <Text style={styles.personalStyles}>Farm Name & address</Text>
                    {this.props.FarmProfileRegistrationForm}
                    <Button
                        raised
                        title="Save"
                        backgroundColor="#ed1c24"
                        borderRadius={4}
                        containerViewStyle={styles.loginButtonStyle}
                        textStyle={styles.loginTextStyle}
                        onPress={this.props.handleFarmRegistration} />
                </ScrollView>
            </View>
        );
    }
}

FarmProfileForm.defaultProps = defaultProps;

FarmProfileForm.propTypes = propTypes;

export default FarmProfileForm;
