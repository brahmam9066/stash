import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions,BackHandler} from "react-native";
import _ from "lodash";

import {isPaidUser} from "../../../../config/settings";
import authenticatedLayer from "../../../authenticatedLayer";
import VaccinationListing from "../../../../templates/healthModule/vaccinationTemplates/VaccinationListing";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getVaccinationDetailstAction, getVaccinationListAction} from "../../../../actions/healthModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {setActiveRoute} from "../../../../actions/routes.action";
import  I18n from "../../../../utils/language.utils";
import {getImagesForRecordAction} from "../../../../actions/imageUpload.action";

import styles from "./styles";

const propTypes = {
    vaccinationList: PropTypes.array,
    token: PropTypes.string,
    handleGetVaccinationDetails: PropTypes.func,
    handleCattleSearch: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    searchList: PropTypes.array,
    handleEmptyVaccinationList: PropTypes.func,
    handleGetVaccinationList: PropTypes.func,
    comingFrom: PropTypes.string,
    stellaCode: PropTypes.string,
    vaccinationOfflineList: PropTypes.array,
    handleSetActiveRoute: PropTypes.func,
    routeName: PropTypes.string,
    activeRoute: PropTypes.string
};

const defaultProps = {
    vaccinationList: [],
    token: "",
    handleGetVaccinationDetails: () => {},
    handleCattleSearch: () => {},
    handleEmptySearchList: () => {},
    searchList: [],
    handleEmptyVaccinationList: () => {},
    handleGetVaccinationList: () => {},
    comingFrom: "",
    stellaCode: "",
    vaccinationOfflineList: [],
    handleSetActiveRoute: () => {},
    routeName: "",
    activeRoute: ""
};

class VaccinationListingContainer extends Component {

    state = {
        data: this.props.vaccinationList,
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 291,
        stellaCode: null,
        noDatafromApi: false,
        activeTab: "All"
    }

