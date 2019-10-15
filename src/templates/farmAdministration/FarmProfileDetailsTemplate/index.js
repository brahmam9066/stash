import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";

import Toolbar from "../../../components/Toolbar";
import { ProfileIcons, farmAdminIcons } from "../../../assets";
import PageDetailsHeader from "../../../components/PageDetailsHeader";
import PageDetailsContent from "../../../components/PageDetailsContent";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    farmDetails: PropTypes.object,
    toolbarTitle: PropTypes.string,
    onbackPress: PropTypes.func,
    onEditPress: PropTypes.func,
    isPaidUser: PropTypes.bool,
    onEditPress: PropTypes.func,
};

const defaultProps = {
    farmDetails: {},
    toolbarTitle: "",
    onbackPress: () => { },
    onEditPress: () => { },
    isPaidUser: false,
    onEditPress: () => { },
};

class FarmProfileDetails extends Component {

    render() {
        const { farmDetails,language } = this.props;
        const address = farmDetails.addresses ? farmDetails.addresses[0] : {};
        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <PageDetailsHeader
                    hideEditButton={this.props.isPaidUser}
                    iconUsermooOn={ProfileIcons.iconFarm}
                    headerTitle={farmDetails.name ? farmDetails.name : ""}
                />
                <View style={styles.contentContainer}>
                    <View style={styles.addressStyle}>
                        <Image source={farmAdminIcons.iconAddress} style={styles.pageIconStyle} resizeMode="contain" />
                    </View>
                    <View style={styles.pageContentContainer}>
                        <View style={[styles.textContainerStyle, this.props.buttonTitle === "" ? styles.textContFullWidth : {}]}>
                            <View style={styles.row}>
                                <View style={styles.flex1}>
                                    {this.props.contentHeading !== "" && <Text style={[styles.contentHeaderStyle, this.props.headingStyle]}>
                                    {I18n.t('address', {locale:language})}
                                    </Text>}
                                </View>
                                <View style={[styles.flex1, styles.editTextContainerStyle]}>
                                    {!this.props.isPaidUser &&
                                        <TouchableOpacity onPress={this.props.onEditPress}>
                                            <Text style={styles.editTextStyle}>  
                                            {I18n.t('edit', {locale:language})}
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <Text style={styles.contentTextStyle}>{address.address1}</Text>
                            <Text style={styles.contentTextStyle}>{address.address2}</Text>
                            <Text style={styles.contentTextStyle}>{address.cityOrVillage}</Text>
                            <Text style={styles.contentTextStyle}>{address.state} - {address.postalCode}</Text>
                        </View>
                    </View>
                </View>
                <PageDetailsContent
                    iconPath={farmAdminIcons.iconFarmOrg}
                    contentStyle={styles.emailTextStyle}
                    contentHeading={I18n.t('reportingOrg', {locale:language})}
                    content="Stellapps Technologies Pvt.Ltd."
                />
            </View>
        );
    }
}

FarmProfileDetails.propTypes = propTypes;

FarmProfileDetails.defaultProps = defaultProps;

export default FarmProfileDetails;
