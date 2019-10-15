import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity} from "react-native";

import styles from "./styles";

const propTypes = {
    iconUsermooOn: PropTypes.any,
    headerTitle: PropTypes.any,
    onPress: PropTypes.func,
    hideEditButton: PropTypes.bool
};

const defaultProps = {
    iconUsermooOn: "",
    headerTitle: "",
    onPress: () => {},
    hideEditButton: false
};

class PageDetailsHeader extends Component<{}> {

    render() {
        const {hideEditButton} = this.props;
        return (
            <View style={styles.pageDetailsHeader}>
                <Image source={this.props.iconUsermooOn} style={styles.avatarStyle} />
                <View style={styles.headerContent}>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={styles.headerTitle}>
                        {this.props.headerTitle}
                    </Text>
                    {/* {!hideEditButton &&
                        <TouchableOpacity
                            style={styles.editButtonCont}
                            onPress={this.props.onPress}>
                            <Text style={styles.editTextStyle}>Edit</Text>
                        </TouchableOpacity>
                    } */}

                </View>
            </View>
        );
    }
}

PageDetailsHeader.defaultProps = defaultProps;

PageDetailsHeader.propTypes = propTypes;

export default PageDetailsHeader;
