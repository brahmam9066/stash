import {connect} from "react-redux";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";
import PropTypes from "prop-types";

import authenticatedLayer from "../../../authenticatedLayer";
import VaccinationDetails from "../../../../templates/healthModule/vaccinationTemplates/VaccinationDetails";
import Footer from "../../../../components/Footer";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";
import {handleCheckInventory} from "../../../../utils/utility";

import styles from "./styles";

const propTypes = {
    vaccinationDetails: PropTypes.object,
    enableBilling: PropTypes.bool,
    userDetails: PropTypes.object,
    isSelf: PropTypes.bool
};

const defaultProps = {
    vaccinationDetails: {},
    enableBilling: false,
    userDetails: {},
    isSelf: false
};

class VaccinationDetailsContainer extends Component {

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
        navigateBack("vaccinationListing");
        return true;
    }

    onPressVaccinationEdit = () => {
        navigateTo("recordVaccination", {isEditVaccination: true});
    }

    onChangeImageUpload = (images) => {
        console.log("onChangeImageUpload", images);
    }

    render() {
        const {language} = this.props;
        return (
            <View style={styles.container}>
                <VaccinationDetails
                    onbackPress={() => navigateBack("vaccinationListing")}
                    toolbarTitle= {I18n.t('vaccinationDetails', {locale:language})}
                    vaccinationDetails={this.props.vaccinationDetails}
                    permissionsToModify={this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                    enableBilling={this.props.enableBilling}
                    isSelf={this.props.isSelf}
                    language={language}
                    onChangeImageUpload={this.onChangeImageUpload}
                    handlePressVaccinationEdit={this.onPressVaccinationEdit}
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

VaccinationDetailsContainer.propTypes = propTypes;

VaccinationDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    vaccinationDetails: state.healthModuleReducer.vaccinationDetails,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language,
    isSelf: state.farmAdminReducer.userDetails.login === (state.healthModuleReducer.vaccinationDetails.inspectedBy ? state.healthModuleReducer.vaccinationDetails.inspectedBy.login : ""),
    enableBilling: (state.lookupDataReducer.orgConfiguration.find(data => data.configName === "ENABLE_BILLING")).value === "TRUE",
    isShowImages: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ALLOW_CATTLE_IMAGE_FOR_TRANSACTION")
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(VaccinationDetailsContainer));
