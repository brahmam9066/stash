import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import {Icon} from "react-native-elements";

import Alert from "../Alert";

import styles from "./styles";

const propTypes = {
    title: PropTypes.string,
    leftIconName: PropTypes.string,
    onPressLeftIcon: PropTypes.func,
    alertTitle: PropTypes.any,
    onPressAlert: PropTypes.func,
    showAlert: PropTypes.bool,
    iconmooOn: PropTypes.any,
    leftIconId: PropTypes.string,
    toolbarContainer: PropTypes.object
};

const defaultProps = {
    title: "",
    leftIconName: "",
    onPressLeftIcon: () => {},
    alertTitle: "",
    onPressAlert: () => {},
    showAlert: false,
    iconmooOn: "",
    leftIconId: "",
    toolbarContainer: {}
};

class Toolbar extends Component<{}> {

    render() {
        return (
            <View>
                <View style={[styles.toolbarContainer, this.props.toolbarContainer]}>
                    {this.props.leftIconName !== "" &&
                        <TouchableOpacity
                            accessibilityLabel={this.props.leftIconId}
                            testID={this.props.leftIconId}
                            onPress={this.props.onPressLeftIcon}
                        >
                            <View style={styles.leftIconContainer}>
                                <Icon
                                    name={this.props.leftIconName}
                                    type="material-community"
                                    color="#ffffff"
                                    size={32}
                                />
                            </View>
                        </TouchableOpacity>
                    }
                    <Text style={[styles.toolbarTitle, this.props.leftIconName === "" ? styles.paddingLeft16 : {}]}>{this.props.title}</Text>
                    {this.props.iconmooOn !== "" && <View style={styles.mooOnViewStyle}><Image style={styles.mooOnStyle} source={this.props.iconmooOn} /></View>}
                </View>
                {this.props.showAlert &&
                <Alert
                    onPressAlert={this.props.onPressAlert}
                    alertTitle={this.props.alertTitle} />
                }
            </View>
        );
    }
}

Toolbar.defaultProps = defaultProps;

Toolbar.propTypes = propTypes;

export default Toolbar;
