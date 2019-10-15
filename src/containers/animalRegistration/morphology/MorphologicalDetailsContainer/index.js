import {connect} from "react-redux";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";
import PropTypes from "prop-types";

import authenticatedLayer from "../../../authenticatedLayer";
import Footer from "../../../../components/Footer";
import MorphologicalDetails from "../../../../templates/registerAnimalTemplates/morphologyTemplates/MorphologicalDetails";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";
import {handleCheckInventory} from "../../../../utils/utility";

import styles from "./styles";

const propTypes = {
    morphologicalDetails: PropTypes.object,
    userDetails: PropTypes.object
};

const defaultProps = {
    morphologicalDetails: {},
    userDetails: {}
};

class MorphologicalDetailsContainer extends Component {

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
        navigateBack("dashboard");
        return true;
    }

    onPressMorphologyEdit = () => {
        navigateTo("recordMorphology", {isEditMorphologyDetails: true, comingFrom: "recordMorphology"});
    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.container}>
                <MorphologicalDetails
                    language={language}
                    morphologicalDetails={this.props.morphologicalDetails}
                    onbackPress={()=>{this.handleBackPress()}}
                    handlePressMorphologyEdit={this.onPressMorphologyEdit}
                    permissionsToModify={this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                    toolbarTitle= {I18n.t('morphologicalDetails', {locale:language})}
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

MorphologicalDetailsContainer.propTypes = propTypes;

MorphologicalDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    morphologicalDetails: state.animalMgmtReducer.morphologicalDetails,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language,
    isShowImages: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ALLOW_CATTLE_IMAGE_FOR_TRANSACTION")
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(MorphologicalDetailsContainer));
