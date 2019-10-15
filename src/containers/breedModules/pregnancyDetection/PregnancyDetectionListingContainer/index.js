import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions,BackHandler} from "react-native";
import _ from "lodash";

import authenticatedLayer from "../../../authenticatedLayer";
import {isPaidUser} from "../../../../config/settings";
import PregnancyDetectionListing from "../../../../templates/breedModules/pregnancyDetectionTemplates/PregnancyDetectionListing";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getPDListAction, getPDDetailsAction} from "../../../../actions/breedModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import  I18n from "../../../../utils/language.utils";
import {getImagesForRecordAction} from "../../../../actions/imageUpload.action";
import {setActiveRoute} from "../../../../actions/routes.action";

import styles from "./styles";

const propTypes = {
    PDList: PropTypes.array,
    token: PropTypes.string,
    comingFrom: PropTypes.string,
    stellaCode: PropTypes.string,
    handleEmptyPDList: PropTypes.func,
    handleGetPDList: PropTypes.func,
    handleGetPDDetails: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    handleSetActiveRoute: PropTypes.func,
    routeName: PropTypes.string
};

const defaultProps = {
    PDList: [],
    token: "",
    comingFrom: "",
    stellaCode: "",
    handleEmptyPDList: () => {},
    handleGetPDList: () => {},
    handleGetPDDetails: () => {},
    handleEmptySearchList: () => {},
    handleSetActiveRoute: () => {},
    routeName: ""
};

class PregnancyDetectionListingContainer extends Component {

    state = {
        data: this.props.PDList,
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 260,
        stellaCode: null,
        noDatafromApi: false
    }

    componentDidMount() {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyPDList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
               this.props.handleGetPDList(this.props.stellaCode, this.props.token, this.state.pageNo);
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
                data: nextPorps.PDList
            });
        }
    }

    triggerMountEvents = () => {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyPDList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetPDList(this.props.stellaCode, this.props.token, this.state.pageNo);
        } else {
            this.resetAllData();
        }
    }

    resetStateProperties = () => {
        this.setState({
            data: this.props.PDList,
            pageNo: 0,
            isLoading: false,
            stellaCode: null,
            noDatafromApi: false
        });
        if (this.searchnode) {
            this.searchnode.clear();
        }
    }

    onPressPd = (Pd) => {
        this.props.handleGetPDDetails(Pd.id, this.props.token).then((data) => {
            if (data) {
                this.props.handleGetImagesForRecord(this.props.token, data.id, "PdInspection")
                .then((innerData) => {
                    if(innerData) navigateTo("pdDetails");
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
            this.props.handleEmptyPDList();
            this.props.handleGetPDList(this.state.stellaCode, this.props.token, this.state.pageNo);
            this.props.handleEmptySearchList();
        });
    }

    resetAllData = () => {
        this.resetStateProperties();
        this.props.handleEmptyPDList();
        this.props.handleGetPDList(null, this.props.token, 0);
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
                this.props.handleGetPDList(this.state.stellaCode, this.props.token, this.state.pageNo).then((data) => {
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
        const {language} = this.props;
       const data=_.uniqBy(this.state.data, 'id');
        return (
            <View style={styles.container}>
                <PregnancyDetectionListing
                    onbackPress={navigateBack}
                    toolbarTitle={I18n.t('pregnancyDetectionListing', {locale:language})}
                    handleCreateNew={() => navigateTo("recordPD")}
                    PDList={data}
                    handlePressPd={this.onPressPd}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    resetAllData={this.resetAllData}
                    handleListScroll={this.onListScroll}
                    handleViewLayout={this.onViewLayout}
                    isPaidUser={isPaidUser()}
                    language={language}
                    handleDeleteOfflineItem={this.props.handleDeleteOfflineItem}
                    permissionsToCreate={this.props.userDetails.authorities && 
                                        (this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER") || 
                                         this.props.userDetails.authorities.includes("ROLE_ADMIN") || 
                                         this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN") || 
                                         this.props.userDetails.authorities.includes("ROLE_EXTENSION_OFFICER"))}
                    pdOfflineList={this.props.pdOfflineList}
                    isInternetConnected={this.props.isInternetConnected}
                />
            </View>
        );
    }
}

PregnancyDetectionListingContainer.propTypes = propTypes;

PregnancyDetectionListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    PDList: state.breedModuleReducer.PDList,
    pdOfflineList: state.healthModuleOfflineReducer.pdOfflineList,
    isInternetConnected: state.appReducer.isInternetConnected,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetPDDetails: (id, token) => dispatch(getPDDetailsAction(id, token)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyPDList: () => dispatch({type: "EMPTY_PD_LIST"}),
    handleGetPDList: (stellaCode, token, pageNo) => dispatch(getPDListAction(stellaCode, token, pageNo)),
    handleGetImagesForRecord: (token, id, className) => dispatch(getImagesForRecordAction(token, id, className)),
    handleDeleteOfflineItem: (payload)=> dispatch({type :"REMOVE_PD_OFFLINE_LIST",payload}),
    handleSetActiveRoute: route => dispatch(setActiveRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(PregnancyDetectionListingContainer));
