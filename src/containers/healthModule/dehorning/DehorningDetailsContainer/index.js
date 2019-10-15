import {connect} from "react-redux";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";
import PropTypes from "prop-types";

import authenticatedLayer from "../../../authenticatedLayer";
import DehorningDetails from "../../../../templates/healthModule/dehorningTemplates/DehorningDetails";
import Footer from "../../../../components/Footer";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {handleCheckInventory} from "../../../../utils/utility";

import styles from "./styles";

const propTypes = {
    dehorningDetails: PropTypes.object,
    enableBilling: PropTypes.bool,
    userDetails: PropTypes.object,
    isSelf: PropTypes.bool
};

const defaultProps = {
    dehorningDetails: {},
    enableBilling: false,
    userDetails: {},
    isSelf: false
};

class DehorningDetailsContainer extends Component {

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

    handleBackPress = () => {
        navigateBack("dehorningListing");
        return true;
    }

    onPressDehorningEdit = () => {
        navigateTo("recordDehorning", {isEditDehorning: true, comingFrom: "dehorningDetails"});
    }

    onChangeImageUpload = (images) => {
        console.log("onChangeImageUpload", images);
    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.container}>
                <DehorningDetails
                    onbackPress={this.handleBackPress}
                    toolbarTitle="Dehorning Details"
                    dehorningDetails={this.props.dehorningDetails}
                    handlePressDehorningEdit={this.onPressDehorningEdit}
                    enableBilling={this.props.enableBilling}
                    permissionsToModify={this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                    isSelf={this.props.isSelf}
                    language={language}
                    onChangeImageUpload={this.onChangeImageUpload}
                    isShowImages={this.props.isShowImages}
                    activateBackButton={this.activateBackButton}
                    deactivateBackButton={this.deactivateBackButton}
                />
                <Footer
                language={language}/>
            </View>
        );
    }
}

DehorningDetailsContainer.propTypes = propTypes;

DehorningDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    dehorningDetails: state.healthModuleReducer.dehorningDetails,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language,
    isSelf: state.farmAdminReducer.userDetails.login === (state.healthModuleReducer.dehorningDetails.inspectedBy ? state.healthModuleReducer.dehorningDetails.inspectedBy.login : ""),
    enableBilling: (state.lookupDataReducer.orgConfiguration.find(data => data.configName === "ENABLE_BILLING")).value === "TRUE",
    isShowImages: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ALLOW_CATTLE_IMAGE_FOR_TRANSACTION")
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(DehorningDetailsContainer));
