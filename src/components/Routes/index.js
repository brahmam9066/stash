import PropTypes from "prop-types";
import React, {Component} from "react";
import {BackHandler} from "react-native";
import {Router, Scene} from "react-native-router-flux";
import Config from "react-native-config";

// Authentication
import RegisterContainer from "../../containers/authentication/RegisterContainer";
import LoginContainer from "../../containers/authentication/LoginContainer";
import ForgotPasswordContainer from "../../containers/authentication/ForgotPasswordContainer";
import VerifyOtpContainer from "../../containers/authentication/VerifyOtpContainer";
import CreateNewPasswordContainer from "../../containers/authentication/CreateNewPasswordContainer";
import PasswordContainer from "../../containers/authentication/PasswordContainer";
import ChangePasswordContainer from "../../containers/authentication/ChangePasswordContainer";
import LanguagePreferenceContainer from "../../containers/authentication/LanguagePreferenceContainer";

// Dashboard
import DashboardContainer from "../../containers/DashboardContainer";

// Farm Administration
import FarmAdministrationContainer from "../../containers/farmAdministration/FarmAdministrationContainer";
import MyAccountContainer from "../../containers/farmAdministration/MyAccountContainer";
import UserProfileDetailsContainer from "../../containers/farmAdministration/UserProfileDetailsContainer";
import UserProfileFormContainer from "../../containers/farmAdministration/UserProfileFormContainer";
import FarmProfileDetailsContainer from "../../containers/farmAdministration/FarmProfileDetailsContainer";
import FarmProfileFormContainer from "../../containers/farmAdministration/FarmProfileFormContainer";

// Register Animal
import ProfileInformationContainer from "../../containers/animalRegistration/ProfileInformationContainer";
import BreedInformationContainer from "../../containers/animalRegistration/BreedInformationContainer";
import MorphologyAnimalRegistrationContainer from "../../containers/animalRegistration/MorphologyAnimalRegistrationContainer";

// Animal Listing
import AnimalDetailsContainer from "../../containers/animalRegistration/AnimalDetailsContainer";
import AnimalListingContainer from "../../containers/animalRegistration/AnimalListingContainer";
import CattleDetailsContainer from "../../containers/animalRegistration/CattleDetailsContainer";


// Calf-Heifer Listing
import CalfHeiferListingContainer from "../../containers/animalRegistration/CalfHeiferListingContainer";
import CalfHeiferDetailsContainer from "../../containers/animalRegistration/CalfHeiferDetailsContainer";

// Observation
import ObservationListingContainer from "../../containers/healthModule/observations/ObservationListingContainer";
import RecordObservationContainer from "../../containers/healthModule/observations/RecordObservationContainer";
import PrescriptionContainer from "../../containers/healthModule/observations/PrescriptionContainer";
import ObservationDetailsContainer from "../../containers/healthModule/observations/ObservationDetailsContainer";

// Vaccination
import VaccinationListingContainer from "../../containers/healthModule/vaccination/VaccinationListingContainer";
import VaccinationDetailsContainer from "../../containers/healthModule/vaccination/VaccinationDetailsContainer";
import RecordVaccinationContainer from "../../containers/healthModule/vaccination/RecordVaccinationContainer";

// Dehorning
import RecordDehorningContainer from "../../containers/healthModule/dehorning/RecordDehorningContainer";
import DehorningListingContainer from "../../containers/healthModule/dehorning/DehorningListingContainer";
import DehorningDetailsContainer from "../../containers/healthModule/dehorning/DehorningDetailsContainer";

// camera
import Camera from "../../containers/Camera";

// deworming
import DewormingListingContainer from "../../containers/healthModule/deworming/DewormingListingContainer";
import DewormingDetailsContainer from "../../containers/healthModule/deworming/DewormingDetailsContainer";
import RecordDewormingContainer from "../../containers/healthModule/deworming/RecordDewormingContainer";

// artificial Insemination

import ArtificialInseminationListingContainer from "../../containers/breedModules/artificialInsemination/ArtificialInseminationListingContainer";
import AIDetailsContainer from "../../containers/breedModules/artificialInsemination/AIDetailsContainer";
import RecordAIContainer from "../../containers/breedModules/artificialInsemination/RecordAIContainer";

// pregnancy Detection

import PregnancyDetectionListingContainer from "../../containers/breedModules/pregnancyDetection/PregnancyDetectionListingContainer";
import PDDetailsContainer from "../../containers/breedModules/pregnancyDetection/PDDetailsContainer";
import RecordPDContainer from "../../containers/breedModules/pregnancyDetection/RecordPDContainer";

// Calf Birth

import CalfBirthListingContainer from "../../containers/breedModules/calfBirth/CalfBirthListingContainer";
import CalfBirthDetailsContainer from "../../containers/breedModules/calfBirth/CalfBirthDetailsContainer";
import CalfBirthContainer from "../../containers/breedModules/calfBirth/CalfBirthContainer";

