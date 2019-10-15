import {connect} from "react-redux";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";
import PropTypes from "prop-types";

import authenticatedLayer from "../../../authenticatedLayer";
import PDDetails from "../../../../templates/breedModules/pregnancyDetectionTemplates/PDDetails";
import Footer from "../../../../components/Footer";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getAnimalProfiledetailsAction, getInseminationDetailsAction} from "../../../../actions/registerAnimal.actions";
import  I18n from "../../../../utils/language.utils";
import {handleCheckInventory} from "../../../../utils/utility";

import styles from "./styles";

const propTypes = {
    pdDetails: PropTypes.object,
    dispatch: PropTypes.func,
    token: PropTypes.string,
    enableBilling: PropTypes.bool
};

const defaultProps = {
    pdDetails: {},
    dispatch: () => {},
    token: "",
    enableBilling: false
};

class PDDetailsContainer extends Component {

    componentDidMount() {
        this.props.dispatch(getAnimalProfiledetailsAction(this.props.pdDetails.cattle, this.props.token));
        this.props.dispatch(getInseminationDetailsAction(this.props.pdDetails.insemination, this.props.token));
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
    if (this.props.comingFrom === "recordPD") {
        navigateBack("aIDetails");
        return true;
    } else {
        navigateBack("pregnancyDetectionListing");
        return true;
    }
}

    render() {
        const {comingFrom,language} = this.props;
        return (
            <View style={styles.container}>
                <PDDetails
                    onbackPress={this.handleBackPress}
                    toolbarTitle={I18n.t('pdDetails', {locale:language})}
                    pdDetails={this.props.pdDetails}
                    animalDetails={this.props.animalDetails}
                    inseminationDetails={this.props.inseminationDetails}
                    enableBilling={this.props.enableBilling}
                    language={language}
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

PDDetailsContainer.propTypes = propTypes;

PDDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    pdDetails: state.breedModuleReducer.PDDetails,
    language: state.localeReducer.language,
    token: state.authReducer.token,
    inseminationDetails: state.animalMgmtReducer.inseminationDetails,
    animalDetails: state.animalMgmtReducer.animalDetails,
    enableBilling: (state.lookupDataReducer.orgConfiguration.find(data => data.configName === "ENABLE_BILLING")).value === "TRUE",
    isShowImages: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ALLOW_CATTLE_IMAGE_FOR_TRANSACTION")
});

const mapDispatchToProps = dispatch => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(PDDetailsContainer));
