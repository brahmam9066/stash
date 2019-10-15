import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Dimensions, BackHandler} from "react-native";

import {isPaidUser} from "../../../../config/settings";
import authenticatedLayer from "../../../authenticatedLayer";
import MorphologicalListing from "../../../../templates/registerAnimalTemplates/morphologyTemplates/MorphologicalListing";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {getMorphologicalListAction, getMorphologicalDetailsAction} from "../../../../actions/registerAnimal.actions";
import  I18n from "../../../../utils/language.utils"
import {getImagesForRecordAction} from "../../../../actions/imageUpload.action";;

import styles from "./styles";

const propTypes = {
    token: PropTypes.string,
    searchList: PropTypes.array,
    morphologicalList: PropTypes.array,
    userDetails: PropTypes.object,
    handleCattleSearch: PropTypes.func,
    handleEmptyCattleSearch: PropTypes.func,
    handleEmptyMorphologicalList: PropTypes.func,
    handleGetMorphologicalList: PropTypes.func,
    handleGetMorphologicalDetails: PropTypes.func
};

const defaultProps = {
    token: "",
    searchList: [],
    morphologicalList: [],
    userDetails: {},
    handleCattleSearch: () => {},
    handleEmptyCattleSearch: () => {},
    handleEmptyMorphologicalList: () => {},
    handleGetMorphologicalList: () => {},
    handleGetMorphologicalDetails: () => {}
};

class MorphologicalListingContainer extends Component {

    state = {
        pageNo: 0,
        isLoading: false,
        beforeScrollViewHeight: 220,
        noDatafromApi: false,
        cattleDetails: {}
    }

    componentDidMount() {
        console.log("morphologial listing mount");
        this.resetAllData();
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack("dashboard");
        return true;
    }

    resetAllData = () => {
        this.setState({
            pageNo: 0,
            cattleDetails: {},
            noDatafromApi: false,
            isLoading: false
        }, () => {
            this.props.handleEmptyMorphologicalList();
            this.props.handleGetMorphologicalList(this.props.token, this.state.pageNo);
        });
    }

    onCattleSearch = (searchText) => {
        this.props.handleCattleSearch(searchText, this.props.token);
    }

    onSearchItemPress = (item, node) => {
        this.setState({cattleDetails: item, pageNo: 0}, () => {
            this.props.handleEmptyMorphologicalList();
            this.props.handleGetMorphologicalList(this.props.token, this.state.pageNo, item.id);
        });
        node.clear();
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
                this.props.handleGetMorphologicalList(this.props.token, this.state.pageNo, this.state.cattleDetails.id).then((data) => {
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

    onPressMorphology = (passedMorphologicalDetails) => {
        this.props.handleGetMorphologicalDetails(passedMorphologicalDetails.id, this.props.token).then((data) => {
            if (data) {
                this.props.handleGetImagesForRecord(this.props.token, data.id, "CattleMorphology")
                .then((innerData) => {
                    if(innerData) navigateTo("morphologicalDetails");
                });
            }
        });
    }

    onPressCreate = () => {
        navigateTo("recordMorphology");
    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.container}>
                <MorphologicalListing
                    morphologicalList={this.props.morphologicalList}
                    onbackPress={navigateBack}
                    toolbarTitle= {I18n.t('morphologicalListing', {locale:language})}
                    handleCreateNew={this.onPressCreate}
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
                    onPressMorphology={this.onPressMorphology}
                    language={language}
                    permissionsToCreate={
                        this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER") ||
                        this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                />
            </View>
        );
    }
}

MorphologicalListingContainer.propTypes = propTypes;

MorphologicalListingContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    morphologicalList: state.animalMgmtReducer.morphologicalList,
    searchList: state.searchReducer.searchList,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyMorphologicalList: () => dispatch({type: "EMPTY_MORPHOLOGICAL_LIST"}),
    handleGetMorphologicalList: (token, pageNo, cattleId) => dispatch(getMorphologicalListAction(token, pageNo, cattleId)),
    handleGetMorphologicalDetails: (id, token) => dispatch(getMorphologicalDetailsAction(id, token)),
    handleGetImagesForRecord: (token, id, className) => dispatch(getImagesForRecordAction(token, id, className))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(MorphologicalListingContainer));
