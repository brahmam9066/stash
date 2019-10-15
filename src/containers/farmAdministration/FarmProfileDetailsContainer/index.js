import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";

import {isPaidUser} from "../../../config/settings";
import FarmProfileDetails from "../../../templates/farmAdministration/FarmProfileDetailsTemplate";
import {navigateBack, navigateTo} from "../../../utils/utility";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    farmDetails: PropTypes.object
};

const defaultProps = {
    farmDetails: {}
};

class FarmProfileDetailsContainer extends Component {

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack("myAccount");
        return true;
    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.container}>
                <FarmProfileDetails
                    onbackPress={() => navigateBack("myAccount")}
                    toolbarTitle={ I18n.t('farmProfile', {locale:language})}
                    isPaidUser={isPaidUser()}
                    onEditPress={() => { navigateTo("farmProfileRegistration", {isEditFarmDetails: true}); }}
                    farmDetails={this.props.farmDetails} 
                    language={language}/>
            </View>
        );
    }
}

FarmProfileDetailsContainer.propTypes = propTypes;

FarmProfileDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    farmDetails: state.farmAdminReducer.farmDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(FarmProfileDetailsContainer);
