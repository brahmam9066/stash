import React, {Component} from "react";
import {View, TouchableOpacity, Image, Text} from "react-native";
import PropTypes from "prop-types";

import {redirectTo} from "../../utils/utility";
import {footerIcons} from "../../assets";
import  I18n from "../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    isActive: PropTypes.bool,
    onPress: PropTypes.func
};

const defaultProps = {
    isActive: false,
    onPress: () => redirectTo("dashboard")
};


class Footer extends Component {

    render() {
        const {language} = this.props
        return (
            <View style={styles.container}>
                <View style={styles.homeContainer}>
                    <TouchableOpacity onPress={this.props.onPress}>
                        <Image
                            style={styles.footerStyle}
                            source={this.props.isActive ? footerIcons.iconHomeActive : footerIcons.iconHomeInactive}
                        />
                        <Text style={styles.homeStyle}>
                        {I18n.t('home', {locale:language})}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

Footer.propTypes = propTypes;

Footer.defaultProps = defaultProps;

export default Footer;
