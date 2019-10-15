import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Image, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import {animalListIcons} from "../../assets";


import styles from "./styles";

const propTypes = {
    iconStyle: PropTypes.object,
    rightIconColor: PropTypes.string,
    rightIconSize: PropTypes.number,
    onPress: PropTypes.func,
    children: PropTypes.any,
    id: PropTypes.string
};

const defaultProps = {
    iconStyle: {},
    rightIconColor: "#f1545a",
    rightIconSize: 28,
    onPress: () => {},
    children: [],
    id: ""

};

class ListItem extends Component<{}> {

    render() {
        return (
            <TouchableOpacity onLongPress={this.props.onLongPress} accessibilityLabel={this.props.id} testID={this.props.id} onPress={this.props.onPress}>
                <View style={styles.listItemContainer}>
                    <View style={[styles.leftIconContainer, this.props.leftIconContainer]}>
                        <Image style={[styles.defaultIconDimensions, this.props.iconStyle]} source={animalListIcons.iconCattleListing} />
                    </View>
                    {this.props.children}
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
