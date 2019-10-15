import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions, BackHandler} from "react-native";

import {isPaidUser} from "../../../../config/settings";
import authenticatedLayer from "../../../authenticatedLayer";
import FarmListing from "../../../../templates/registerAnimalTemplates/farm/FarmListingTemplate";
import {navigateBack, navigateTo, request_location_runtime_permission} from "../../../../utils/utility";
import {orgSearchAction} from "../../../../actions/search.actions";
import {getFarmListAction, emptyFarmListAction, getNearMeFarmListAction} from "../../../../actions/registerAnimal.actions";

import styles from "./styles";

const propTypes = {
    farmList: PropTypes.array,
    dispatch: PropTypes.func,
    token: PropTypes.string,
    searchList: PropTypes.array,
    handleOrgSearch: PropTypes.func,
    handleEmptyOrgSearch: PropTypes.func,
    handleEmptyFarmList: PropTypes.func,
    userDetails: PropTypes.object
};

const defaultProps = {
    farmList: [],
    dispatch: () => {},
    token: "",
    searchList: [],
    handleOrgSearch: () => {},
    handleEmptyOrgSearch: () => {},
    handleEmptyFarmList: () => {},
    userDetails: {}
};

class FarmListingContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            pageNo: 0,
            isLoading: false,
            beforeScrollViewHeight: 200,
            noDatafromApi: false,
            isMilking: false,
            isDryoff: false,
            activeTab: "All",
            isNearMe: false,
            lat: null,
            lng: null,
            isLocationSearching: false,
            nearMeText: ""
        };
    }

    async componentDidMount() {
        this.props.handleEmptyFarmList();
        this.props.handleGetFarmList(this.props.token);
    }isLocationSearching

    onOrgSearch = (payload) => {
        // console.log("triggered onOrgSearch");
        this.props.handleOrgSearch(this.props.token, payload, !this.state.isNearMe);
    }

    onSearchItemPress = (item, node) => {
        if (item.stellaCode === "Search for farms near you") {
            this.setState({isNearMe: true, pageNo: 0, beforeScrollViewHeight: 220});
            this.props.handleEmptyFarmList();
            this.props.handleEmptyOrgSearch();
            this.nearMe();
            this.activateCustomBackButton();
            node.clear();
        } else {
            navigateTo("farmDetails", {item});
            this.props.handleEmptyOrgSearch();
            node.clear();
        }
    }

    handleBackPress = () => {
        // console.log("triggered handleBackPress");
        this.props.handleEmptyFarmList();
        this.setState({isNearMe: false, pageNo: 0, beforeScrollViewHeight: 220});
        this.props.handleGetFarmList(this.props.token);
        this.deactivateCustomBackButton();
        return true;
    }

    activateCustomBackButton = () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    deactivateCustomBackButton = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
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
                if (this.state.isNearMe) {
                    this.props.handleGetNearMeFarmList(this.props.token, this.state.lat, this.state.lng, 5, this.state.pageNo).then((data) => {
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
                } else {
                    this.props.handleGetFarmList(this.props.token, this.state.pageNo).then((data) => {
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
                }
            });
        }
    }

    createNew = () => {
        navigateTo("recordFarm");
    }

    onViewLayout = (event) => {
        const {height} = event.nativeEvent.layout;
    }

    handleOnFocusSearchBar = () => {
        this.props.handleOrgSearch(this.props.token, "", !this.state.isNearMe);
    }

    handleOnBlurSearchBar = () => {
        // console.log("triggered onBlur");
        this.props.handleEmptyOrgSearch();
    }

    nearMe = async () => {
        this.setState({isLocationSearching: true, nearMeText: "Searching for location"});
        let nearMeTimer = setTimeout(() => { this.setState({ nearMeText: "Taking too long! Click to try again" }) }, 10000);
        await request_location_runtime_permission().then((locationObject)=>{
            if(locationObject.coords){
                this.setState({lat: locationObject.coords.latitude, lng: locationObject.coords.longitude});
                this.props.handleGetNearMeFarmList(this.props.token, locationObject.coords.latitude, locationObject.coords.longitude, 1.5, this.state.pageNo);
                clearTimeout(nearMeTimer);
            }
        });
        this.setState({isLocationSearching: false});
    }

    render() {
        return (
            <View style={styles.container}>
                <FarmListing
                    data={this.props.farmList}
                    onbackPress={() => this.state.isNearMe ? this.handleBackPress() : navigateBack("dashboard")}
                    toolbarTitle={this.state.isNearMe ? "Near Me" : "Farm Listing"}
                    handleSearch={this.onOrgSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    onFocusSearchBar={this.handleOnFocusSearchBar}
                    onBlurSearchBar={this.handleOnBlurSearchBar}
                    handleSetAllData={this.onResetAllData}
                    handleSetDataToDry={this.onSetDataToDry}
                    handleSetDataToMilking={this.onSetDataToMilking}
                    handleListScroll={this.onListScroll}
                    handleViewLayout={this.onViewLayout}
                    handleCreateNew={this.createNew}
                    isPaidUser={isPaidUser()}
                    nearMeText={this.state.nearMeText}
                    isNearMe={this.state.isNearMe}
                    nearMe={this.nearMe}
                    isLocationSearching={this.state.isLocationSearching}
                    isCreatePermission={this.props.isCreatePermission || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")}
                    permissionsToCreate={
                        this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_EXTENSION_OFFICER") || this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER") ||
                        this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                />
            </View>
        );
    }
}

FarmListingContainer.propTypes = propTypes;

FarmListingContainer.defaultProps = defaultProps;

handleCheckInventory = (orgConfiguration, key) => {
    const checkInventory = orgConfiguration.filter(item => (item.configName === key));
    if (checkInventory.length > 0 && checkInventory[0].value === "TRUE") {
        return true;
    }
    return false;
}

const mapStateToProps = state => ({
    token: state.authReducer.token,
    farmList: state.animalMgmtReducer.farmList,
    searchList: state.searchReducer.searchList,
    userDetails: state.farmAdminReducer.userDetails,
    location: state.healthModuleOfflineReducer.location,
    isCreatePermission: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_SELF_ADMINISTRATION_FOR_HO") || 
    handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_SELF_ADMINISTRATION_FOR_EO")
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleOrgSearch: (token, payload, isNearMe) => dispatch(orgSearchAction(token, payload, 0, isNearMe)),
    handleGetFarmList: (token, pageNo, searchString) => dispatch(getFarmListAction(token, pageNo, searchString)),
    handleEmptyOrgSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyFarmList: () => dispatch(emptyFarmListAction()),
    handleGetNearMeFarmList: (token, lat, lng, radius, pageNo) => dispatch(getNearMeFarmListAction(token, lat, lng, radius, pageNo))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(FarmListingContainer));
