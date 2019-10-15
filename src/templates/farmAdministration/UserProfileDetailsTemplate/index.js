import React, {Component} from "react";
import {View, TouchableOpacity, Image, Text} from "react-native";
import PropTypes from "prop-types";

import {navigateTo, arrayChunking} from "../../../utils/utility";
import Toolbar from "../../../components/Toolbar";
import PageDetailsHeader from "../../../components/PageDetailsHeader";
import {farmAdminIcons} from "../../../assets";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string,
    userDetails: PropTypes.object
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    userDetails: {}
};

class UserProfileDetails extends Component {

    render() {
        const {userDetails,language} = this.props;
        let mobileNum = "";
        if (userDetails.login) {
            const num = `${userDetails.login}`;
            const numArray = num ? num.split("") : [];
            const arrayChunk = arrayChunking(5, numArray);
            mobileNum = `${arrayChunk[0].join("")}  ${arrayChunk[1].join("")}`;
        }

        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <PageDetailsHeader
                    iconUsermooOn={farmAdminIcons.iconUsermooOn}
                    headerTitle={<Text>{userDetails.firstName ? userDetails.firstName : ""} {userDetails.lastName ? userDetails.lastName : ""}</Text>} />
                <View style={styles.telephoneContainer}>
                    <Image source={farmAdminIcons.iconTelephone} style={styles.telephoneStyle} />
                    <Text style={styles.mobileNumStyle}>{mobileNum}</Text>
                    <TouchableOpacity
                        style={styles.editButtonCont}
                        onPress={() => navigateTo("userRegistration", {isEditUserDetails: true})}>
                        <Text style={styles.editTextStyle}>
                         {I18n.t('edit', {locale:language})}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.emailViewStyle}>
                    <Image source={farmAdminIcons.iconMail} style={styles.telephoneStyle} />
                    <Text style={styles.emailStyle}>{userDetails.email}</Text>
                </View>
            </View>
        );
    }
}

UserProfileDetails.defaultProps = defaultProps;

UserProfileDetails.propTypes = propTypes;

export default UserProfileDetails;
