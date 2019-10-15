import {connect} from "react-redux";
import React, {Component} from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
import {farmAdminIcons, animalListIcons} from "../../../assets";


import authenticatedLayer from "../../authenticatedLayer";
import ListItem from "../../../components/ListItem";
import MyAccount from "../../../templates/farmAdministration/MyAccountTemplate";
import Footer from "../../../components/Footer";
import {navigateBack, navigateTo} from "../../../utils/utility";
import {getUserDetailsAction, getFarmDetailsAction} from "../../../actions/farmAdmin.actions";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    token: PropTypes.string,
    dispatch: PropTypes.func,
    userDetails: PropTypes.object,
    farmDetails: PropTypes.object
};

const defaultProps = {
    token: "",
    dispatch: () => {},
    userDetails: {},
    farmDetails: {}
};

class MyAccountContainer extends Component<{}> {

    onRenderContent = (list) => {
        return list.map((item, index) => {
            return (
                <ListItem
                    key={index}
                    title={item.title}
                    onPress={item.onPress}
                    profileIcon={item.iconPath}
                    iconStyle={item.iconstyle} />
            );
        });
    }

    checkUserDetailsAndNavigate = () => {
        const {dispatch, userDetails} = this.props;
        if (userDetails.firstName && userDetails.lastName) {
            navigateTo("profileDetails");
        } else {
            dispatch(getUserDetailsAction(this.props.token)).then((data) => {
                if (data.firstName && data.lastName) {
                    navigateTo("profileDetails");
                } else {
                    navigateTo("userRegistration", {comingFrom: "myAccount"});
                }
            });
        }
    }

    checkFarmDetailsAndNavigate = () => {
        const {dispatch, farmDetails, userDetails} = this.props;
        if (farmDetails.id && farmDetails.name) {
            navigateTo("farmProfile");
        } else {
            const orgId = userDetails.userInfo ? userDetails.userInfo.subOrgs[0] : "";
            if (!orgId) {
                navigateTo("farmProfileRegistration", {comingFrom: "myAccount"});
            } else {
                dispatch(getFarmDetailsAction(orgId, this.props.token)).then((data) => {
                    if (data) {
                        navigateTo("farmProfile");
                    } else {
                        navigateTo("farmProfileRegistration", {comingFrom: "myAccount"});
                    }
                });
            }
        }
    }

    render() {
        const {language} =this.props
        const itemList = [
            {  title:  I18n.t('userProfile', {locale:language}),
                onPress: this.checkUserDetailsAndNavigate,
                iconPath: animalListIcons.iconUserProfile,
                iconstyle: styles.userProfileStyle},
             {  title:  I18n.t('farmProfile', {locale:language}),
                onPress: this.checkFarmDetailsAndNavigate,
                iconPath: farmAdminIcons.iconFarmProfile,
                iconstyle: styles.userProfileStyle}
        ];

        return (
            <View style={styles.appContainer}>
                <MyAccount
                    onbackPress={navigateBack}
                    toolbarTitle={ I18n.t('myAccount', {locale:language})}
                    renderContent={this.onRenderContent(itemList)}
                />
                <Footer 
                 language={language}/>
            </View>
        );
    }
}

MyAccountContainer.defaultProps = defaultProps;

MyAccountContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    userDetails: state.farmAdminReducer.userDetails,
    farmDetails: state.farmAdminReducer.farmDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(MyAccountContainer));
