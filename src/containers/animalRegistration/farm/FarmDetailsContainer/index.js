import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";

import {isPaidUser} from "../../../../config/settings";
import FarmProfileDetails from "../../../../templates/registerAnimalTemplates/farm/FarmDetailsTemplate";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getFarmDetailsAction} from "../../../../actions/registerAnimal.actions"

import styles from "./styles";

const propTypes = {
    farmDetails: PropTypes.object,
    item: PropTypes.object,
    handleGetFarmDetails: PropTypes.func
};

const defaultProps = {
    farmDetails: {},
    item: {},
    handleGetFarmDetails: () => {}
};

class FarmProfileDetailsContainer extends Component {

    componentDidMount() {
        this.props.handleGetFarmDetails(this.props.token, this.props.item.id)
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        console.log(this.props);
        if ( this.props.comingFrom === "nearMeListing" ) {
            navigateBack();
        } else {
            navigateBack("farmListing");
        }
        return true;
    }

    handleRegisterAnimalPress = (orgId, orgName, orgType) => {
        navigateTo("profileInformation", {orgDetails: {orgId, orgName, orgType}, comingFrom: "farmDetails"})
    }

    render() {
        return (
            <View style={styles.container}>
                <FarmProfileDetails
                    onbackPress={() => this.handleBackPress()}
                    toolbarTitle="Farm Profile"
                    isPaidUser={isPaidUser()}
                    onEditPress={() => { navigateTo("recordFarm", {isEditFarmDetails: true}); }}
                    onRegisterAnimalPress={this.handleRegisterAnimalPress}
                    isEditPermission={this.props.isEditPermission  || this.props.userDetails.authorities.includes("ROLE_ADMIN") || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN")}
                    farmDetails={this.props.farmDetails} />
            </View>
        );
    }
}

handleCheckInventory = (orgConfiguration, key) => {
    const checkInventory = orgConfiguration.filter(item => (item.configName === key));
    if (checkInventory.length > 0 && checkInventory[0].value === "TRUE") {
        return true;
    }
    return false;
}

FarmProfileDetailsContainer.propTypes = propTypes;

FarmProfileDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    farmDetails: state.animalMgmtReducer.farmDetails,
    userDetails: state.farmAdminReducer.userDetails,
    isEditPermission: handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_SELF_ADMINISTRATION_FOR_HO") || handleCheckInventory(state.lookupDataReducer.orgConfiguration, "ENABLE_SELF_ADMINISTRATION_FOR_EO")
});

const mapDispatchToProps = dispatch => ({
    handleGetFarmDetails: (token, id) => dispatch(getFarmDetailsAction(token, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(FarmProfileDetailsContainer);
