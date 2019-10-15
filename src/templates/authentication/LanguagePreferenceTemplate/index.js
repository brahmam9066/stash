import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import RadioButton from "../../../components/RadioButton";

import Toolbar from "../../../components/Toolbar";

import styles from "./styles";

const propTypes = {
    onbackPress: PropTypes.func
};

const defaultProps = {
    onbackPress: () => { }
};

class LanguagePreference extends Component<{}> {

    render() {
        return (
            <View style={styles.appContainer}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <View style={styles.bodyContent}>
                    <RadioButton
                        label="English"
                        name="en"
                        value={this.props.activeLanguage}
                        onPress={() => {this.props.changeLanguage("en")}}
                    />
                    </View>
                    <View style={styles.bodyContent}>
                    <RadioButton
                        label="Hindi"
                        name="hi"
                        value={this.props.activeLanguage}
                        onPress={() => {this.props.changeLanguage("hi")}}
                    />
                    </View>
                </View>            
        );
    }
}

LanguagePreference.defaultProps = defaultProps;

LanguagePreference.propTypes = propTypes;

export default LanguagePreference;
