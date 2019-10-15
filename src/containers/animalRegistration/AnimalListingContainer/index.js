import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions, BackHandler} from "react-native";

import {isPaidUser} from "../../../config/settings";
import authenticatedLayer from "../../authenticatedLayer";
import AnimalListing from "../../../templates/animalListingTemplates/AnimalListing";
import {navigateBack, navigateTo} from "../../../utils/utility";
import {cattleSearchAction} from "../../../actions/search.actions";
import {getAnimalListingAction} from "../../../actions/animalListing.actions";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    animalList: PropTypes.array,
    dispatch: PropTypes.func,
    token: PropTypes.string,
    searchList: PropTypes.array,
    handleCattleSearch: PropTypes.func,
    handleEmptyCattleSearch: PropTypes.func,
    handleEmptyAnimalList: PropTypes.func,
    userDetails: PropTypes.object
};

const defaultProps = {
    animalList: [],
    dispatch: () => {},
    token: "",
    searchList: [],
    handleCattleSearch: () => {},
    handleEmptyCattleSearch: () => {},
    handleEmptyAnimalList: () => {},
    userDetails: {}
};

class AnimalListingContainer extends Component {

    state = {
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 291,
        noDatafromApi: false,
        isMilking: false,
        isDryoff: false,
        activeTab: "All"
    }

    componentDidMount() {
        this.props.handleEmptyAnimalList();
        this.props.dispatch(getAnimalListingAction(this.props.token));
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

    onSetDataToMilking = () => {
        this.setState({
            isMilking: true,
            isDryoff: false,
            activeTab: "Milking"
        });
    }

    onSetDataToDry = () => {
        this.setState({
            isMilking: false,
            isDryoff: true,
            activeTab: "Dryoff"
        });
    }

    onResetAllData = () => {
        this.setState({
            isMilking: false,
            isDryoff: false,
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
                this.props.dispatch(getAnimalListingAction(this.props.token, this.state.pageNo)).then((data) => {
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
        const {animalList,language} = this.props;
        let data = animalList;
        if (this.state.isMilking) {
            data = animalList.filter((item) => {
                return (item.lactationState && item.lactationState.toLowerCase() === "milking");
            });
        } else if (this.state.isDryoff) {
            data = animalList.filter((item) => {
                return (item.lactationState && item.lactationState.toLowerCase() === "dry off");
            });
        }
        
        return (
            <View style={styles.container}>
                <AnimalListing
                    data={data}
                    // onbackPress={navigateBack}
                    language={this.props.language}
                    onbackPress={() => navigateTo("dashboard")}
                    toolbarTitle={I18n.t('animalListing', {locale:language})}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    handleSetAllData={this.onResetAllData}
                    handleSetDataToDry={this.onSetDataToDry}
                    handleSetDataToMilking={this.onSetDataToMilking}
                    handleListScroll={this.onListScroll}
                    handleViewLayout={this.onViewLayout}
                    activeTab={this.state.activeTab}
                    isPaidUser={isPaidUser()}
                    handleDeleteOfflineItem={this.props.handleDeleteOfflineItem}                    
                    isInternetConnected={this.props.isInternetConnected}
                    permissionsToCreate={
                        this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_EXTENSION_OFFICER") || this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER") ||
                        this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                    cattleOfflineRegistration = {this.props.cattleOfflineRegistration}
                />
            </View>
        );
    }
}

AnimalListingContainer.propTypes = propTypes;

AnimalListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    cattleOfflineRegistration: state.healthModuleOfflineReducer.cattleOfflineRegistration,
    animalList: state.animalMgmtReducer.animalList,
    searchList: state.searchReducer.searchList,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language,
    isInternetConnected: state.appReducer.isInternetConnected
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyAnimalList: () => dispatch({type: "EMPTY_ANIMAL_LIST"}),
    handleDeleteOfflineItem: (payload)=> dispatch({type :"REMOVE_CATTLE_REGISTRATION_OFFLINE_LIST",payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(AnimalListingContainer));