// Sale

import SaleContainer from "../../containers/animalRegistration/Sale/SaleContainer";
import TransferContainer from "../../containers/animalRegistration/TransferContainer";

// BCS and BWM

import BodyConditionScoreContainer from "../../containers/breedModules/bodyConditionScore/BodyConditionScoreContainer";
import BCSDetailsContainer from "../../containers/breedModules/bodyConditionScore/BCSDetailsContainer";
import BodyConditionScoreListingContainer from "../../containers/breedModules/bodyConditionScore/BodyConditionScoreListingContainer";
import BCSSwipper from "../../containers/breedModules/bodyConditionScore/BCSSwipper";

// BWM

import BodyWeightMeasurementContainer from "../../containers/breedModules/bodyWeightMeasurement/BodyWeightMeasurementContainer";
import BodyWeightMgmtListingContainer from "../../containers/breedModules/bodyWeightMeasurement/BodyWeightMgmtListingContainer";
import BWMDetailsContainer from "../../containers/breedModules/bodyWeightMeasurement/BWMDetailsContainer";

// Milk-log

import MilkLogListingContainer from "../../containers/productionModules/milkLog/MilkLogListingContainer";
import RecordMilkLogContainer from "../../containers/productionModules/milkLog/RecordMilkLogContainer";
import MilkLogDetailsContainer from "../../containers/productionModules/milkLog/MilkLogDetailContainer";

// Prgnancy History

import PregnancyHistoryListContainer from "../../containers/breedModules/pregnancyHistory/PregnancyHistoryListContainer";
import PregnancyHistoryDetailsContainer from "../../containers/breedModules/pregnancyHistory/PregnancyHistoryDetailsContainer";

// Lactation graph

import LactationGraphContainer from "../../containers/productionModules/LactationGraphContainer";

// Morphology details

import MorphologicalListingContainer from "../../containers/animalRegistration/morphology/MorphologicalListingContainer";
import MorphologicalDetailsContainer from "../../containers/animalRegistration/morphology/MorphologicalDetailsContainer";
import RecordMorphologyContainer from "../../containers/animalRegistration/morphology/RecordMorphologyContainer";

// Dry-oof

import RecordDryOffContainer from "../../containers/animalRegistration/DryOffContainer";

// loader

import Loader from "../Loading";
import Loaderer from "../Loader";

// farm

import FarmListingContainer from "../../containers/animalRegistration/farm/FarmListingContainer";
import FarmDetailsContainer from "../../containers/animalRegistration/farm/FarmDetailsContainer";
import RecordFarmContainer from "../../containers/animalRegistration/farm/RecordFarmContainer";

// image view

import ImageViewer from "../ImageViewer";

import NutritionListing from "../../containers/nutritionContainer/nutritionListing";
import RecordNutrition from "../../containers/nutritionContainer/recordNutrition";
import NutritionDetails from "../../containers/nutritionContainer/nutritionDetails";

// about us

import AboutUs from "../../components/AboutUs";

// contact us

import ContactUs from "../../components/ContactUs";

const propTypes = {
    isLoggedin: PropTypes.bool
};

const defaultProps = {
    isLoggedin: false
};

export default class Routes extends Component {

    handleBackButton() {
        BackHandler.exitApp();
        return true;
    }

