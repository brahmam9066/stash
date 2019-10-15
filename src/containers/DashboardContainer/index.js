import PropTypes from "prop-types";
import {connect} from "react-redux";
import React, {Component} from "react";
import {View, Text, NetInfo, BackHandler, Alert} from "react-native";
import I18n from "../../utils/language.utils";

import authenticatedLayer from "../authenticatedLayer";
import Dashboard from "../../templates/Dashboard";
import DrawerAndroid from "../../components/DrawerAndroid/Drawer.android";
import SidebarAndroid from "../../components/SidebarAndroid";
import {navigateTo, request_location_runtime_permission} from "../../utils/utility";
import {getUserDetailsAction, getFarmDetailsAction} from "../../actions/farmAdmin.actions";
import {getCattlesMetaDataAction, createCattleProfileInfoAction,getOrgTypeAction} from "../../actions/registerAnimal.actions";
import {tabList, tabContents, sliderList} from "./tabConfig";
import {SidebarIcons} from "../../assets";
import {getTreatmentListAction, getOrgConfigAction, getHealthMetaDataAction, getVaccinationListAction, getDehorningListAction, getMedicineListAction, getVaccineListAction, createDehorningAction, saveDewormingAction, createVaccinationAction, getDewormerListAction, createTreatmentAction} from "../../actions/healthModule.actions";
import {createAIAction, createPDAction, createCalfbirthAction} from '../../actions/breedModule.actions';
import {cattleSearchAction} from "../../actions/search.actions";
import {cattleScanRequest} from "../../services/search.service";
import Config from "react-native-config";
import styles from "./styles";

const propTypes = {
    handleUserLogout: PropTypes.func,
    userDetails: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    dispatch: PropTypes.func,
    token: PropTypes.string,
    handleCattleSearch: PropTypes.func,
    searchList: PropTypes.array,
    handleEmptyCattleSearch: PropTypes.func,
    handleGetOrgConfig: PropTypes.func,
    handleGetHealthMetaData: PropTypes.func,
    handleEmptyVaccinationList: PropTypes.func,
    handleEmptyDewormingList: PropTypes.func,
    handleGetMedicineList: PropTypes.func,
    handleGetVaccineList: PropTypes.func,
    handleDewormListAction: PropTypes.func
};

const defaultProps = {
    handleUserLogout: () => { },
    userDetails: {},
    isLoggedIn: false,
    dispatch: () => {},
    token: "",
    handleCattleSearch: () => {},
    searchList: [],
    handleEmptyCattleSearch: () => {},
    handleGetOrgConfig: () => {},
    handleGetHealthMetaData: () => {},
    handleEmptyVaccinationList: () => {},
    handleEmptyDewormingList: () => {},
    handleGetMedicineList: () => {},
    handleGetVaccineList: () => {},
    handleDewormListAction: () => {}
};

class DashboardContainer extends Component<{}> {

    navMenu = language => {
        return [
        {
           name: I18n.t('farmAdministration', {locale:language}),
            path: "farmAdministration",
            onPress: () => this.navigateToMenuPage("farmAdministration"),
            icon: SidebarIcons.iconFarmAdministration,
            id: "farm-admin-drawer-button"
        },
        // {
        //     name: I18n.t('languagePreference', {locale:language}),
        //     path: "languagePreference",
        //     onPress: () => this.navigateToMenuPage("languagePreference"),
        //     icon: SidebarIcons.iconLanguage,
        //     id: "language-preference-drawer-button"
        // },
        // {
        //     name: I18n.t('changePassword', {locale:language}),
        //     path: "changePassword",
        //     onPress: () => this.navigateToMenuPage("changePassword"),
        //     icon: SidebarIcons.iconPassword,
        //     id: "change-password-drawer-button"
        // },
        {
            name: I18n.t('aboutUs', {locale:language}),
            path: "",
            onPress: () => this.navigateToMenuPage("aboutUs"),
            icon: SidebarIcons.iconAboutUs,
            id: "about-us-drawer-button"
        },
        {
            name: I18n.t('callUs', {locale:language}),
            path: "",
            onPress: () => this.navigateToMenuPage("contactUs"),
            icon: SidebarIcons.iconCallus,
            id: "call-us-drawer-button"
        },
        {
            name: I18n.t('rateUs', {locale:language}),
            path: "",
            onPress: () => {},
            icon: SidebarIcons.iconrateUs,
            id: "rate-us-drawer-button"
        }
    ];
}

