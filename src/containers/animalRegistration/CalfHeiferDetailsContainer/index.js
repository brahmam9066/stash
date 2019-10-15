import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View} from "react-native";

import authenticatedLayer from "../../authenticatedLayer";
import CalfHeiferDetails from "../../../templates/calfHeiferListingTemplates/CalfHeiferDetails";
import {navigateBack, navigateTo} from "../../../utils/utility";
import {getMorphologicalCurrentDetailsAction, getAnimalProfiledetailsAction} from "../../../actions/registerAnimal.actions";
import Footer from "../../../components/Footer";
import {CattleDetailsIcons} from "../../../assets";
import {calfTabList} from "../CattleDetailsContainer/tabConfig";
import  I18n from "../../../utils/language.utils";


import styles from "./styles";

const propTypes = {
    dispatch: PropTypes.func,
    token: PropTypes.string,
    animalDetails: PropTypes.object,
    item: PropTypes.object,
    morphologicalDetails: PropTypes.any,
    // defaultTab: PropTypes.string
};

const defaultProps = {
    dispatch: () => {},
    token: "",
    animalDetails: {},
    item: {},
    morphologicalDetails: {},
    // defaultTab: calfTabList[0].tabUniqueId
};


class CalfHeiferDetailsContainer extends Component {

    componentDidMount() {
        const {item} = this.props;
        const calfId = item.id;
        this.props.dispatch(getAnimalProfiledetailsAction(calfId, this.props.token));
        this.props.dispatch(getMorphologicalCurrentDetailsAction(calfId, this.props.token));
    }

    onTabPress = (tabId) => {
        const {animalDetails} = this.props;
        if (tabId) {
            navigateTo(tabId, {id: animalDetails.id, comingFrom: "summaryPage", stellaCode: animalDetails.stellaCode});
        }
    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.container}>
                <CalfHeiferDetails
                    calfDetails={this.props.animalDetails}
                    morphologicalDetails={this.props.morphologicalDetails}
                    onbackPress={navigateBack}
                    toolbarTitle={I18n.t('calfHeiferDetails', {locale:language})}
                    tabList={calfTabList(language)}
                    defaultTab={this.props.defaultTab}
                    handleTabPress={this.onTabPress}
                    language={this.props.language}
                    permissionsToModify={this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN") || this.props.userDetails.authorities.includes("ROLE_HEALTH_OFFICER") || this.props.userDetails.authorities.includes("ROLE_EXTENSION_OFFICER"))}
                />
                <Footer 
                language={language}/>
            </View>
        );
    }
}

CalfHeiferDetailsContainer.propTypes = propTypes;

CalfHeiferDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    userDetails: state.farmAdminReducer.userDetails,
    token: state.authReducer.token,
    animalDetails: state.animalMgmtReducer.animalDetails,
    morphologicalDetails: state.animalMgmtReducer.morphologicalDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(CalfHeiferDetailsContainer));