    render() {
        const {isLoggedin} = this.props;
        return (
            <Router {...this.props}  backAndroidHandler={this.handleBackButton.bind(this)}>
                <Scene>
                    <Scene key="auth" hideNavBar={true} initial={!isLoggedin}>
                        <Scene key="signup" component={RegisterContainer} />
                        <Scene key="login" component={LoginContainer} initial />
                        <Scene key="forgotPassword" component={ForgotPasswordContainer} />
                        <Scene key="verifyOtp" component={VerifyOtpContainer} />
                        <Scene key="createNewPassword" component={CreateNewPasswordContainer} />
                        <Scene key="password" component={PasswordContainer} />
                        <Scene key="loaderer" component={Loaderer} />
                    </Scene>
                    <Scene key="app" hideNavBar={true} initial={isLoggedin}>
                        <Scene key="dashboard" component={DashboardContainer} />
                        <Scene key="farmAdministration" component={FarmAdministrationContainer} />
                        <Scene key="changePassword" component={ChangePasswordContainer} />
                        <Scene key="languagePreference" component={LanguagePreferenceContainer} />
                        <Scene key="myAccount" component={MyAccountContainer} />
                        <Scene key="profileInformation" component={ProfileInformationContainer} />
                        <Scene key="breedInformation" component={BreedInformationContainer} />
                        <Scene key="recordMorphologyAnimalRegistration" component={MorphologyAnimalRegistrationContainer} />
                        <Scene key="profileDetails" component={UserProfileDetailsContainer} />
                        <Scene key="userRegistration" component={UserProfileFormContainer} />
                        <Scene key="farmProfile" component={FarmProfileDetailsContainer} />
                        <Scene key="farmProfileRegistration" component={FarmProfileFormContainer} />
                        <Scene key="animalDetails" component={AnimalDetailsContainer} />
                        <Scene key="animalListing" component={AnimalListingContainer} />
                        <Scene key="cattleDetails" component={CattleDetailsContainer} />
                        <Scene key="calfHeiferListing" component={CalfHeiferListingContainer} />
                        <Scene key="calfHeiferDetails" component={CalfHeiferDetailsContainer} />
                        <Scene key="observationListing" component={ObservationListingContainer} />
                        <Scene key="recordObservation" component={RecordObservationContainer} />
                        <Scene key="prescription" component={PrescriptionContainer} />
                        <Scene key="observationDetails" component={ObservationDetailsContainer} />
                        <Scene key="vaccinationListing" component={VaccinationListingContainer} />
                        <Scene key="vaccinationDetails" component={VaccinationDetailsContainer} />
                        <Scene key="recordVaccination" component={RecordVaccinationContainer} />
                        <Scene key="dewormingListing" component={DewormingListingContainer} />
                        <Scene key="dewormingDetails" component={DewormingDetailsContainer} />
                        <Scene key="recordDeworming" component={RecordDewormingContainer} />
                        <Scene key="recordDehorning" component={RecordDehorningContainer} />
                        <Scene key="dehorningListing" component={DehorningListingContainer} />
                        <Scene key="dehorningDetails" component={DehorningDetailsContainer} />
                        <Scene key="artificialInseminationListing" component={ArtificialInseminationListingContainer} />
                        <Scene key="aIDetails" component={AIDetailsContainer} />
                        <Scene key="recordAI" component={RecordAIContainer} />
                        <Scene key="pregnancyDetectionListing" component={PregnancyDetectionListingContainer} />
                        <Scene key="pdDetails" component={PDDetailsContainer} />
                        <Scene key="recordPD" component={RecordPDContainer} />
                        <Scene key="calfBirthListing" component={CalfBirthListingContainer} />
                        <Scene key="calfBirthDetails" component={CalfBirthDetailsContainer} />
                        <Scene key="calfBirth" component={CalfBirthContainer} />
                        <Scene key="sale" component={SaleContainer} />
                        <Scene key="transfer" component={TransferContainer} />
                        <Scene key="bodyConditionScore" component={BodyConditionScoreContainer} />
                        <Scene key="bcsDetails" component={BCSDetailsContainer} />
                        <Scene key="bcsListing" component={BodyConditionScoreListingContainer} />
                        <Scene key="bcsSwipper" component={BCSSwipper} />
                        <Scene key="bodyWeightMeasurement" component={BodyWeightMeasurementContainer} />
                        <Scene key="bodyWeightMgmtListing" component={BodyWeightMgmtListingContainer} />
                        <Scene key="bwmDetails" component={BWMDetailsContainer} />
                        <Scene key="milkLogListing" component={MilkLogListingContainer} />
                        <Scene key="recordMilkLog" component={RecordMilkLogContainer} />
                        <Scene key="milkLogDetails" component={MilkLogDetailsContainer} />
                        <Scene key="camera" component={Camera} />
                        <Scene key="pregnancyHistoryList" component={PregnancyHistoryListContainer} />
                        <Scene key="pregnancyHistoryDetails" component={PregnancyHistoryDetailsContainer} />
                        <Scene key="lactationGraph" component={LactationGraphContainer} />
                        <Scene key="morphologicalListing" component={MorphologicalListingContainer} />
                        <Scene key="morphologicalDetails" component={MorphologicalDetailsContainer} />
                        <Scene key="recordMorphology" component={RecordMorphologyContainer} />
                        <Scene key="recordDryOff" component={RecordDryOffContainer} />
                        <Scene key="loading" component={Loader} />
                        <Scene key="farmListing" component={FarmListingContainer} />
                        <Scene key="farmDetails" component={FarmDetailsContainer} />
                        <Scene key="recordFarm" component={RecordFarmContainer} />
                        <Scene key="recordNutrition" component={RecordNutrition} />
                        <Scene key="nutritionListing" component={NutritionListing} />
                        <Scene key="nutritionDetails" component={NutritionDetails} />
                        <Scene key="loaderer" component={Loaderer} />
                        <Scene key="imageViewer" component={ImageViewer} />
                        <Scene key="aboutUs" component={AboutUs} />
                        <Scene key="contactUs" component={ContactUs} />
                    </Scene>
                </Scene>
            </Router>
        );
    }
}

Routes.defaultProps = defaultProps;

Routes.propTypes = propTypes;
