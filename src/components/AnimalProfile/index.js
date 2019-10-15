import PropTypes from "prop-types";
import React, {Component} from "react";
import {View} from "react-native";

import styles from "./styles";

const propTypes = {
    children: PropTypes.any
};

const defaultProps = {
    children: []
};

class AnimalProfile extends Component<{}> {

    render() {
        return (
            <View style={styles.listItemContainer}>
                {this.props.children}
            </View>
        );
    }
}

AnimalProfile.defaultProps = defaultProps;

AnimalProfile.propTypes = propTypes;

export default AnimalProfile;
