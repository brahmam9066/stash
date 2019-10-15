import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions} from "react-native";

import authenticatedLayer from "../authenticatedLayer";
import ListingTemplate from "../../templates/ListingTemplate";
import {navigateBack, navigateTo} from "../../utils/utility";
import {cattleSearchAction} from "../../actions/search.actions";

import styles from "./styles";

const propTypes = {
    dehorningList: PropTypes.array,
    token: PropTypes.string,
    handleCattleSearch: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    searchList: PropTypes.array,
    handleEmptyDehorningList: PropTypes.func,
    handleGetDehorningList: PropTypes.func
};

const defaultProps = {
    dehorningList: [],
    token: "",
    handleCattleSearch: () => {},
    handleEmptySearchList: () => {},
    searchList: [],
    handleEmptyDehorningList: () => {},
    handleGetDehorningList: () => {}
};

class DehorningListingContainer extends Component {

    state = {
        data: this.props.dehorningList,
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 0,
        stellaCode: null,
        noDatafromApi: false
    }

    resetStateProperties = () => {
        this.setState({
            data: [],
            pageNo: 0,
            isLoading: false,
            stellaCode: null,
            noDatafromApi: false
        });
        if (this.searchnode) {
            this.searchnode.clear();
        }
    }

    onPressListItem = (item) => {

    }

    onCattleSearch = (searchText) => {
        this.props.handleCattleSearch(searchText, this.props.token);
    }

    onSearchItemPress = (item) => {
        this.setState({
            pageNo: 0,
            stellaCode: item.stellaCode
        }, () => {
            this.props.handleEmptyDehorningList();
            this.props.handleGetDehorningList(this.state.stellaCode, this.props.token, this.state.pageNo);
        });
        this.props.handleEmptySearchList();
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
                this.props.handleGetDehorningList(this.state.stellaCode, this.props.token, this.state.pageNo).then((data) => {
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
        return (
            <View style={styles.container}>
                <ListingTemplate
                    onbackPress={navigateBack}
                    toolbarTitle="Dehorning Listing"
                    handleCreateNew={() => navigateTo("recordDehorning")}
                    dehorningList={this.state.data}
                    handlePressDehorning={this.onPressDehorning}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    resetAllData={this.resetAllData}
                    handleListScroll={this.onListScroll}
                    handleViewLayout={this.onViewLayout}
                />
            </View>
        );
    }
}

DehorningListingContainer.propTypes = propTypes;

DehorningListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"})
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(DehorningListingContainer));
