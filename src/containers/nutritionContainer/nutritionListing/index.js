import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {Dimensions, View} from "react-native";
import authenticatedLayer from "../../authenticatedLayer";
import NutritionListing from "../../../templates/nutritionTemplates/nutritionListing";
import {navigateBack, navigateTo} from "../../../utils/utility";
import {getNutritionDetailsAction, getNutritionListAction} from "../../../actions/nutritionModule.actions";
import {cattleSearchAction} from "../../../actions/search.actions";
import {setActiveRoute} from "../../../actions/routes.action";
import {getImagesForRecordAction} from "../../../actions/imageUpload.action";

import styles from "./styles";

const propTypes = {
    nutritionList: PropTypes.array,
    token: PropTypes.string,
    handleGetNutritionDetails: PropTypes.func,
    handleCattleSearch: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    searchList: PropTypes.array,
    handleEmptyNutritionList: PropTypes.func,
    handleGetNutritionList: PropTypes.func,
    comingFrom: PropTypes.string,
    stellaCode: PropTypes.string,
    handleSetActiveRoute: PropTypes.func,
    routeName: PropTypes.string,
    userDetails: PropTypes.object
};

const defaultProps = {
    nutritionList: [],
    token: "",
    handleGetNutritionDetails: () => {},
    handleCattleSearch: () => {},
    handleEmptySearchList: () => {},
    searchList: [],
    handleEmptyNutritionList: () => {},
    handleGetNutritionList: () => {},
    comingFrom: "",
    stellaCode: "",
    handleSetActiveRoute: () => {},
    routeName: "",
    userDetails: {}
};

class NutritionListingContainer extends Component {

    state = {
        data: this.props.nutritionList,
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 320,
        stellaCode: null,
        noDatafromApi: false
    }

    componentDidMount() {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyNutritionList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetNutritionList(this.props.stellaCode, this.props.token, this.state.pageNo, this.props.userDetails.id);
        } else {
            this.resetAllData();
        }
        this.props.handleSetActiveRoute(this.props.routeName);
    }

    componentWillReceiveProps(nextPorps) {
        if (nextPorps) {
            this.setState({
                data: nextPorps.nutritionList
            });
        }
    }

    resetStateProperties = () => {
        this.setState({
            data: this.props.nutritionList,
            pageNo: 0,
            isLoading: false,
            stellaCode: null,
            noDatafromApi: false
        });
        if (this.searchnode) {
            this.searchnode.clear();
        }
    }

    onPressNutrition = (nutritionDetails) => {
        this.props.handleGetNutritionDetails(nutritionDetails.id, this.props.token).then((data) => {
            if (data) {
                navigateTo("nutritionDetails");
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
            stellaCode: item.id
        }, () => {
            this.props.handleEmptyNutritionList();
            this.props.handleGetNutritionList(this.state.stellaCode, this.props.token, this.state.pageNo, this.props.userDetails.id);
            this.props.handleEmptySearchList();
        });
    }

    resetAllData = () => {
        this.resetStateProperties();
        this.props.handleEmptyNutritionList();
        this.props.handleGetNutritionList(this.props.stellaCode ? this.props.stellaCode : null, this.props.token, 0, this.props.userDetails.id);
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
                this.props.handleGetNutritionList(this.state.stellaCode, this.props.token, this.state.pageNo, this.props.userDetails.id).then((data) => {
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
            this.props.handleGetNutritionList(this.state.stellaCode, this.props.token, this.state.pageNo, this.props.userDetails.id);
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
        return (
            <View style={styles.container}>
                <NutritionListing
                    onBackPress={() => {
                        navigateBack(null);
                    }}
                    toolbarTitle="Nutrition Listing"
                    handleCreateNew={() => navigateTo("recordNutrition")}
                    nutritionList={this.props.nutritionList}
                    handleNutritionItemClick={this.onPressNutrition}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    handleListScroll={this.onListScroll}
                    permissionsToCreate={true}
                />
            </View>
        );
    }
}

NutritionListingContainer.propTypes = propTypes;

NutritionListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    isInternetConnected: state.appReducer.isInternetConnected,
    nutritionList: state.nutritionReducer.nutritionList,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    userDetails: state.farmAdminReducer.userDetails,
    activeRoute: state.routeReducer.activeRoute,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetNutritionDetails: (id, token) => dispatch(getNutritionDetailsAction(id, token)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyNutritionList: () => dispatch({type: "EMPTY_NUTRITION_LIST"}),
    handleGetNutritionList: (stellaCode, token, pageNo, userId) => dispatch(getNutritionListAction(stellaCode, token, pageNo, userId)),
    handleSetActiveRoute: route => dispatch(setActiveRoute(route)),
    handleGetImagesForRecord: (token, id, className) => dispatch(getImagesForRecordAction(token, id, className)),
    handleDeleteOfflineItem: payload => dispatch({type: "REMOVE_NUTRITION_LIST", payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(NutritionListingContainer));
