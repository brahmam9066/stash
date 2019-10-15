import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {navigateBack} from "../../../../utils/utility";
import authenticatedLayer from "../../../authenticatedLayer";
import PregnancyHistoryDetails from "../../../../templates/breedModules/pregnancyHistoryTemplates/PregnancyHistoryDetails";

import styles from "./styles";

const propTypes = {
    pregnancyDetails: PropTypes.object,
    animalDetails: PropTypes.object
};

const defaultProps = {
    pregnancyDetails: {},
    animalDetails: {}
};


class PregnancyHistoryDetailsContainer extends React.Component {
    render() {
        console.log("pregnancyDetails", this.props.pregnancyDetails);
        return (
            <View style={styles.container}>
                <PregnancyHistoryDetails
                    toolbarTitle="Pregnancy History"
                    pregnancyDetails={this.props.pregnancyDetails}
                    onbackPress={navigateBack}
                    animalDetails={this.props.animalDetails}
                    language={this.props.language}
                />
            </View>
        );
    }
}

PregnancyHistoryDetailsContainer.propTypes = propTypes;

PregnancyHistoryDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    pregnancyDetails: state.breedModuleReducer.pregnancyDetials,
    animalDetails: state.animalMgmtReducer.animalDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(PregnancyHistoryDetailsContainer));
