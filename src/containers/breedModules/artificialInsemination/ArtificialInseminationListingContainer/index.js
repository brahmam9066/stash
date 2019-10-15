import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions, BackHandler} from "react-native";
import _ from "lodash";

import authenticatedLayer from "../../../authenticatedLayer";
import {isPaidUser} from "../../../../config/settings";
import ArtificialInseminationListing from "../../../../templates/breedModules/artificialInseminationTemplates/ArtificialInseminationListing";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getAIListAction, getAIDetailsAction} from "../../../../actions/breedModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {getImagesForRecordAction} from "../../../../actions/imageUpload.action";
import {setActiveRoute} from "../../../../actions/routes.action";

import styles from "./styles";

const propTypes = {
    AIList: PropTypes.array,
    token: PropTypes.string,
    comingFrom: PropTypes.string,
    stellaCode: PropTypes.string,
    handleEmptyAIList: PropTypes.func,
    handleGetAIList: PropTypes.func,
    handleGetAIDetails: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    handleCattleSearch: PropTypes.func,
    searchList: PropTypes.array,
    userDetails: PropTypes.object,
    handleSetActiveRoute: PropTypes.func,
    routeName: PropTypes.string
};

const defaultProps = {
    AIList: [],
    token: "",
    comingFrom: "",
    stellaCode: "",
    handleEmptyAIList: () => {},
    handleGetAIList: () => {},
    handleGetAIDetails: () => {},
    handleEmptySearchList: () => {},
    handleCattleSearch: () => {},
    searchList: [],
    userDetails: {},
    handleSetActiveRoute: () => {},
    routeName: ""
};

class ArtificialInseminationListingContainer extends Component {

    state = {
        data: this.props.AIList,
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 260,
        stellaCode: null,
        noDatafromApi: false
    }

    componentDidMount() {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyAIList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetAIList(this.props.stellaCode, this.props.token, this.state.pageNo);
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
                data: nextPorps.AIList
            });
        }
    }

    resetStateProperties = () => {
        this.setState({
            data: this.props.AIList,
            pageNo: 0,
            isLoading: false,
            stellaCode: null,
            noDatafromApi: false
        });
        if (this.searchnode) {
            this.searchnode.clear();
        }
    }

    onPressAI = (aI) => {
        this.props.handleGetAIDetails(aI.id, this.props.token).then((data) => {
            if (data) {
                this.props.handleGetImagesForRecord(this.props.token, data.id, "Insemination")
                .then((innerData) => {
                    if(innerData) navigateTo("aIDetails");
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
            this.props.handleEmptyAIList();
            this.props.handleGetAIList(this.state.stellaCode, this.props.token, this.state.pageNo);
            this.props.handleEmptySearchList();
        });
    }

    resetAllData = () => {
        this.resetStateProperties();
        this.props.handleEmptyAIList();
        this.props.handleGetAIList(null, this.props.token, 0);
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
                this.props.handleGetAIList(this.state.stellaCode, this.props.token, this.state.pageNo).then((data) => {
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

    render() {
        const {language} = this.props
       const data=_.uniqBy(this.state.data, 'id');
        return (
            <ArtificialInseminationListing
                onbackPress={navigateBack}
                toolbarTitle="Artificial Insemination Listing"
                handleCreateNew={() => navigateTo("recordAI")}
                AIList={data}
                aiOfflineList={this.props.aiOfflineList}
                handlePressAI={this.onPressAI}
                handleSearch={this.onCattleSearch}
                searchList={this.props.searchList}
                handleSearchItemPress={this.onSearchItemPress}
                resetAllData={this.resetAllData}
                handleListScroll={this.onListScroll}
                handleViewLayout={this.onViewLayout}
                isPaidUser={isPaidUser()}
                language={language}
                isInternetConnected={this.props.isInternetConnected}
                handleDeleteOfflineItem={this.props.handleDeleteOfflineItem}
                permissionsToCreate={
                    this.props.userDetails.authorities &&
                    (this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER")
                    || this.props.userDetails.authorities.includes("ROLE_ADMIN")
                    || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")
                    || this.props.userDetails.authorities.includes("ROLE_EXTENSION_OFFICER"))}
            />
        );
    }
}

ArtificialInseminationListingContainer.propTypes = propTypes;

ArtificialInseminationListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    AIList: state.breedModuleReducer.AIList,
    aiOfflineList: state.healthModuleOfflineReducer.aiOfflineList,
    isInternetConnected: state.appReducer.isInternetConnected,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetAIDetails: (id, token) => dispatch(getAIDetailsAction(id, token)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyAIList: () => dispatch({type: "EMPTY_AI_LIST"}),
    handleGetAIList: (stellaCode, token, pageNo) => dispatch(getAIListAction(stellaCode, token, pageNo)),
    handleGetImagesForRecord: (token, id, className) => dispatch(getImagesForRecordAction(token, id, className)),
    handleDeleteOfflineItem: (payload)=> dispatch({type :"REMOVE_AI_OFFLINE_LIST",payload}),
    handleSetActiveRoute: route => dispatch(setActiveRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(ArtificialInseminationListingContainer));
