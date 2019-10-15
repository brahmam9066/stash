import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions} from "react-native";

import authenticatedLayer from "../../../authenticatedLayer";
import {isPaidUser} from "../../../../config/settings";
import MilkLogListing from "../../../../templates/productionModules/milkLogTemplates/MilkLogListingTemplate";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getMilkLogListAction, getMilkLogDetailsAction} from "../../../../actions/productionModule.action";
import {cattleSearchAction} from "../../../../actions/search.actions";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    milkLogList: PropTypes.array,
    token: PropTypes.string,
    comingFrom: PropTypes.string,
    stellaCode: PropTypes.string,
    searchList: PropTypes.array,
    handleEmptyMilkLogList: PropTypes.func,
    handleGetMilkLogList: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    handleCattleSearch: PropTypes.func
};

const defaultProps = {
    milkLogList: [],
    token: "",
    comingFrom: "",
    stellaCode: "",
    searchList: [],
    handleEmptyMilkLogList: () => { },
    handleGetMilkLogList: () => { },
    handleEmptySearchList: () => { },
    handleCattleSearch: () => {}
};

class MilkLogListingContainer extends Component {

    state = {
        milkLogList: this.props.milkLogList,
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 270,
        stellaCode: null,
        noDatafromApi: false,
        activeTab: "ALL"
    }

    componentDidMount() {
        if (this.props.comingFrom === "summaryPage" && this.props.stellaCode) {
            this.resetStateProperties();
            this.props.handleEmptyMilkLogList();
            this.props.handleGetMilkLogList(this.props.stellaCode, this.props.token, this.state.pageNo);
            this.setState({stellaCode: this.props.stellaCode});
        } else {
            this.resetAllData();
        }
    }

    componentWillReceiveProps(nextPorps) {
        if (nextPorps) {
            this.setState({
                milkLogList: nextPorps.milkLogList
            });
        }
    }

    resetStateProperties = () => {
        this.setState({
            milkLogList: this.props.milkLogList,
            pageNo: 0,
            isLoading: false,
            stellaCode: null,
            noDatafromApi: false
        });
        if (this.searchnode) {
            this.searchnode.clear();
        }
    }

    onPressMilkLog = (milkLog) => { navigateTo("milkLogDetails", {milkLog, comingFrom: "milkLogListing"}); }

    onCattleSearch = (searchText) => {
        if (searchText === "") {
            this.props.handleEmptyMilkLogList();
            this.resetAllData();
        } else {
            this.props.handleCattleSearch(searchText, this.props.token);
        }
    }

    onSearchItemPress = (item) => {
        this.props.handleEmptyMilkLogList();
        this.resetStateProperties();
        this.setState({
            pageNo: 0,
            stellaCode: item.stellaCode
        }, () => {
            this.props.handleGetMilkLogList(this.state.stellaCode, this.props.token, this.state.pageNo);
            this.props.handleEmptySearchList();
        });
    }

    resetAllData = () => {
        this.resetStateProperties();
        this.props.handleEmptyMilkLogList();
        this.props.handleGetMilkLogList(null, this.props.token, 0);
        this.setState({
            activeTab: "ALL"
        });
    }

    onListScroll = (e) => {
        const windowHeight = Dimensions.get("window").height;
        const {contentSize: {height}, contentOffset: {y: offset}} = e.nativeEvent;
        // console.log(
        //     "windowHeight: ", windowHeight,
        //     "height: ", height,
        //     "offset: ", offset,
        //     "beforeScrollViewHeight: ", this.state.beforeScrollViewHeight,
        //     "calculatedHeighr: ", windowHeight + offset - this.state.beforeScrollViewHeight
        // );
        if (windowHeight + offset - this.state.beforeScrollViewHeight >= height && !this.state.isLoading && !this.state.noDatafromApi) {
            this.setState((state) => {
                return {
                    isLoading: true,
                    pageNo: state.pageNo + 1
                };
            }, () => {
                this.props.handleGetMilkLogList(this.state.stellaCode, this.props.token, this.state.pageNo).then((milkLogList) => {
                    if (milkLogList.length > 0) {
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

    setSession = (session) => {
        if (session === "ALL") {
            this.setState({milkLogList: this.props.milkLogList});
        } else {
            this.setState({milkLogList: this.props.milkLogList.filter(item => item.collectionSession === session)});
        }
        this.setState({activeTab: session});
    }

    render() {
        const {language}= this.props
        return (
            <View style={styles.container}>
                <MilkLogListing
                    onbackPress={navigateBack}
                    toolbarTitle= {I18n.t('milkLog', {locale:language})}
                    handleCreateNew={() => navigateTo("recordMilkLog")}
                    milkLogList={this.state.milkLogList}
                    handlePressMilkLog={this.onPressMilkLog}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    resetAllData={this.resetAllData}
                    handleListScroll={this.onListScroll}
                    handleViewLayout={this.onViewLayout}
                    activeTab={this.state.activeTab}
                    isPaidUser={isPaidUser()}
                    setSession={this.setSession}
                    language={language}
                />
            </View>
        );
    }
}

MilkLogListingContainer.propTypes = propTypes;

MilkLogListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    milkLogList: state.productionReducer.milkLogList,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetMilkLogDetails: (id, token) => dispatch(getMilkLogDetailsAction(id, token)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyMilkLogList: () => dispatch({type: "EMPTY_MILKLOG_LIST"}),
    handleGetMilkLogList: (stellaCode, token, pageNo) => dispatch(getMilkLogListAction(stellaCode, token, pageNo))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(MilkLogListingContainer));
