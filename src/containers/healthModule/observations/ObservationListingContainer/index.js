import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions,BackHandler} from "react-native";
import _ from "lodash";

import {isPaidUser} from "../../../../config/settings";
import authenticatedLayer from "../../../authenticatedLayer";
import ObservationListing from "../../../../templates/healthModule/observationsTemplates/ObservationListing";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getTreatmentDetailsAction, getTreatmentListAction} from "../../../../actions/healthModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {getImagesForRecordAction} from "../../../../actions/imageUpload.action";
import {setActiveRoute} from "../../../../actions/routes.action";

import styles from "./styles";

const propTypes = {
    token: PropTypes.string,
    treatmentList: PropTypes.array,
    handleGetTreatmentDetails: PropTypes.func,
    searchList: PropTypes.array,
    handleCattleSearch: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    handleEmptyTreatmentList: PropTypes.func,
    handleGetTreatmentList: PropTypes.func,
    comingFrom: PropTypes.string,
    stellaCode: PropTypes.string,
    userDetails: PropTypes.object,
    handleSetActiveRoute: PropTypes.func,
    routeName: PropTypes.string
};

const defaultProps = {
    token: "",
    treatmentList: [],
    handleGetTreatmentDetails: () => {},
    searchList: [],
    handleCattleSearch: () => {},
    handleEmptySearchList: () => {},
    handleEmptyTreatmentList: () => {},
    handleGetTreatmentList: () => {},
    handleSetActiveRoute: () => {},
    comingFrom: "",
    stellaCode: "",
    userDetails: {},
    routeName: ""
};

class ObservationListingContainer extends Component {

    state = {
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 291,
        stellaCode: null,
        noDatafromApi: false,
        isFmd: false,
        isMastitis: false,
        activeTab: "All"
    }

    componentDidMount() {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyTreatmentList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetTreatmentList(this.props.stellaCode, this.props.token, this.state.pageNo);
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
                data: nextPorps.treatmentList
            });
        }
    }

    resetStateProperties = () => {
        this.setState({
            pageNo: 0,
            isLoading: false,
            stellaCode: null,
            noDatafromApi: false
        });
        if (this.searchnode) {
            this.searchnode.clear();
        }
    }

    onPressTreatment = (treatmentDetails) => {
        this.props.handleGetTreatmentDetails(treatmentDetails.id, this.props.token).then((data) => {
            if (data) {
                this.props.handleGetImagesForRecord(this.props.token, data.id, "Treatment")
                .then((innerData) => {
                    if(innerData) navigateTo("observationDetails");
                });
            }
        });
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
            this.props.handleEmptyTreatmentList();
            this.props.handleGetTreatmentList(this.state.stellaCode, this.props.token, this.state.pageNo);
            this.props.handleEmptySearchList();
        });
    }

    setDataToFmd = () => {
        this.setState({
            isFmd: true,
            isMastitis: false,
            activeTab: "FMD"
        });
    }

    setDataToMastitis = () => {
        this.setState({
            isFmd: false,
            isMastitis: true,
            activeTab: "Mastitis"
        });
    }

    resetAllData = () => {
        this.resetStateProperties();
        this.props.handleEmptyTreatmentList();
        this.props.handleGetTreatmentList(this.props.stellaCode ? this.props.stellaCode: null, this.props.token, this.state.pageNo);
        this.setState({
            isFmd: false,
            isMastitis: false,
            activeTab: "All"
        });
    }

    onListScroll = (e) => {
        const windowHeight = Dimensions.get("window").height;
        const {contentSize: {height}, contentOffset: {y: offset}} = e.nativeEvent;
        if (windowHeight + offset - this.state.beforeScrollViewHeight >= height && !this.state.isLoading && !this.state.noDatafromApi) {
            this.setState((state) => {
                return {
                    isLoading: true,
                    pageNo: state.pageNo + 1
                };
            }, () => {
                this.props.handleGetTreatmentList(this.state.stellaCode, this.props.token, this.state.pageNo).then((data) => {
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
        } else {
            this.props.handleGetTreatmentList(this.state.stellaCode, this.props.token, this.state.pageNo);
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

    onPressOfflineObservation = (offlineObservationDetails) => {
        navigateTo("recordObservation", {offlineObservationDetails, comingFrom: "observationOfflineList"});
    }

    render() {
        const {treatmentList} = this.props;
        let data = treatmentList;
        if (this.state.isFmd) {
            data = treatmentList.filter((item) => {
                return (item.diagnosis && item.diagnosis.toLowerCase() === "fmd");
            });
        } else if (this.state.isMastitis) {
            data = treatmentList.filter((item) => {
                return (item.diagnosis && item.diagnosis.toLowerCase() === "mastitis");
            });
        }
        data=_.uniqBy(data, 'id');
        const {language} = this.props;
        console.log("renderlanguage",language)
        return (
            <View style={styles.container}>
                <ObservationListing
                    onbackPress={navigateBack}
                    toolbarTitle="Observation Listing"
                    handleCreateNew={() => navigateTo("recordObservation")}
                    treatmentList={data}
                    handlePressTreatment={this.onPressTreatment}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    resetAllData={this.resetAllData}
                    setDataToMastitis={this.setDataToMastitis}
                    setDataToFmd={this.setDataToFmd}
                    handleListScroll={this.onListScroll}
                    handleViewLayout={this.onViewLayout}
                    activeTab={this.state.activeTab}
                    isPaidUser={isPaidUser()}
                    language={language}
                    observationOfflineList={this.props.observationOfflineList}
                    isInternetConnected={this.props.isInternetConnected}
                    handlePressOfflineObservation={this.onPressOfflineObservation}
                    handleDeleteOfflineItem={this.props.handleDeleteOfflineItem}
                    permissionsToCreate={this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER") || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                />
            </View>
        );
    }
}

ObservationListingContainer.propTypes = propTypes;

ObservationListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    observationOfflineList: state.healthModuleOfflineReducer.observationOfflineList,
    isInternetConnected: state.appReducer.isInternetConnected,
    token: state.authReducer.token,
    treatmentList: state.healthModuleReducer.treatmentList,
    searchList: state.searchReducer.searchList,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetTreatmentDetails: (id, token) => dispatch(getTreatmentDetailsAction(id, token)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleGetTreatmentList: (stellaCode, token, pageno) => dispatch(getTreatmentListAction(stellaCode, token, pageno)),
    handleEmptyTreatmentList: () => dispatch({type: "EMPTY_TREATMENT_LIST"}),
    handleDeleteOfflineItem: (payload)=> dispatch({type :"REMOVE_OBSERVATION_OFFLINE_LIST",payload}),
    handleGetImagesForRecord: (token, id, className) => dispatch(getImagesForRecordAction(token, id, className)),
    handleSetActiveRoute: route => dispatch(setActiveRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(ObservationListingContainer));
