import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions,BackHandler} from "react-native";
import _ from "lodash";

import {isPaidUser} from "../../../../config/settings";
import DewormingListing from "../../../../templates/healthModule/deworming/DewormingListingTemplate";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getDewormingListAction, getDewormingDetailsAction} from "../../../../actions/healthModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {setActiveRoute} from "../../../../actions/routes.action";
import {getImagesForRecordAction} from "../../../../actions/imageUpload.action";

import styles from "./styles";

const propTypes = {
    token: PropTypes.string,
    userDetails: PropTypes.object,
    dewormingList: PropTypes.array,
    searchList: PropTypes.array,
    getDewormingList: PropTypes.func,
    handleCattleSearch: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    handleEmptyDewormingList: PropTypes.func,
    handleGetDewormingList: PropTypes.func,
    comingFrom: PropTypes.string,
    stellaCode: PropTypes.string,
    dewormingOfflineList: PropTypes.array,
    handleGetDewormingDetails: PropTypes.func,
    isInternetConnected: PropTypes.bool,
    handleSetActiveRoute: PropTypes.func,
    routeName: PropTypes.string
};

const defaultProps = {
    token: "",
    userDetails: {},
    dewormingList: [],
    searchList: [],
    getDewormingList: () => {},
    handleCattleSearch: () => {},
    handleEmptySearchList: () => {},
    handleEmptyDewormingList: () => {},
    handleGetDewormingList: () => {},
    comingFrom: "",
    stellaCode: "",
    routeName: "",
    dewormingOfflineList: [],
    handleGetDewormingDetails: () => {},
    handleSetActiveRoute: () => {},
    isInternetConnected: true
};

class DewormingListingContainer extends Component {

    state = {
        data: this.props.dewormingList,
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
            this.props.handleEmptyDewormingList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetDewormingList(this.props.stellaCode, this.props.token, this.state.pageNo);
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
                data: nextPorps.dewormingList
            });
        }
    }

    triggerMountEvents = () => {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyDewormingList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetDewormingList(this.props.stellaCode, this.props.token, this.state.pageNo);
        } else {
            this.resetAllData();
        }
    }

    resetStateProperties = () => {
        this.setState({
            data: this.props.dewormingList,
            pageNo: 0,
            isLoading: false,
            stellaCode: null,
            noDatafromApi: false
        });
        if (this.searchnode) {
            this.searchnode.clear();
        }
    }

    onPressDeworming = (dewormingDetails) => {
        navigateTo("dewormingDetails", {dewormingDetails});
    }

    onSearchItemPress = (item, node) => {
        this.props.getDewormingList(this.props.token, item.stellaCode);
        this.props.handleEmptySearchList();
        node.clear();
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
            this.props.handleEmptyDewormingList();
            this.props.handleGetDewormingList(this.state.stellaCode, this.props.token, this.state.pageNo);
            this.props.handleEmptySearchList();
        });
    }

    resetAllData = () => {
        this.resetStateProperties();
        this.props.handleEmptyDewormingList();
        // this.props.handleGetDewormingList(null, this.props.token, 0);
        this.props.handleGetDewormingList(this.props.stellaCode ? this.props.stellaCode: null, this.props.token, 0);
        this.setState({
            Endo: false,
            Ecto: false,
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
                this.props.handleGetDewormingList(this.state.stellaCode, this.props.token, this.state.pageNo).then((data) => {
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
        }
    }

    onViewLayout = (event) => {
        const {height} = event.nativeEvent.layout;
    }

    changeActiveTab = (activeTab) => {
        this.setState({activeTab});
    }

    onPressDeworming = (deworming) => {
        this.props.handleGetDewormingDetails(deworming.id, this.props.token).then((data) => {
            if (data) {
                this.props.handleGetImagesForRecord(this.props.token, data.id, "Deworming")
                .then((innerData) => {
                    if(innerData) navigateTo("dewormingDetails");
                });
            }
        });
    }

    onPressOfflineDeworming = (offlineDewormingDetails) => {
        navigateTo("recordDeworming", {offlineDewormingDetails, comingFrom: "dewormingOfflineList"});
    }

    render() {
        const {language}=this.props
        const data=_.uniqBy(this.state.data, 'id');
        return (
            <View style={styles.container}>
                <DewormingListing
                    onbackPress={navigateBack}
                    toolbarTitle="Deworming Listing"
                    handleCreateNew={() => navigateTo("recordDeworming")}
                    dewormingList={data}
                    searchList={this.props.searchList}
                    handleSearch={this.onCattleSearch}
                    handleSearchItemPress={this.onSearchItemPress}
                    handlePressDeworming={this.onPressDeworming}
                    activeTab={this.state.activeTab}
                    changeActiveTab={this.changeActiveTab}
                    resetAllData={this.resetAllData}
                    handleListScroll={this.onListScroll}
                    handleViewLayout={this.onViewLayout}
                    isPaidUser={isPaidUser()}
                    isInternetConnected={this.props.isInternetConnected}
                    dewormingOfflineList={this.props.dewormingOfflineList}
                    handlePressOfflineDeworming={this.onPressOfflineDeworming}
                    language={language}
                    handleDeleteOfflineItem={this.props.handleDeleteOfflineItem}
                    permissionsToCreate={
                        this.props.userDetails.authorities &&
                        (this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER")
                        || this.props.userDetails.authorities.includes("ROLE_ADMIN")
                        || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                />
            </View>
        );
    }
}

DewormingListingContainer.propTypes = propTypes;

DewormingListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    isInternetConnected: state.appReducer.isInternetConnected,
    token: state.authReducer.token,
    dewormingList: state.healthModuleReducer.dewormingList,
    dewormingOfflineList: state.healthModuleOfflineReducer.dewormingOfflineList,
    searchList: state.searchReducer.searchList,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetDewormingList: (stellaCode, token, pageNo) => dispatch(getDewormingListAction(stellaCode, token, pageNo)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleGetDewormingDetails: (id, token) => dispatch(getDewormingDetailsAction(id, token)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyDewormingList: () => dispatch({type: "EMPTY_DEWORMING_LIST"}),
    handleSetActiveRoute: route => dispatch(setActiveRoute(route)),
    handleGetImagesForRecord: (token, id, className) => dispatch(getImagesForRecordAction(token, id, className)),
    handleDeleteOfflineItem: (payload)=> dispatch({type :"REMOVE_DEWORMING_OFFLINE_LIST",payload})

});

export default connect(mapStateToProps, mapDispatchToProps)(DewormingListingContainer);
