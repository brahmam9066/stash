import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions, BackHandler} from "react-native";

import authenticatedLayer from "../../../authenticatedLayer";
import {isPaidUser} from "../../../../config/settings";
import BodyWeightMgmtListing from "../../../../templates/breedModules/bodyWeightMeasurementTemplates/BodyWeightMgmtListing";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getBwmListAction, getBWMDetailsAction} from "../../../../actions/breedModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import  I18n from "../../../../utils/language.utils";
import {getImagesForRecordAction} from "../../../../actions/imageUpload.action";
import {setActiveRoute} from "../../../../actions/routes.action";

import styles from "./styles";

const propTypes = {
    bwmList: PropTypes.array,
    token: PropTypes.string,
    comingFrom: PropTypes.string,
    stellaCode: PropTypes.string,
    handleEmptyBWMList: PropTypes.func,
    handleGetBWMList: PropTypes.func,
    handleGetBWMDetails: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    handleSetActiveRoute: PropTypes.func,
    routeName: PropTypes.string
};

const defaultProps = {
    bwmList: [],
    token: "",
    comingFrom: "",
    stellaCode: "",
    handleEmptyBWMList: () => {},
    handleGetBWMList: () => {},
    handleGetBWMDetails: () => {},
    handleEmptySearchList: () => {},
    handleSetActiveRoute: () => {},
    routeName: ""
};

class BodyWeightMgmtListingContainer extends Component {

    state = {
        data: this.props.bwmList,
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 260,
        stellaCode: null,
        noDatafromApi: false,
        activeTab: "Direct"
    }

    componentDidMount() {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyBWMList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetBWMList(this.props.stellaCode, this.props.token, this.state.pageNo);
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
                data: nextPorps.bwmList
            });
        }
    }

    componentDidUpdate(prevPorps) {
        if (prevPorps.activeRoute !== this.props.activeRoute) {
            this.triggerMountEvents();
        }
    }

    triggerMountEvents = () => {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyBWMList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetBWMList(this.props.stellaCode, this.props.token, this.state.pageNo);
        } else {
            this.resetAllData();
        }
    }

    componentWillReceiveProps(nextPorps) {
        if (nextPorps) {
            this.setState({
                data: nextPorps.bwmList
            });
        }
    }

    resetStateProperties = () => {
        this.setState({
            data: this.props.bwmList,
            pageNo: 0,
            isLoading: false,
            stellaCode: null,
            noDatafromApi: false
        });
        if (this.searchnode) {
            this.searchnode.clear();
        }
    }

    onPressBwm = (Pd) => {
        this.props.handleGetBWMDetails(Pd.id, this.props.token).then((data) => {
            if (data) {
                this.props.handleGetImagesForRecord(this.props.token, data.id, "BodyWeight")
                .then((innerData) => {
                    if(innerData) navigateTo("bwmDetails");
                });
            }
        });
    }

    onCattleSearch = (searchText) => {
        this.props.handleCattleSearch(searchText, this.props.token);
    }

    onSearchItemPress = (item) => {
        this.setState({
            pageNo: 0,
            stellaCode: item.stellaCode
        }, () => {
            this.props.handleEmptyBWMList();
            this.props.handleGetBWMList(this.state.stellaCode, this.props.token, this.state.pageNo);
            this.props.handleEmptySearchList();
        });
    }

    resetAllData = () => {
        this.resetStateProperties();
        this.props.handleEmptyBWMList();
        this.props.handleGetBWMList(null, this.props.token, 0);
        this.setState({
            activeTab: "Direct"
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
                this.props.handleGetBWMList(this.state.stellaCode, this.props.token, this.state.pageNo).then((data) => {
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
        this.setState({
            beforeScrollViewHeight: height
        });
    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.container}>
                <BodyWeightMgmtListing
                    onbackPress={navigateBack}
                    toolbarTitle= {I18n.t('bodyWeightMgmtListing', {locale:language})}
                    handleCreateNew={() => navigateTo("bodyWeightMeasurement")}
                    bwmList={this.state.data}
                    handlePressBwm={this.onPressBwm}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    resetAllData={this.resetAllData}
                    handleListScroll={this.onListScroll}
                    handleViewLayout={this.onViewLayout}
                    activeTab={this.state.activeTab}
                    isPaidUser={isPaidUser()}
                    language={language}
                    permissionsToCreate={this.props.userDetails.authorities && 
                                        (this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER") || 
                                         this.props.userDetails.authorities.includes("ROLE_ADMIN") || 
                                         this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN") ||
                                         this.props.userDetails.authorities.includes("ROLE_EXTENSION_OFFICER"))}
                    isInternetConnected={this.props.isInternetConnected}  
               />
            </View>
        );
    }
}

BodyWeightMgmtListingContainer.propTypes = propTypes;

BodyWeightMgmtListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    bwmList: state.breedModuleReducer.bwmList,
    isInternetConnected: state.appReducer.isInternetConnected,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetBWMDetails: (id, token) => dispatch(getBWMDetailsAction(id, token)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyBWMList: () => dispatch({type: "EMPTY_BWM_LIST"}),
    handleGetBWMList: (stellaCode, token, pageNo) => dispatch(getBwmListAction(stellaCode, token, pageNo)),
    handleGetImagesForRecord: (token, id, className) => dispatch(getImagesForRecordAction(token, id, className)),
    handleSetActiveRoute: route => dispatch(setActiveRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(BodyWeightMgmtListingContainer));
