import {connect} from "react-redux";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";
import PropTypes from "prop-types";

import authenticatedLayer from "../../../authenticatedLayer";
import ObservationDetails from "../../../../templates/healthModule/observationsTemplates/ObservationDetails";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import Footer from "../../../../components/Footer";
import {tabList} from "../../navTabList";
import {handleCheckInventory} from "../../../../utils/utility";

import styles from "./styles";

const propTypes = {
    observationRecordData: PropTypes.object,
    enableBilling: PropTypes.bool,
    userDetails: PropTypes.object,
    isSelf: PropTypes.bool
};

const defaultProps = {
    observationRecordData: {},
    enableBilling: false,
    userDetails: {},
    isSelf: false
};

class ObservationDetailsContainer extends Component {

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

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack("observationListing");
        return true;
    }

    onPressTreatmentEdit = () => {
        const {observationRecordData} = this.props;
        const treatment = JSON.parse(JSON.stringify(observationRecordData));
        Object.keys(treatment).forEach((key) => {
            if (typeof treatment[key] === "number") {
                treatment[key] = `${treatment[key]} `;
            }
        });
        navigateTo("recordObservation", {treatmentDetails: treatment, isEditTreatment: true, comingFrom: "observationDetails"});
    }

    onPressPrescriptionEdit = () => {
        const {observationRecordData} = this.props;
        navigateTo("prescription", {treatmentDetails: observationRecordData, isEditPrescription: true});
    }

    onTabPress = () => {

    }

    render() {
        const {observationRecordData,language} = this.props;
        return (
            <View style={styles.container}>
                <ObservationDetails
                    language={language}
                    onbackPress={this.handleBackPress}
                    toolbarTitle="Observation Details"
                    treatmentDetails={observationRecordData}
                    enableBilling={this.props.enableBilling}
                    handlePressTreatmentEdit={this.onPressTreatmentEdit}
                    permissionsToModify={this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                    isSelf={this.props.isSelf}
                    handlePressPrescriptionEdit={this.onPressPrescriptionEdit}
                    tabList={tabList}
                    handleTabPress={this.onTabPress}
                    isShowImages={this.props.isShowImages}
                    activateBackButton={this.activateBackButton}
                    deactivateBackButton={this.deactivateBackButton}
                />
                <Footer language={language}/>
            </View>
        );
    }
}

ObservationDetailsContainer.propTypes = propTypes;

ObservationDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    observationRecordData: state.healthModuleReducer.observationRecordData,
    userDetails: state.farmAdminReducer.userDetails,
    isSelf: state.farmAdminReducer.userDetails.login === (state.healthModuleReducer.observationRecordData.inspectedBy ? state.healthModuleReducer.observationRecordData.inspectedBy.login : ""),
    language: state.localeReducer.language,   
    enableBilling: (state.lookupDataReducer.orgConfiguration.find(data => data.configName === "ENABLE_BILLING")).value === "TRUE",
    isShowImages: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ALLOW_CATTLE_IMAGE_FOR_TRANSACTION")
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(ObservationDetailsContainer));
