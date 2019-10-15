import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions,BackHandler} from "react-native";
import _ from "lodash";

import {isPaidUser} from "../../../../config/settings";
import authenticatedLayer from "../../../authenticatedLayer";
import DehorningListing from "../../../../templates/healthModule/dehorningTemplates/DehorningListing";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getDehorningDetailsAction, getDehorningListAction} from "../../../../actions/healthModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {getImagesForRecordAction} from "../../../../actions/imageUpload.action";
import {setActiveRoute} from "../../../../actions/routes.action";

import styles from "./styles";

const propTypes = {
    dehorningList: PropTypes.array,
    token: PropTypes.string,
    handleGetDehorningDetails: PropTypes.func,
    handleCattleSearch: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    searchList: PropTypes.array,
    handleEmptyDehorningList: PropTypes.func,
    handleGetDehorningList: PropTypes.func,
    comingFrom: PropTypes.string,
    stellaCode: PropTypes.string,
    dehorningOfflineList: PropTypes.array,
    medicineList: PropTypes.array,
    isInternetConnected: PropTypes.bool,
    userDetails: PropTypes.object,
    handleSetActiveRoute: PropTypes.func,
    routeName: PropTypes.string
};

const defaultProps = {
    dehorningList: [],
    token: "",
    handleGetDehorningDetails: () => {},
    handleCattleSearch: () => {},
    handleEmptySearchList: () => {},
    searchList: [],
    handleEmptyDehorningList: () => {},
    handleGetDehorningList: () => {},
    handleSetActiveRoute: () => {},
    comingFrom: "",
    stellaCode: "",
    routeName: "",
    dehorningOfflineList: [],
    medicineList: [],
    isInternetConnected: true,
    userDetails: {}
};

class DehorningListingContainer extends Component {

    state = {
        data: this.props.dehorningList,
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 291,
        stellaCode: null,
        noDatafromApi: false
    }

    componentDidMount() {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyDehorningList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetDehorningList(this.props.stellaCode, this.props.token, this.state.pageNo);
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
                data: nextPorps.dehorningList
            });
        }
    }

 

    triggerMountEvents = () => {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyDehorningList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetDehorningList(this.props.stellaCode, this.props.token, this.state.pageNo);
        } else {
            this.resetAllData();
        }
    }

    resetStateProperties = () => {
        this.setState({
            data: this.props.dehorningList,
            pageNo: 0,
            isLoading: false,
            stellaCode: null,
            noDatafromApi: false
        });
        if (this.searchnode) {
            this.searchnode.clear();
        }
    }

    onPressDehorning = (dehorning) => {
        this.props.handleGetDehorningDetails(dehorning.id, this.props.token).then((data) => {
            if (data) {
                this.props.handleGetImagesForRecord(this.props.token, data.id, "Dehorning")
                .then((innerData) => {
                    if(innerData) navigateTo("dehorningDetails");
                });
            }
        });
    }

    onPressOfflineDehorning = (offlineDehorningDetails) => {
        navigateTo("recordDehorning", {offlineDehorningDetails, comingFrom: "dehorningOfflineList"});
    }

    onCattleSearch = (searchText,node) => {
        this.props.handleCattleSearch(searchText, this.props.token);
        this.searchnode = node;
    }

    onSearchItemPress = (item) => {
        this.setState({
            pageNo: 0,
            stellaCode: item.stellaCode
        }, () => {
            this.props.handleEmptyDehorningList();
            this.props.handleGetDehorningList(this.state.stellaCode, this.props.token, this.state.pageNo);
            this.props.handleEmptySearchList();
        });
    }

    resetAllData = () => {
        this.resetStateProperties();
        this.props.handleEmptyDehorningList();
        // this.props.handleGetDehorningList(null, this.props.token, 0);
        this.props.handleGetDehorningList(this.props.stellaCode ? this.props.stellaCode: null, this.props.token, 0);

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
                this.props.handleGetDehorningList(this.state.stellaCode, this.props.token, this.state.pageNo).then((data) => {
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
            this.props.handleGetDehorningList(this.state.stellaCode, this.props.token, this.state.pageNo);
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
        const {language}=this.props
        const data=_.uniqBy(this.state.data, 'id');
        return (
            <View style={styles.container}>
                <DehorningListing
                    onbackPress={navigateBack}
                    toolbarTitle="Dehorning Listing"
                    handleCreateNew={() => navigateTo("recordDehorning")}
                    dehorningList={data}
                    dehorningOfflineList={this.props.dehorningOfflineList}
                    handlePressDehorning={this.onPressDehorning}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    resetAllData={this.resetAllData}
                    handleListScroll={this.onListScroll}
                    handleViewLayout={this.onViewLayout}
                    medicineList={this.props.medicineList}
                    handlePressOfflineDehorning={this.onPressOfflineDehorning}
                    isPaidUser={isPaidUser()}
                    language={language}
                    handleDeleteOfflineItem={this.props.handleDeleteOfflineItem}
                    isInternetConnected={this.props.isInternetConnected}
                    permissionsToCreate={
                        this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER") ||
                        this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                />
            </View>
        );
    }
}

DehorningListingContainer.propTypes = propTypes;

DehorningListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    isInternetConnected: state.appReducer.isInternetConnected,
    dehorningList: state.healthModuleReducer.dehorningList,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    userDetails: state.farmAdminReducer.userDetails,
    dehorningOfflineList: state.healthModuleOfflineReducer.dehorningOfflineList,
    medicineList: state.lookupDataReducer.medicineList,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetDehorningDetails: (id, token) => dispatch(getDehorningDetailsAction(id, token)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyDehorningList: () => dispatch({type: "EMPTY_DEHORNING_LIST"}),
    handleGetDehorningList: (stellaCode, token, pageNo) => dispatch(getDehorningListAction(stellaCode, token, pageNo)),
    handleGetImagesForRecord: (token, id, className) => dispatch(getImagesForRecordAction(token, id, className)),
    handleDeleteOfflineItem: (payload)=> dispatch({type :"REMOVE_DEHORNING_OFFLINE_LIST",payload}),
    handleSetActiveRoute: route => dispatch(setActiveRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(DehorningListingContainer));
