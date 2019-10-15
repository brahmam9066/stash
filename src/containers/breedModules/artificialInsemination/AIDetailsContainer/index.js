import {connect} from "react-redux";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import authenticatedLayer from "../../../authenticatedLayer";
import AIDetails from "../../../../templates/breedModules/artificialInseminationTemplates/AIDetails";
import Footer from "../../../../components/Footer";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getAnimalProfiledetailsAction, getCurrentInseminationAction} from "../../../../actions/registerAnimal.actions";
import {getPregnancyList} from "../../../../actions/breedModule.actions";
import {handleCheckInventory} from "../../../../utils/utility";

import styles from "./styles";

const propTypes = {
    aIDetails: PropTypes.object,
    token: PropTypes.string,
    enableBilling: PropTypes.bool,
    animalDetails: PropTypes.object,
    userDetails: PropTypes.object,
    latestPregnancy: PropTypes.object,
    handleGetAnimalProfiledetailsAction: PropTypes.func,
    handleGetPregnancyList: PropTypes.func
};

const defaultProps = {
    aIDetails: {},
    token: "",
    enableBilling: false,
    animalDetails: {},
    userDetails: {},
    latestPregnancy: {},
    handleGetAnimalProfiledetailsAction: () => {},
    handleGetPregnancyList: () => {}
};

class AIDetailsContainer extends Component {

    state = {
        latestInsemination: {}
    };

    componentDidMount() {
        this.props.handleGetAnimalProfiledetailsAction(this.props.aIDetails.cattle, this.props.token);
        this.props.handleGetPregnancyList(this.props.aIDetails.cattle, this.props.token).then((data) => {
            if (data) this.latestInsemination(data[0].inseminations);
        });
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
        navigateBack("artificialInseminationListing");
        return true;
    }

    latestInsemination = (inseminations) => {
        if (inseminations) {
            let latestInsemination = {inseminationDate: moment("1900-03-24", "YYYY-MM-DD")};
            inseminations.map((insemination) => {
                if (moment(insemination.inseminationDate, "YYYY-MM-DD") > moment(latestInsemination.inseminationDate, "YYYY-MM-DD")) {
                    latestInsemination = insemination;
                }
                return null;
            });
            this.setState({latestInsemination: inseminations.length === 0 ? {} : latestInsemination});
        }
    }

    render() {
        const {language,aIDetails} = this.props
        return (
            <View style={styles.container}>
                <AIDetails
                    onbackPress={() => navigateBack("artificialInseminationListing")}
                    toolbarTitle="Artificial Insemination Details"
                    aIDetails={this.props.aIDetails}
                    language={language}
                    animalDetails={this.props.animalDetails}
                    handlePressDehorningEdit={this.onPressDehorningEdit}
                    latestPregnancy={this.props.latestPregnancy}
                    latestInsemination={this.state.latestInsemination}
                    enableBilling={this.props.enableBilling}
                    permissionsToModify={aIDetails.status !== 'fail' && this.props.userDetails.authorities && (
                        this.props.userDetails.authorities.includes("ROLE_ADMIN") ||
                        this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN") ||
                        this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER") ||
                        this.props.userDetails.authorities.includes("ROLE_EXTENSION_OFFICER")
                    )}
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

AIDetailsContainer.propTypes = propTypes;

AIDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    language: state.localeReducer.language,
    aIDetails: state.breedModuleReducer.aIDetails,
    animalDetails: state.animalMgmtReducer.animalDetails,
    userDetails: state.farmAdminReducer.userDetails,
    latestPregnancy: state.breedModuleReducer.pregnancyList[0] ? state.breedModuleReducer.pregnancyList[0] : {},
    enableBilling: (state.lookupDataReducer.orgConfiguration.find(data => data.configName === "ENABLE_BILLING")).value === "TRUE",
    isShowImages: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ALLOW_CATTLE_IMAGE_FOR_TRANSACTION")
});

const mapDispatchToProps = dispatch => ({
    handleGetPregnancyList: (cattleID, token) => dispatch(getPregnancyList(cattleID, token)),
    handleGetAnimalProfiledetailsAction: (cattleID, token) => dispatch(getAnimalProfiledetailsAction(cattleID, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(AIDetailsContainer));
