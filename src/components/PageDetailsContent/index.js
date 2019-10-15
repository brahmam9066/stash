import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity} from "react-native";

import styles from "./styles";

const propTypes = {
    iconPath: PropTypes.any,
    onPress: PropTypes.func,
    contentHeading: PropTypes.string,
    content: PropTypes.any,
    city: PropTypes.any,
    line1: PropTypes.any,
    line2: PropTypes.any,
    state: PropTypes.any,
    buttonTitle: PropTypes.string,
    headingStyle: PropTypes.object,
    contentStyle: PropTypes.object
};

const defaultProps = {
    iconPath: "",
    onPress: () => {},
    contentHeading: "",
    content: "",
    city: "",
    line1: "",
    line2: "",
    state: "",
    buttonTitle: "",
    headingStyle: {},
    contentStyle: {}
};

class PageDetailsContent extends Component<{}> {

    render() {
        return (
            <View style={[styles.pageDetailsContent, {paddingBottom: 16}]}>
                <Image source={this.props.iconPath} style={styles.pageIconStyle} resizeMode="contain" />
                <View style={styles.pageContentContainer}>
                    <View style={[styles.textContainerStyle, this.props.buttonTitle === "" ? styles.textContFullWidth : {}]}>
                        {this.props.contentHeading !== "" && <Text style={[styles.contentHeaderStyle, this.props.headingStyle]}>{this.props.contentHeading}</Text>}
                        <Text style={[styles.contentTextStyle, this.props.contentStyle]}>{this.props.content}</Text>
                    </View>
                    {this.props.buttonTitle !== "" &&
                    <TouchableOpacity onPress={this.props.onPress}>
                        <Text style={styles.editTextStyle}>{this.props.buttonTitle}</Text>
                    </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
}

PageDetailsContent.defaultProps = defaultProps;

PageDetailsContent.propTypes = propTypes;

export default PageDetailsContent;
