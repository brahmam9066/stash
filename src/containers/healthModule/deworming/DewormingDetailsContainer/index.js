import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";

import DewormingDetails from "../../../../templates/healthModule/deworming/DewormingDetailsTemplate";
import {navigateBack, navigateTo, handleCheckInventory} from "../../../../utils/utility";

import styles from "./styles";

const propTypes = {
    dewormingDetails: PropTypes.object,
    userDetails: PropTypes.object,
    enableBilling: PropTypes.bool
};

const defaultProps = {
    dewormingDetails: {},
    userDetails: {},
    enableBilling: false
};

class DewormingDetailsContainer extends Component {

    componentDidMount() {
        this.activateBackButton();
    }

    componentWillUnmount() {
        this.deactivateBackButton();
    }

    activateBackButton = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    deactivateBackButton = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    onPressDewormingEdit = () => {
        navigateTo("recordDeworming", {isEditDeworming: true, comingFrom: "dewormingDetails"});
    }

    handleBackPress = () => {
        navigateBack("dewormingListing");
        return true;
    }

    render() {
        const {language} =this.props
        return (
            <View style={styles.container}>
                <DewormingDetails
                    language={language}
                    dewormingDetails={this.props.dewormingDetails}
                    onbackPress={this.handleBackPress}
                    handlePressDewormingEdit={this.onPressDewormingEdit}
                    toolbarTitle="Deworming Details"
                    enableBilling={this.props.enableBilling}
                    permissionsToModify={
                        this.props.userDetails.authorities &&
                        (this.props.userDetails.authorities.includes("ROLE_ADMIN")
                        || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                    isShowImages={this.props.isShowImages}
                    activateBackButton={this.activateBackButton}
                    deactivateBackButton={this.deactivateBackButton}
                />
            </View>
        );
    }
}

DewormingDetailsContainer.propTypes = propTypes;

DewormingDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    dewormingDetails: state.healthModuleReducer.dewormingDetails,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language,
    isSelf: state.farmAdminReducer.userDetails.login === (state.healthModuleReducer.dewormingDetails.inspectedBy ? state.healthModuleReducer.dewormingDetails.inspectedBy.login : ""),
    enableBilling: (state.lookupDataReducer.orgConfiguration.find(data => data.configName === "ENABLE_BILLING")).value === "TRUE",
    isShowImages: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ALLOW_CATTLE_IMAGE_FOR_TRANSACTION")
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DewormingDetailsContainer);
