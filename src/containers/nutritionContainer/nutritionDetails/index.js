import {connect} from "react-redux";
import React, {Component} from "react";
import {BackHandler, View} from "react-native";
import PropTypes from "prop-types";
import authenticatedLayer from "../../authenticatedLayer";
import NutritionDetails from "../../../templates/nutritionTemplates/nutritionDetails";
import Footer from "../../../components/Footer";
import {navigateBack, navigateTo} from "../../../utils/utility";
import {setActiveRoute} from "../../../actions/routes.action";
import I18n from "../../../utils/language.utils";
import styles from "./styles";

const propTypes = {
    nutritionDetails: PropTypes.object,
    userDetails: PropTypes.object,
    handleSetActiveRoute: PropTypes.func,
    routeName: PropTypes.string
};

const defaultProps = {
    nutritionDetails: {},
    userDetails: {},
    handleSetActiveRoute: () => {
    },
    routeName: ""
};

class NutritionDetailsContainer extends Component {

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        this.props.handleSetActiveRoute(this.props.routeName);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        navigateBack("nutritionListing");
        return true;
    }

    onPressNutritionEdit = () => {
        navigateTo("recordNutrition", {isEditNutrition: true});
    }

    render() {
        const {language} = this.props;
        return (
            <View style={styles.container}>
                <NutritionDetails
                    onbackPress={() => navigateBack("nutritionListing")}
                    toolbarTitle={I18n.t("nutritionDetails", {locale: language})}
                    nutritionDetails={this.props.nutritionDetails}
                    permissionsToModify={this.props.userDetails.authorities && (this.props.userDetails.authorities.includes("ROLE_ADMIN")
                        || this.props.userDetails.authorities.includes("ROLE_SUPER_ADMIN"))}
                    language={language}
                    handlePressNutritionEdit={this.onPressNutritionEdit} />
                <Footer
                    language={language} />
            </View>
        );
    }
}

NutritionDetailsContainer.propTypes = propTypes;

NutritionDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    nutritionDetails: state.nutritionReducer.nutritionDetails,
    userDetails: state.farmAdminReducer.userDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleSetActiveRoute: route => dispatch(setActiveRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(NutritionDetailsContainer));
