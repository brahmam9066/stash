import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View} from "react-native";

import authenticatedLayer from "../../../authenticatedLayer";
import CalfBirthDetails from "../../../../templates/breedModules/calfBirthTemplates/CalfBirthDetails";
import {getMorphologicalCurrentDetailsAction, getAnimalProfiledetailsAction} from "../../../../actions/registerAnimal.actions";
import {getCalfBirthDetailsAction} from "../../../../actions/breedModule.actions";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import Footer from "../../../../components/Footer";
import {CattleDetailsIcons} from "../../../../assets";
import {setActiveRoute} from "../../../../actions/routes.action";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    dispatch: PropTypes.func,
    token: PropTypes.string,
    animalDetails: PropTypes.object,
    item: PropTypes.object,
    morphologicalDetails: PropTypes.any,
    calfBirthDetails: PropTypes.object,
    handleGetCalfBirthDetailsAction: PropTypes.func,
    handleGetMorphologicalCurrentDetailsAction: PropTypes.func,
    handleSetActiveRoute: PropTypes.func,
    routeName: PropTypes.string
};

const defaultProps = {
    dispatch: () => {},
    token: "",
    animalDetails: {},
    item: {},
    morphologicalDetails: {},
    calfBirthDetails: {},
    handleGetCalfBirthDetailsAction: () => {},
    handleGetMorphologicalCurrentDetailsAction: () => {},
    handleSetActiveRoute: () => {},
    routeName: ""
};


class CalfBirthDetailsContainer extends Component {


  calfTabList = language => [
        {
            tabName: I18n.t("vaccination", {locale: language}),
            tabIcon: CattleDetailsIcons.iconVaccination,
            tabUniqueId: "vaccinationListing"
        },
        {
            tabName: I18n.t("observation", {locale: language}),
            tabIcon: CattleDetailsIcons.iconObservation,
            tabUniqueId: "observationListing"
        },
        {
            tabName: I18n.t("deworming", {locale: language}),
            tabIcon: CattleDetailsIcons.iconDeWorning,
            tabUniqueId: "dewormingListing"
        },
        {
            tabName: I18n.t("dehorning", {locale: language}),
            tabIcon: CattleDetailsIcons.iconDeHorning,
            tabUniqueId: "dehorningListing"
        }

    ];

    componentDidMount() {
        const {calfBirthDetails, morphologicalDetails} = this.props;
        const calfId = calfBirthDetails.id;
        this.props.handleGetCalfBirthDetailsAction(calfId, this.props.token);
        this.props.handleGetMorphologicalCurrentDetailsAction(calfId, this.props.token);
        this.props.handleSetActiveRoute(this.props.routeName);
    }

    onTabPress = (tabId) => {
        navigateTo(tabId);
    }

    navigateToRecordCalfProfile = () => {
        navigateTo("profileInformation", {isEditProfileInfo: true, comingFrom: "calfDetails"});
    }

    render() {
        const{language,calfTabList} = this.props
        return (
            <View style={styles.container}>
                <CalfBirthDetails
                    calfDetails={this.props.calfBirthDetails}
                    morphologicalDetails={this.props.morphologicalDetails}
                    calfBirthDetails={this.props.calfBirthDetails}
                    onbackPress={navigateBack}
                    editEvent={this.navigateToRecordCalfProfile}
                    toolbarTitle={I18n.t('calfBirthDetails', {locale:language})}
                    tabList={calfTabList}
                    language={language}
                    handleTabPress={this.onTabPress}
                />
                <Footer 
                language={language}/>
            </View>
        );
    }
}

CalfBirthDetailsContainer.propTypes = propTypes;

CalfBirthDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    morphologicalDetails: state.animalMgmtReducer.morphologicalDetails,
    calfBirthDetails: state.breedModuleReducer.calfBirthDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetCalfBirthDetailsAction: (id, token) => dispatch(getCalfBirthDetailsAction(id, token)),
    handleGetMorphologicalCurrentDetailsAction: (id, token) => dispatch(getMorphologicalCurrentDetailsAction(id, token)),
    handleSetActiveRoute: route => dispatch(setActiveRoute(route))

});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(CalfBirthDetailsContainer));