    componentDidMount() {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyVaccinationList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetVaccinationList(this.props.stellaCode, this.props.token, this.state.pageNo);
        } else {
            this.resetAllData();
        }
        this.props.handleSetActiveRoute(this.props.routeName);
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack("dashboard");
        return true;
    }

    componentWillReceiveProps(nextPorps) {
        if (nextPorps) {
            this.setState({
                data: nextPorps.vaccinationList
            });
        }
    }

    triggerMountEvents = () => {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
        this.props.handleEmptyVaccinationList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetVaccinationList(this.props.stellaCode, this.props.token, this.state.pageNo);
        } else {
            this.resetAllData();
        }
    }

    resetStateProperties = () => {
        this.setState({
            data: this.props.vaccinationList,
            pageNo: 0,
            isLoading: false,
            stellaCode: null,
            noDatafromApi: false
        });
        if (this.searchnode) {
            this.searchnode.clear();
        }
    }

    onPressVaccine = (vaccinationDetails) => {
        this.props.handleGetVaccinationDetails(vaccinationDetails.id, this.props.token).then((data) => {
            if (data) {
                this.props.handleGetImagesForRecord(this.props.token, data.id, "Vaccination")
                .then((innerData) => {
                    if(innerData) navigateTo("vaccinationDetails");
                });
            }
        });
    }

    onPressOfflineVaccine = (offlineVaccinationDetails) => {
        navigateTo("recordVaccination", {offlineVaccinationDetails, comingFrom: "vaccinationOfflineList"});
    }

    onCattleSearch = (searchText, node) => {
        this.props.handleCattleSearch(searchText, this.props.token);
        this.searchnode = node;
    }

    onSearchItemPress = (item) => {
        this.setState({
            pageNo: 0,
            stellaCode: item.stellaCode
        }, () => {
            this.props.handleEmptyVaccinationList();
            this.props.handleGetVaccinationList(this.state.stellaCode, this.props.token, this.state.pageNo);
            this.props.handleEmptySearchList();
        });
    }

    setDataToRaksha = () => {
        this.setState({
            isRaksha: true,
            isGovt: false,
            activeTab: "Raksha Biovac"
        });
    }

    setDataToGovt = () => {
        this.setState({
            isRaksha: false,
            isGovt: true,
            activeTab: "Govt. Futvac"
        });
    }

    resetAllData = () => {
        this.resetStateProperties();
        this.props.handleEmptyVaccinationList();
        this.props.handleGetVaccinationList(this.props.stellaCode ? this.props.stellaCode: null, this.props.token, 0);
        this.setState({
            isRaksha: false,
            isGovt: false,
            activeTab: "All"
        });
    }

    onListScroll = (e) => {
        const windowHeight = Dimensions.get("window").height;
        const {contentSize: {height}, contentOffset: {y: offset}} = e.nativeEvent;
        console.log(windowHeight, height);
        if (windowHeight + offset - this.state.beforeScrollViewHeight >= height && !this.state.isLoading && !this.state.noDatafromApi) {
            this.setState((state) => {
                return {
                    isLoading: true,
                    pageNo: state.pageNo + 1
                };
            }, () => {
                this.props.handleGetVaccinationList(this.state.stellaCode, this.props.token, this.state.pageNo).then((data) => {
                    if (data.length > 0) {
                        this.setState({
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                            noDatafromApi: true
                        });
                    }
                });
            });
        }else {
            this.props.handleGetVaccinationList(this.state.stellaCode, this.props.token, this.state.pageNo);
            this.setState((state) => {
                return {
                    isLoading: true,
                    pageNo: state.pageNo + 1
                };
            });
        }
    }

    onViewLayout = (event) => {
        const {height} = event.nativeEvent.layout;
    }

    render() {
        const {vaccinationList,language} = this.props;
        let data = vaccinationList;
        if (this.state.isRaksha) {
            data = vaccinationList.filter((item) => {
                return (item && item.prescriptions && item.prescriptions[0] && item.prescriptions[0].medicineName.toLowerCase() === "raksha biovac");
            });
        } else if (this.state.isGovt) {
            data = vaccinationList.filter((item) => {
                return (item && item.prescriptions && item.prescriptions[0] && item.prescriptions[0].medicineName.toLowerCase() === "govt. futvac");
            });
        }
        data=_.uniqBy(data, 'id');

        return (
            <View style={styles.container}>
                <VaccinationListing
                    onbackPress={navigateBack}
                    toolbarTitle= {I18n.t('vaccinationListingHeading', {locale:language})}
                    handleCreateNew={() => navigateTo("recordVaccination")}
                    vaccinationList={data}
                    handlePressVaccine={this.onPressVaccine}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    resetAllData={this.resetAllData}
                    setDataToRaksha={this.setDataToRaksha}
                    setDataToGovt={this.setDataToGovt}
                    handleListScroll={this.onListScroll}
                    handleViewLayout={this.onViewLayout}
                    activeTab={this.state.activeTab}
                    isPaidUser={isPaidUser()}
                    language={language}
                    onPressOfflineVaccine={this.onPressOfflineVaccine}
                    isInternetConnected={this.props.isInternetConnected}
                    vaccinationOfflineList={this.props.vaccinationOfflineList}
                    handleDeleteOfflineItem={this.props.handleDeleteOfflineItem}
                    permissionsToCreate={this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER") || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                />
            </View>
        );
    }
}

VaccinationListingContainer.propTypes = propTypes;

VaccinationListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    isInternetConnected: state.appReducer.isInternetConnected,
    vaccinationOfflineList: state.healthModuleOfflineReducer.vaccinationOfflineList,
    vaccinationList: state.healthModuleReducer.vaccinationList,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    userDetails: state.farmAdminReducer.userDetails,
    activeRoute: state.routeReducer.activeRoute,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetVaccinationDetails: (id, token) => dispatch(getVaccinationDetailstAction(id, token)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyVaccinationList: () => dispatch({type: "EMPTY_VACCINATION_LIST"}),
    handleGetVaccinationList: (stellaCode, token, pageNo) => dispatch(getVaccinationListAction(stellaCode, token, pageNo)),
    handleSetActiveRoute: route => dispatch(setActiveRoute(route)),
    handleGetImagesForRecord: (token, id, className) => dispatch(getImagesForRecordAction(token, id, className)),
    handleDeleteOfflineItem: (payload)=> dispatch({type :"REMOVE_VACCINATION_OFFLINE_LIST",payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(VaccinationListingContainer));
