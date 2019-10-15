import {connect} from "react-redux";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";
import PropTypes from "prop-types";

import authenticatedLayer from "../../authenticatedLayer";
import Footer from "../../../components/Footer";
import AnimalDetails from "../../../templates/registerAnimalTemplates/AnimalDetails";
import {navigateBack, navigateTo} from "../../../utils/utility";
import {
    getAnimalProfiledetailsAction,
    getCattlePregnancyDetailsCurrentAction,
    getMorphologicalCurrentDetailsAction
} from "../../../actions/registerAnimal.actions";
import  I18n from "../../../utils/language.utils";
import {Actions} from "react-native-router-flux";

import styles from "./styles";

const propTypes = {
    animalDetails: PropTypes.object,
    dispatch: PropTypes.func,
    token: PropTypes.string,
    morphologicalDetails: PropTypes.any,
    morphologicalCurrentDetails: PropTypes.object,
    cattleInseminationDetails: PropTypes.array,
    cattlePregnancyDetails: PropTypes.array,
    cattlePregnancyCurrentDetails: PropTypes.object,
    comingFrom: PropTypes.string,
    selectedAnimalDetails: PropTypes.object,
    userDetails: PropTypes.object
};

const defaultProps = {
    animalDetails: {},
    dispatch: () => { },
    token: "",
    morphologicalDetails: [],
    morphologicalCurrentDetails: {},
    cattleInseminationDetails: [],
    cattlePregnancyDetails: [],
    cattlePregnancyCurrentDetails: {},
    comingFrom: "",
    selectedAnimalDetails: {},
    userDetails: {}
};

class AnimalDetailsContainer extends Component {

    componentDidMount() {
        const {animalDetails, selectedAnimalDetails,language} = this.props;
        let animalId = animalDetails.id;
        let stellacode = animalDetails.stellaCode;
        if (this.props.comingFrom === "cattleDetails") {
            animalId = selectedAnimalDetails.id;
            stellacode = selectedAnimalDetails.stellaCode;
        }
        console.log(stellacode, selectedAnimalDetails);
        this.props.dispatch(getAnimalProfiledetailsAction(animalId, this.props.token));
        // this.props.dispatch(getCattlePregnancyDetailsAction(animalId, this.props.token));
        this.props.dispatch(getCattlePregnancyDetailsCurrentAction(animalId, this.props.token));
        this.props.dispatch(getMorphologicalCurrentDetailsAction(animalId, this.props.token));

        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.props.comingFrom === "cattleDetails") {
        navigateBack();
        }else {
            navigateBack("dashboard");
        }
        return true;
    }

    render() {
        console.log(this.props);
        const {language} = this.props
        return (
            <View style={styles.container}>
                <AnimalDetails
                    language={this.props.language}
                    animalDetails={this.props.animalDetails}
                    cattlePregnancyDetails={this.props.cattlePregnancyDetails}
                    cattlePregnancyCurrentDetails={this.props.cattlePregnancyCurrentDetails}
                    cattleInseminationDetails={this.props.cattleInseminationDetails}
                    morphologicalDetails={this.props.morphologicalDetails}
                    morphologicalCurrentDetails={this.props.morphologicalCurrentDetails}
                    // onbackPress={() => navigateBack()}
                    onbackPress={() => {
                        if (this.props.comingFrom === "cattleDetails" || this.props.comingFrom === "breeds") {
                            navigateBack("animalListing");
                        } else if (this.props.comingFrom === "dashboard" || this.props.comingFrom === "morphologicalDetails" || Actions.currentScene === "animalDetails") {
                            navigateBack("dashboard");
                        } else {
                            navigateBack();
                        }
                    }}
                    toolbarTitle={I18n.t('animalDetails', {locale:language})}
                    permissionsToModify={this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER") ||
                     this.props.userDetails.authorities.includes("ROLE_EXTENSION_OFFICER") || this.props.userDetails.authorities.includes("ROLE_ADMIN")
                     || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                />
                <Footer 
                language={language}/>
            </View>
        );
    }
}

AnimalDetailsContainer.propTypes = propTypes;

AnimalDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    animalDetails: state.animalMgmtReducer.animalDetails,
    cattlePregnancyDetails: state.animalMgmtReducer.cattlePregnancyDetails,
    cattleInseminationDetails: state.animalMgmtReducer.cattleInseminationDetails,
    morphologicalDetails: state.animalMgmtReducer.morphologicalDetails,
    cattlePregnancyCurrentDetails: state.animalMgmtReducer.cattlePregnancyCurrentDetails,
    morphologicalCurrentDetails: state.animalMgmtReducer.morphologicalCurrentDetails,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(AnimalDetailsContainer));
