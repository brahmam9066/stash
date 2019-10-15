import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";

import {registerAnimalIcons} from "../../assets";

import styles from "./styles";

const propTypes = {
    iconStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    title: PropTypes.string,
    rightIconColor: PropTypes.string,
    rightIconSize: PropTypes.number,
    onPress: PropTypes.func,
    profileIcon: PropTypes.any,
    id: PropTypes.string
};

const defaultProps = {
    iconStyle: {},
    titleStyle: {},
    title: "List Item",
    rightIconColor: "#f1545a",
    rightIconSize: 28,
    onPress: () => {},
    profileIcon: registerAnimalIcons.iconProfileHatsun,
    id: ""
};

class ListItem extends Component<{}> {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} accessibilityLabel={this.props.id} testID={this.props.id}>
                <View style={styles.listItemContainer}>
                    <View style={styles.leftIconContainer}>
                        <Image style={[styles.defaultIconDimensions, this.props.iconStyle]} source={this.props.profileIcon} />
                    </View>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[styles.defaultBodyText, this.props.titleStyle]}>
                        {this.props.title}
                    </Text>
                    <View style={styles.rightIconContainer}>
                        <Icon
                            name="chevron-right"
                            type="material-community"
                            color={this.props.rightIconColor}
                            size={this.props.rightIconSize}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

ListItem.defaultProps = defaultProps;

ListItem.propTypes = propTypes;

export default ListItem;