    constructor(props) {
        super(props);
        const isPaid = props.farmDetails.effectiveSubscriptionPlan === "paid" || Config.APP_TYPE === "corporate";
        const tabContentsTemp = tabContents(props.language, [!isPaid ? "farmListing" : null]);
        const defaultTab = tabList(props.language)[0].tabUniqueId;
        this.state = {
            defaultTab,
            tabContentList: tabContentsTemp[defaultTab],
            showModal: false,
            activeTab: defaultTab,
            isPaid: isPaid
        };
    }

   async componentDidMount() {
        this.checkFirstTimeInternetConnection();
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        NetInfo.isConnected.addEventListener("connectionChange", this.handleConnectivityChange);
        if (this.props.isLoggedIn) {
            this.props.dispatch(getUserDetailsAction(this.props.token)).then((data) => {
                if (data.userInfo && data.userInfo.rootOrgId) {
                    this.props.dispatch(getCattlesMetaDataAction(this.props.token));
                    this.props.dispatch(getFarmDetailsAction(data.userInfo.subOrgs[0], this.props.token));
                    this.props.handleGetOrgConfig(this.props.token).then((data)=>{
                        console.log(data, "data");
                        if (handleCheckInventory(data, "ENABLE_MEDICINE_SEARCH")) {
                            this.props.handleEmptyMedicineList();
                            this.props.handleEmptyVaccineList();
                            this.props.handleEmptyDewormerList();
                        } else {
                            this.props.handleGetMedicineList(this.props.token);
                            this.props.handleGetVaccineList(this.props.token);
                            this.props.handleDewormListAction(this.props.token);
                        }
                    });
                    this.props.handleGetHealthMetaData(this.props.token);
                }
            });
            this.props.handleEmptyVaccinationList();
            this.props.handleEmptyDewormingList();
        }
       let location = await request_location_runtime_permission();
       let payload = {lat : location.coords.latitude,lng : location.coords.longitude}
       this.props.setLocation(payload);
    }

