import {connect} from "react-redux";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";
import PropTypes from "prop-types";

import authenticatedLayer from "../../../authenticatedLayer";
import BWMDetails from "../../../../templates/breedModules/bodyWeightMeasurementTemplates/BWMDetails";
import Footer from "../../../../components/Footer";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";
import {handleCheckInventory} from "../../../../utils/utility";

import styles from "./styles";

const propTypes = {
    bwmDetails: PropTypes.object,
    userDetails: PropTypes.object
};

const defaultProps = {
    bwmDetails: {},
    userDetails: {}
};

class BWMDetailsContainer extends Component {

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
        navigateBack("bodyWeightMgmtListing");
        return true;
    }

    onPressBwmEdit = () => {
        navigateTo("bodyWeightMeasurement", {isEditBwm: true, comingFrom: "bwmDetails"});
    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.container}>
                <BWMDetails
                    onbackPress={this.handleBackPress}
                    toolbarTitle= {I18n.t('bwmDetails', {locale:language})}
                    language={language}
                    bwmDetails={this.props.bwmDetails}
                    handlePressEditBwm={this.onPressBwmEdit}
                    permissionsToModify={this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
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

BWMDetailsContainer.propTypes = propTypes;

BWMDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    bwmDetails: state.breedModuleReducer.bwmDetails,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language,
    isShowImages: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ALLOW_CATTLE_IMAGE_FOR_TRANSACTION")
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(BWMDetailsContainer));
