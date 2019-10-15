import React from "react";
import {View, BackHandler} from "react-native";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import PregnancyHistoryList from "../../../../templates/breedModules/pregnancyHistoryTemplates/PregnancyHistoryList";
import authenticatedLayer from "../../../authenticatedLayer";
import {navigateBack, navigateTo} from "../../../../utils/utility";

import {getPregnancyList, getPregnancyHistoryDetails} from "../../../../actions/breedModule.actions";

import styles from "./styles";

const propTypes = {
    pregnancyList: PropTypes.array,
    animalDetails: PropTypes.object,
    dispatch: PropTypes.func,
    token: PropTypes.string,
    id: PropTypes.string
};

const defaultProps = {
    pregnancyList: [],
    dispatch: () => {},
    token: "",
    animalDetails: {},
    id: ""
};

class PregnancyHistoryListContainer extends React.Component {
    state = {
        pageNo: 0,
        activeTab: "Delivered"
    }

    componentDidMount() {
        this.props.dispatch(getPregnancyList(this.props.id, this.props.token, this.state.pageNo));
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack("dashboard");
        return true;
    }

    handlePressList = (item) => {
        console.log("item.prgnancyId", item);
        this.props.dispatch(getPregnancyHistoryDetails(this.props.id, item.id, this.props.token));
        navigateTo("pregnancyHistoryDetails");
    }

    render() {
        return (
            <View style={styles.container}>
                <PregnancyHistoryList
                    toolbarTitle="Pregnancy History"
                    pregnancyList={this.props.pregnancyList}
                    handlePressList={this.handlePressList}
                    onbackPress={navigateBack}
                    activeTab={this.state.activeTab}
                    animalDetails={this.props.animalDetails}
                />
            </View>
        );
    }
}

PregnancyHistoryListContainer.propTypes = propTypes;

PregnancyHistoryListContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    pregnancyList: state.breedModuleReducer.pregnancyList,
    animalDetails: state.animalMgmtReducer.animalDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(PregnancyHistoryListContainer));
