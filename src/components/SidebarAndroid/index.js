import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity, ScrollView} from "react-native";
import Config from "react-native-config";

import ListItem from "../ListItem";
import ModalSmall from "../ModalSmall";
import {ProfileIcons} from "../../assets";
import I18n from "../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    menuList: PropTypes.array,
    userDetails: PropTypes.object,
    handleUserLogout: PropTypes.func
};

const defaultProps = {
    menuList: [],
    userDetails: {},
    handleUserLogout: () => { }
};

class SidebarAndroid extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    componentWillUnmount() {
        this.setState({
            showModal: false
        });
    }

    openTermsModal = () => {
        this.setState({
            showModal: true
        });
    }

    closeTermsModal = () => {
        this.setState({
            showModal: false
        });
    }

    acceptTermsAndCondition = () => {
        this.setState({
            showModal: false
        });
        this.props.handleUserLogout();
    }

    renderNavMenu = () => {
        const {menuList} = this.props;
        return menuList.map((menu, index) => {
            return (
                <ListItem
                    id={menu.id}
                    key={index}
                    titleStyle={styles.listItemTitleStyle}
                    title={menu.name}
                    onPress={menu.onPress}
                    profileIcon={menu.icon}
                    iconStyle={styles.farmIconStyle}
                />);
        });
    }

    render() {
        const {userDetails,language} = this.props;
        return (
            <ScrollView style={styles.sidebarContainer}>
                <View style={styles.sidebarHeader}>
                    <Image
                        style={styles.userThumbmail}
                        source={Config.APP_TYPE === "corporate" ? ProfileIcons.iconProfile : ProfileIcons.iconProfile}
                        resizeMode="contain" />
                    <View style={styles.rowStyle}>
                        <Text style={styles.userNameStyle}>{userDetails.firstName && userDetails.firstName ? `${userDetails.firstName} ${userDetails.lastName}` : `${userDetails.login}` }</Text>
                        <TouchableOpacity
                            accessibilityLabel="sign-out-drawer-button"
                            testID="sign-out-drawer-button"
                            checked={this.state.isAgreeTerms}
                            onPress={this.openTermsModal}>
                            <Text style={styles.signStyle}>
                            {I18n.t("signOut", {locale: language})}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.showModal
                    && <ModalSmall
                        showModal={this.state.showModal}
                        showCancel
                        title="Confirm"
                        content="Do you really want to Sign out or remain within the application?"
                        buttonCancelText="Yes"
                        buttonOkText="No"
                        onPressCancel={this.acceptTermsAndCondition}
                        onPressOk={this.closeTermsModal}
                    />
                    }
                </View>
                {this.renderNavMenu()}
            </ScrollView>
        );
    }
}


SidebarAndroid.defaultProps = defaultProps;

SidebarAndroid.propTypes = propTypes;

export default SidebarAndroid;
