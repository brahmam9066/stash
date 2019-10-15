import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions, BackHandler} from "react-native";

import authenticatedLayer from "../../../authenticatedLayer";
import {isPaidUser} from "../../../../config/settings";
import BodyConditionScoreListing from "../../../../templates/breedModules/bodyConditionScoreTemplates/BodyConditionScoreListing";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getBcsListAction, getBCSDetailsAction} from "../../../../actions/breedModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import  I18n from "../../../../utils/language.utils";
import {getImagesForRecordAction} from "../../../../actions/imageUpload.action";

import styles from "./styles";

const propTypes = {
    bcsList: PropTypes.array,
    token: PropTypes.string,
    comingFrom: PropTypes.string,
    stellaCode: PropTypes.string,
    handleEmptyBCSList: PropTypes.func,
    handleGetBCSList: PropTypes.func,
    handleGetBCSDetails: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    searchList: PropTypes.array,
    handleCattleSearch: PropTypes.func,
    userDetails: PropTypes.object
};

const defaultProps = {
    bcsList: [],
    token: "",
    comingFrom: "",
    stellaCode: "",
    handleEmptyBCSList: () => {},
    handleGetBCSList: () => {},
    handleGetBCSDetails: () => {},
    handleEmptySearchList: () => {},
    searchList: [],
    handleCattleSearch: () => {},
    userDetails: {}
};

class BodyConditionScoreListingContainer extends Component {

    state = {
        data: this.props.bcsList,
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 260,
        stellaCode: null,
        noDatafromApi: false,
        activeTab: "Score 1 - 2"
    }

    componentDidMount() {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyBCSList();
            this.setState({
                stellaCode: this.props.stellaCode
            });
            this.props.handleGetBCSList(this.props.stellaCode, this.props.token, this.state.pageNo);
        } else {
            this.resetAllData();
        }
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
                data: nextPorps.bcsList
            });
        }
    }


    resetStateProperties = () => {
        this.setState({
            data: this.props.bcsList,
            pageNo: 0,
            isLoading: false,
            stellaCode: null,
            noDatafromApi: false
        });
        if (this.searchnode) {
            this.searchnode.clear();
        }
    }

    onPressBcs = (Pd) => {
        this.props.handleGetBCSDetails(Pd.id, this.props.token).then((data) => {
            if (data) {
                this.props.handleGetImagesForRecord(this.props.token, data.id, "BodyConditionScore")
                .then((innerData) => {
                    if(innerData) navigateTo("bcsDetails");
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
            this.props.handleEmptyBCSList();
            this.props.handleGetBCSList(this.state.stellaCode, this.props.token, this.state.pageNo);
            this.props.handleEmptySearchList();
        });
    }

    resetAllData = () => {
        this.resetStateProperties();
        this.props.handleEmptyBCSList();
        this.props.handleGetBCSList(null, this.props.token, 0);
        this.setState({
            activeTab: "Score 1 - 2"
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
                this.props.handleGetBCSList(this.state.stellaCode, this.props.token, this.state.pageNo).then((data) => {
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
                <BodyConditionScoreListing
                    onbackPress={navigateBack}
                    toolbarTitle= {I18n.t('bodyConditionScoreListing', {locale:language})}
                    handleCreateNew={() => navigateTo("bodyConditionScore")}
                    bcsList={this.state.data}
                    handlePressBcs={this.onPressBcs}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    resetAllData={this.resetAllData}
                    handleListScroll={this.onListScroll}
                    handleViewLayout={this.onViewLayout}
                    activeTab={this.state.activeTab}
                    isPaidUser={isPaidUser()}
                    language={language}
                    permissionsToCreate={
                        this.props.userDetails.authorities &&
                        (this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER")
                        || this.props.userDetails.authorities.includes("ROLE_ADMIN")
                        || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")
                        || this.props.userDetails.authorities.includes("ROLE_EXTENSION_OFFICER"))}
                        isInternetConnected={this.props.isInternetConnected}
                        />
            </View>
        );
    }
}

BodyConditionScoreListingContainer.propTypes = propTypes;

BodyConditionScoreListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    bcsList: state.breedModuleReducer.bcsList,
    isInternetConnected: state.appReducer.isInternetConnected,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetBCSDetails: (id, token) => dispatch(getBCSDetailsAction(id, token)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyBCSList: () => dispatch({type: "EMPTY_BCS_LIST"}),
    handleGetBCSList: (stellaCode, token, pageNo) => dispatch(getBcsListAction(stellaCode, token, pageNo)),
    handleGetImagesForRecord: (token, id, className) => dispatch(getImagesForRecordAction(token, id, className))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(BodyConditionScoreListingContainer));
