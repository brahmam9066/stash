import {connect} from "react-redux";
import React, {Component} from "react";
import {View,BackHandler} from "react-native";
import PropTypes from "prop-types";

import authenticatedLayer from "../../authenticatedLayer";
import UserProfileDetails from "../../../templates/farmAdministration/UserProfileDetailsTemplate";
import {navigateBack} from "../../../utils/utility";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    userDetails: PropTypes.object
};

const defaultProps = {
    userDetails: {}
};

class UserProfileDetailsContainer extends Component {

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
                <UserProfileDetails
                    onbackPress={() => navigateBack("myAccount")}
                    toolbarTitle={ I18n.t('profileDetails', {locale:language})}
                    userDetails={this.props.userDetails} 
                    language={language}/>
            </View>
        );
    }
}

UserProfileDetailsContainer.defaultProps = defaultProps;

UserProfileDetailsContainer.propTypes = propTypes;

const mapStateToProps = state => ({
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(UserProfileDetailsContainer));
