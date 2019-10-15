import {connect} from "react-redux";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";
import PropTypes from "prop-types";

import authenticatedLayer from "../../../authenticatedLayer";
import BCSDetails from "../../../../templates/breedModules/bodyConditionScoreTemplates/BCSDetails";
import Footer from "../../../../components/Footer";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";
import {handleCheckInventory} from "../../../../utils/utility";

import styles from "./styles";

const propTypes = {
    bcsDetails: PropTypes.object,
    userDetails: PropTypes.object
};

const defaultProps = {
    bcsDetails: {},
    userDetails: {}
};

class BCSDetailsContainer extends Component {

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
        navigateBack("bcsListing");
        return true;
    }

    onPressBcsEdit = () => {
        navigateTo("bodyConditionScore", {isEditBcs: true, comingFrom: "bcsDetails"});
    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.container}>
                <BCSDetails
                    onbackPress={this.handleBackPress}
                    toolbarTitle= {I18n.t('bcsDetails', {locale:language})}
                    bcsDetails={this.props.bcsDetails}
                    handlePressEditBCS={this.onPressBcsEdit}
                    language={language}
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

BCSDetailsContainer.propTypes = propTypes;

BCSDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    bcsDetails: state.breedModuleReducer.bcsDetails,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language,
    isShowImages: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ALLOW_CATTLE_IMAGE_FOR_TRANSACTION")
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(BCSDetailsContainer));
