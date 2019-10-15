import React, {Component} from "react";
import {Text, View, Image} from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";


const propTypes = {
    pageNavImageStyle: PropTypes.object,
    textStyle: PropTypes.object,
    image: PropTypes.any,
    name: PropTypes.string
};

const defaultProps = {
    pageNavImageStyle: {},
    image: "",
    name: "",
    textStyle: {}
};

class PageNav extends Component {
    render() {
        return (
            <View style={styles.viewStyle}>
                <Image style={this.props.pageNavImageStyle} source={this.props.image} />
                <Text style={this.props.textStyle}>{this.props.name}</Text>
            </View>
        );
    }
}

PageNav.propTypes = propTypes;

PageNav.defaultProps = defaultProps;

export default PageNav;
