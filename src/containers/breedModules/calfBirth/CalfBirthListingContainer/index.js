import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions, BackHandler} from "react-native";
import _ from "lodash";

import authenticatedLayer from "../../../authenticatedLayer";
import CalfBirthListing from "../../../../templates/breedModules/calfBirthTemplates/CalfBirthListing";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getCalfBirthListAction, getCalfBirthDetailsAction} from "../../../../actions/breedModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {setActiveRoute} from "../../../../actions/routes.action";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    calfBirthList: PropTypes.array,
    token: PropTypes.string,
    comingFrom: PropTypes.string,
    handleEmptyCalfBirthList: PropTypes.func,
    handleGetCalfBirthList: PropTypes.func,
    handleGetCalfBirthDetails: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    handleCattleSearch: PropTypes.func,
    searchList: PropTypes.array,
    id: PropTypes.string,
    handleSetActiveRoute: PropTypes.func,
    activeRoute: PropTypes.string,
    routeName: PropTypes.string
};

const defaultProps = {
    calfBirthList: [],
    token: "",
    comingFrom: "",
    handleEmptyCalfBirthList: () => {},
    handleGetCalfBirthList: () => {},
    handleGetCalfBirthDetails: () => {},
    handleEmptySearchList: () => {},
    handleCattleSearch: () => {},
    searchList: [],
    id: "",
    handleSetActiveRoute: () => {},
    activeRoute: "",
    routeName: ""
};

class CalfBirthListingContainer extends Component {

    state = {
        data: this.props.calfBirthList,
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 0,
        id: this.props.id,
        noDatafromApi: false
    }

    componentDidMount() {
        // if (this.props.comingFrom === "summaryPage" && this.state.id) {
        //     this.resetStateProperties();
            this.props.handleEmptyCalfBirthList();
            this.props.handleGetCalfBirthList(this.state.id, this.props.token, this.state.pageNo);
        // } else {
        //     this.resetAllData();
        // }
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
                data: nextPorps.calfBirthList
            });
        }
    }

    componentDidUpdate(prevPorps) {
        if (prevPorps.activeRoute !== this.props.activeRoute) {
            this.triggerMountEvents();
        }
    }

    triggerMountEvents = () => {
        // if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
        //     this.resetStateProperties();
        //     this.props.handleEmptyCalfBirthList();
        //     this.setState({
        //         stellaCode: this.props.stellaCode
        //     });
        //     this.props.handleGetCalfBirthList(this.props.stellaCode, this.props.token, this.state.pageNo);
        // } else {
        //     this.resetAllData();
        // }

        if (this.props.comingFrom === "summaryPage" && this.state.id) {
            this.resetStateProperties();
            this.props.handleEmptyCalfBirthList();
            this.props.handleGetCalfBirthList(this.state.id, this.props.token, this.state.pageNo);
        } else {
            this.resetAllData();
        }
    }

    resetStateProperties = () => {
        this.setState({
            data: this.props.calfBirthList,
            pageNo: 0,
            isLoading: false,
            id: this.props.id,
            noDatafromApi: false
        });
        if (this.searchnode) {
            this.searchnode.clear();
        }
    }

    onPressCalfBirth = (calfBirth) => {
        console.log("calfbirth", calfBirth.id);
        this.props.handleGetCalfBirthDetails(calfBirth.id, this.props.token).then((data) => {
            if (data) navigateTo("calfBirthDetails");
        });
    }

    onCattleSearch = (searchText) => {
        this.props.handleCattleSearch(searchText, this.props.token);
    }

    onSearchItemPress = (item) => {
        this.setState({
            pageNo: 0,
            id: item.id
        }, () => {
            this.props.handleEmptyCalfBirthList();
            this.props.handleGetCalfBirthList(this.state.id, this.props.token, this.state.pageNo);
            this.props.handleEmptySearchList();
        });
    }

    resetAllData = () => {
        this.resetStateProperties();
        this.props.handleEmptyCalfBirthList();
        this.props.handleGetCalfBirthList(null, this.props.token, 0);
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
                this.props.handleGetCalfBirthList(this.state.id, this.props.token, this.state.pageNo).then((data) => {
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
       const data=_.uniqBy(this.state.data, 'id');
        return (
            <CalfBirthListing
                onbackPress={navigateBack}
                toolbarTitle= {I18n.t('calfBirthListing', {locale:language})}
                handleCreateNew={() => navigateTo("calfBirth")}
                calfBirthList={data}
                handlePressCalfBirth={this.onPressCalfBirth}
                handleSearch={this.onCattleSearch}
                searchList={this.props.searchList}
                handleSearchItemPress={this.onSearchItemPress}
                resetAllData={this.resetAllData}
                handleListScroll={this.onListScroll}
                handleViewLayout={this.onViewLayout}
                language={language}
            />
        );
    }
}

CalfBirthListingContainer.propTypes = propTypes;

CalfBirthListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    calfBirthList: state.breedModuleReducer.calfBirthList,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    activeRoute: state.routeReducer.activeRoute,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetCalfBirthDetails: (id, token) => dispatch(getCalfBirthDetailsAction(id, token)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyCalfBirthList: () => dispatch({type: "EMPTY_CALFBIRTH_LIST"}),
    handleGetCalfBirthList: (id, token, pageNo) => dispatch(getCalfBirthListAction(id, token, pageNo)),
    handleSetActiveRoute: route => dispatch(setActiveRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(CalfBirthListingContainer));
