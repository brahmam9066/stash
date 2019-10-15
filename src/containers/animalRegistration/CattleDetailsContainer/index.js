import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View} from "react-native";

import authenticatedLayer from "../../authenticatedLayer";
import CattleDetails from "../../../templates/animalListingTemplates/CattleDetails";
import {navigateBack, navigateTo} from "../../../utils/utility";
import Footer from "../../../components/Footer";
import {getAnimalProfiledetailsAction} from "../../../actions/registerAnimal.actions";
import {getTreatmentListAction, getOrgConfigAction, getHealthMetaDataAction} from "../../../actions/healthModule.actions";
import {cattleSearchAction} from "../../../actions/search.actions";
import {tabList} from "./tabConfig";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    selectedAnimalDetails: PropTypes.object,
    token: PropTypes.string,
    dispatch: PropTypes.func,
    searchList: PropTypes.array,
    handleCattleSearch: PropTypes.func,
    handleEmptyCattleSearch: PropTypes.func,
    animalDetails: PropTypes.any,
    handleGetTreatmentList: PropTypes.func,
    handleGetOrgConfig: PropTypes.func,
    handleGetHealthMetaData: PropTypes.func
};

const defaultProps = {
    selectedAnimalDetails: {},
    token: "",
    dispatch: () => {},
    searchList: [],
    handleCattleSearch: () => {},
    handleEmptyCattleSearch: () => {},
    animalDetails: {},
    handleGetTreatmentList: () => {},
    handleGetOrgConfig: () => {},
    handleGetHealthMetaData: () => {}
};

class CattleDetailsContainer extends Component {

    componentDidMount() {
        this.props.dispatch(getAnimalProfiledetailsAction(this.props.selectedAnimalDetails.id, this.props.token));
    }

    onTabPress = (tabId) => {
        const {animalDetails} = this.props;
        console.log("anumaldetails", animalDetails);
        if (tabId) {
            this.props.handleGetOrgConfig(this.props.token);
            this.props.handleGetHealthMetaData(this.props.token);
            navigateTo(tabId, {id: animalDetails.id, comingFrom: "summaryPage", stellaCode: animalDetails.stellaCode});
        }
    }

    onCattleSearch = (searchText) => {
        console.log(searchText);
        this.props.handleCattleSearch(searchText, this.props.token);
    }

    onSearchItemPress = (item, node) => {
        this.props.dispatch(getAnimalProfiledetailsAction(item.id, this.props.token));
        this.props.handleEmptyCattleSearch();
        node.clear();
    }

    render() {
        const {language} = this.props;
        return (
            <View style={styles.container}>
                <CattleDetails
                    selectedAnimalDetails={this.props.animalDetails}
                    onbackPress={navigateBack}
                    toolbarTitle={I18n.t('animalDetails', {locale:language})}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    tabList={tabList(language)}
                    defaultTab={this.props.defaultTab}
                    handleTabPress={this.onTabPress}
                    comingFrom={this.props.comingFrom}
                    language={language}
                />
                <Footer 
                language={language}/>
            </View>
        );
    }
}

CattleDetailsContainer.propTypes = propTypes;

CattleDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    animalDetails: state.animalMgmtReducer.animalDetails,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleGetOrgConfig: token => dispatch(getOrgConfigAction(token)),
    handleGetHealthMetaData: token => dispatch(getHealthMetaDataAction(token)),
    handleGetTreatmentList: (stellaCode, token) => dispatch(getTreatmentListAction(stellaCode, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(CattleDetailsContainer));
