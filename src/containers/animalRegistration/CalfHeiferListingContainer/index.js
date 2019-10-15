import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions, BackHandler} from "react-native";

import authenticatedLayer from "../../authenticatedLayer";
import {isPaidUser} from "../../../config/settings";
import CalfHeiferListing from "../../../templates/calfHeiferListingTemplates/CalfHeiferListing";
import {navigateBack, navigateTo} from "../../../utils/utility";
import {getCalfListingAction} from "../../../actions/calfHeiferListing.actions";
import {cattleSearchAction} from "../../../actions/search.actions";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    calfList: PropTypes.array,
    dispatch: PropTypes.func,
    token: PropTypes.string,
    handleEmptyCalfList: PropTypes.func,
    handleCattleSearch: PropTypes.func,
    handleEmptyCattleSearch: PropTypes.func,
    searchList: PropTypes.array
};

const defaultProps = {
    calfList: [],
    dispatch: () => {},
    token: "",
    handleEmptyCalfList: () => {},
    handleCattleSearch: () => {},
    handleEmptyCattleSearch: () => {},
    searchList: []
};

class CalfHeiferListingContainer extends Component {

    state = {
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 291,
        noDatafromApi: false,
        isCalf: false,
        isHeifer: false,
        activeTab: "All"
    }

    componentDidMount() {
        this.props.handleEmptyCalfList();
        this.props.dispatch(getCalfListingAction(this.props.token));
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack("dashboard");
        return true;
    }

    onCattleSearch = (searchText) => {
        this.props.handleCattleSearch(searchText, this.props.token);
    }

    onSearchItemPress = (item, node) => {
        navigateTo("cattleDetails", {selectedAnimalDetails: item});
        this.props.handleEmptyCattleSearch();
        node.clear();
    }

    onSetDataToCalf = () => {
        this.setState({
            isCalf: true,
            isHeifer: false,
            activeTab:"Calf"
        });
    }

    onSetDataToHeifer = () => {
        this.setState({
            isCalf: false,
            isHeifer: true,
            activeTab:"Heifer"
        });
    }

    onResetAllData = () => {
        this.setState({
            isCalf: false,
            isHeifer: false,
            activeTab:"All"
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
                this.props.dispatch(getCalfListingAction(this.props.token, this.state.pageNo)).then((data) => {
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
        const {calfList,language} = this.props;
        let data = calfList;
        if (this.state.isCalf) {
            data = calfList.filter((item) => {
                return (item.lactationState && item.breedingState.toLowerCase() === "calf");
            });
        } else if (this.state.isHeifer) {
            data = calfList.filter((item) => {
                return (item.lactationState && item.breedingState.toLowerCase() === "heifer");
            });
        }
        return (
            <View style={styles.container}>
                <CalfHeiferListing
                    data={data}
                    onbackPress={navigateBack}
                    toolbarTitle={I18n.t('calfHeiferListing', {locale:language})}
                    isPaidUser={isPaidUser()}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    handleListScroll={this.onListScroll}
                    handleViewLayout={this.onViewLayout}
                    handleResetAllData={this.onResetAllData}
                    handleSetDataToCalf={this.onSetDataToCalf}
                    handleSetDataToHeifer={this.onSetDataToHeifer}
                    handleDeleteOfflineItem={this.props.handleDeleteOfflineItem}
                    activeTab={this.state.activeTab}
                    language={this.props.language}
                    calfBirthOfflineList={this.props.calfBirthOfflineList}
                    isInternetConnected={this.props.isInternetConnected}  
                />
            </View>
        );
    }
}

CalfHeiferListingContainer.propTypes = propTypes;

CalfHeiferListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    calfList: state.animalMgmtReducer.calfList,
    calfBirthOfflineList:state.healthModuleOfflineReducer.calfBirthOfflineList,
    searchList: state.searchReducer.searchList,
    language: state.localeReducer.language,
    isInternetConnected: state.appReducer.isInternetConnected
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyCalfList: () => dispatch({type: "EMPTY_CALF_LIST"}),
    handleDeleteOfflineItem: (payload)=> dispatch({type :"REMOVE_CALF_BIRTH_OFFLINE_LIST",payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(CalfHeiferListingContainer));