    componentDidUpdate(prevProps){
        if( prevProps.farmDetails.effectiveSubscriptionPlan !== this.props.farmDetails.effectiveSubscriptionPlan ) {
            const isPaid = this.props.farmDetails.effectiveSubscriptionPlan === "paid" || Config.APP_TYPE === "corporate";
            const tabContentsTemp = tabContents(this.props.language, [!isPaid ? "farmListing" : null]);
            const defaultTab = tabList(this.props.language)[0].tabUniqueId;
            this.setState({
                isPaid: this.props.farmDetails.effectiveSubscriptionPlan === "paid" || Config.APP_TYPE === "corporate",
                defaultTab,
                tabContentList: tabContentsTemp[defaultTab],
                activeTab: defaultTab
            })
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
        NetInfo.isConnected.removeEventListener("connectionChange", this.handleConnectivityChange);
    }

    handleBackPress = () => {
        // BackHandler.exitApp();
    }

    modalToggle = () => {
        this.setState(prevState => ({showModal: !prevState.showModal}));
    }

    handleOnPressOk = () => {
        this.modalToggle();
        BackHandler.exitApp();
    }

    checkForOfflineData = () => {
        const {dehorningOfflineList, dewormingOfflineList, vaccinationOfflineList,observationOfflineList,aiOfflineList,pdOfflineList,calfBirthOfflineList, cattleOfflineRegistration} = this.props;
        dehorningOfflineList.forEach((dehorning) => {
            this.props.dispatch(createDehorningAction(dehorning, this.props.token)).then((data) => {
                console.log(data, "data uploaded successfully.");
            });
        });
        dewormingOfflineList.forEach((deworming) => {
            this.props.dispatch(saveDewormingAction(deworming, this.props.token)).then((data) => {
                console.log(data, "data uploaded successfully.");
            });
        });
        vaccinationOfflineList.forEach((vaccination) => {
            this.props.dispatch(createVaccinationAction(vaccination, this.props.token)).then((data) => {
                console.log(data, "data uploaded successfully.");
            });
        });
        observationOfflineList.forEach((observation) => {
            this.props.dispatch(createTreatmentAction(observation, this.props.token)).then((data) => {
                console.log(data, "data uploaded successfully.");
            });
        });
        aiOfflineList.forEach((airecord) => {
            this.props.dispatch(createAIAction(airecord, this.props.token)).then((data) => {
                console.log(data, "data uploaded successfully.");
            });
        });
        pdOfflineList.forEach((pdrecord) => {
            this.props.dispatch(createPDAction(pdrecord, this.props.token)).then((data) => {
                console.log(data, "data uploaded successfully.");
            });
        });
        calfBirthOfflineList.forEach((cBrecord) => {
          cattleScanRequest(cBrecord.offlineRegId,this.props.token).then((data)=>{
                    if(data && data.length !==0 ){
                        this.props.dispatch(createCalfbirthAction(data[0].id,cBrecord,this.props.token)).then((data)=>{
                            console.log(data, "data uploaded successfully.");
                        })
                    }else{
                        this.props.dispatch({
                            type: "SERVER_ERROR",
                            isServerError: true,
                            payload: {title: "Invalid cattle for CalfBirth for offline record"}
                        })
                    }
          })
        });
        cattleOfflineRegistration.forEach((offlineCattleRecord) => {
            this.props.dispatch(createCattleProfileInfoAction(offlineCattleRecord, this.props.token)).then((data) => {
                console.log(data, "data uploaded successfully.");
            });
          });
    }

    checkFirstTimeInternetConnection = () => {
        NetInfo.isConnected.fetch().then((isConnected) => {
            this.handleConnectivityChange(isConnected);
        });
    }

    handleConnectivityChange = (isConnected) => {
        this.props.dispatch({
            type: "INTERNET_STATUS",
            payload: isConnected
        });
        if (isConnected) {
            this.checkForOfflineData();
        }
    }

    onMapDrawerElement = (node) => {
        this.drawer = node && node;
    }

    onCloseDrawer = () => {
        if (this.drawer) {
            this.drawer.closeDrawer();
        }
    }

    onOpenDrawer = () => {
        if (this.drawer) {
            this.drawer.openDrawer();
        }
    }

    navigateToMenuPage = (scene) => {
        this.onCloseDrawer();
        navigateTo(scene);
    }

    onTabPress = (tabId) => {
        console.log(tabId);
        this.setState({
            tabContentList: tabContents(this.props.language, [!this.state.isPaid ? "farmListing" : null])[tabId],
            activeTab: tabId
        });
        if (this.searchNode) this.searchNode.clear();
        this.props.handleCattleSearch("", this.props.token);
    }

    onCattleSearch = (searchText, searchNode) => {
        this.props.handleCattleSearch(searchText, this.props.token);
        this.searchNode = searchNode;
    }

    onSearchItemPress = (item, node) => {
        navigateTo("cattleDetails", {selectedAnimalDetails: item, comingFrom: "dashboard"});
        this.props.handleEmptyCattleSearch();
        console.log(node);
        node.clear();
    }

    render() {
        const {userDetails, language} = this.props;
        const navigationView = (<SidebarAndroid  menuList={this.navMenu(language)} 
                                                 userDetails={userDetails} 
                                                 handleUserLogout={this.props.handleUserLogout} 
                                                 language={language}/>);

        return (
            <DrawerAndroid handleMapElement={this.onMapDrawerElement} handleNavigationView={navigationView}>
                <View style={styles.appContainer}>
                    <Dashboard
                        showAlert={(!userDetails.firstName && !userDetails.lastName && !(userDetails.userInfo && userDetails.userInfo.rootOrgId))}
                        alertTitle={userDetails.firstName && userDetails.lastName ? <Text>Complete your Farm Profile</Text> : <Text>Complete your User and Farm Profile</Text>}
                        onPressAlert={() => { navigateTo("myAccount"); }}
                        handlePressLeftIcon={this.onOpenDrawer}
                        tabList={tabList(language)}
                        sliderList={sliderList}
                        handleSearch={this.onCattleSearch}
                        searchList={this.props.searchList}
                        handleSearchItemPress={this.onSearchItemPress}
                        defaultTab={this.state.defaultTab}
                        handleTabPress={this.onTabPress}
                        tabContentList={this.state.tabContentList}
                        showModal={this.state.showModal}
                        onPressOk={this.handleOnPressOk}
                        onPressCancel={this.modalToggle}
                        activeTab={this.state.activeTab}
                        language={language}
                        footerActive={this.state.defaultTab === this.state.activeTab} />
                </View>
            </DrawerAndroid>
        );
    }
}

DashboardContainer.defaultProps = defaultProps;

DashboardContainer.propTypes = propTypes;

handleCheckInventory = (orgConfiguration, key) => {
    console.log("orgConfiguration", orgConfiguration, key);
    const checkInventory = orgConfiguration.filter(item => (item.configName === key));
    if (checkInventory.length > 0 && checkInventory[0].value === "TRUE") {
        return true;
    }
    return false;
}

const mapStateToProps = state => ({
    location:state.healthModuleOfflineReducer.location,
    userDetails: state.farmAdminReducer.userDetails,
    aiOfflineList: state.healthModuleOfflineReducer.aiOfflineList,
    farmDetails: state.farmAdminReducer.farmDetails,
    isLoggedIn: state.authReducer.isLoggedIn,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    scannerResult: state.searchReducer.scannerResult,
    language: state.localeReducer.language,
    dehorningOfflineList: state.healthModuleOfflineReducer.dehorningOfflineList,
    dewormingOfflineList: state.healthModuleOfflineReducer.dewormingOfflineList,
    vaccinationOfflineList: state.healthModuleOfflineReducer.vaccinationOfflineList,
    observationOfflineList: state.healthModuleOfflineReducer.observationOfflineList,
    isMedicineSearch: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_MEDICINE_SEARCH"),
    pdOfflineList: state.healthModuleOfflineReducer.pdOfflineList,
    calfBirthOfflineList:state.healthModuleOfflineReducer.calfBirthOfflineList,
    cattleOfflineRegistration: state.healthModuleOfflineReducer.cattleOfflineRegistration
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleUserLogout: () => dispatch({type: "LOGOUT_USER"}),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    setLocation: (payload) => dispatch({type:"SET_LOCATION",payload}),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleGetOrgConfig: token => dispatch(getOrgConfigAction(token)),
    handleGetHealthMetaData: token => dispatch(getHealthMetaDataAction(token)),
    handleGetTreatmentList: (stellCode, token) => dispatch(getTreatmentListAction(stellCode, token)),
    handleGetVaccinationList: (stellaCode, token) => dispatch(getVaccinationListAction(stellaCode, token)),
    handleGetDehorningList: (stellaCode, token) => dispatch(getDehorningListAction(stellaCode, token)),
    handleEmptyVaccinationList: () => dispatch({type: "EMPTY_VACCINATION_LIST"}),
    handleEmptyDewormingList: () => dispatch({type: "EMPTY_DEWORMING_LIST"}),
    handleGetMedicineList: token => dispatch(getMedicineListAction(token)),
    handleGetVaccineList: token => dispatch(getVaccineListAction(token)),
    handleDewormListAction: token => dispatch(getDewormerListAction(token)),
    handleEmptyMedicineList: () => dispatch({type: "EMPTY_MEDICINE_LIST"}),
    handleEmptyVaccineList: () => dispatch({type: "EMPTY_VACCINE_LIST"}),
    handleEmptyDewormerList: () => dispatch({type: "EMPTY_DEWORMER_LIST"})
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(DashboardContainer));
