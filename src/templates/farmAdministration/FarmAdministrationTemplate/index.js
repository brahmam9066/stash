import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text} from "react-native";

import Toolbar from "../../../components/Toolbar";

import styles from "./styles";

const propTypes = {
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string,
    renderContent: PropTypes.element
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    renderContent: <Text>Content</Text>
};

class FarmAdministration extends Component<{}> {

    render() {
        return (
            <View style={styles.appContainer}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <View style={styles.bodyContent}>
                    {this.props.renderContent}
                </View>
            </View>
        );
    }
}

FarmAdministration.defaultProps = defaultProps;

FarmAdministration.propTypes = propTypes;

export default FarmAdministration;
