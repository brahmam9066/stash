import {connect} from "react-redux";
import React, {Component} from "react";
import {View, BackHandler} from "react-native";
import PropTypes from "prop-types";

import authenticatedLayer from "../../../authenticatedLayer";
import MilkLogDetails from "../../../../templates/productionModules/milkLogTemplates/MilkLogDetailsTemplate";
import Footer from "../../../../components/Footer";
import {getMilkLogDetailsAction, getMilkLogForDayAction, pushToMilkLogForDayDetails} from "../../../../actions/productionModule.action";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    token: PropTypes.string,
    milkLog: PropTypes.object,
    milkLogDetailsForDay: PropTypes.array,
    comingFrom: PropTypes.string,
    handleGetMilkLogForDayAction: PropTypes.func,
    handleResetmilkLogForDayDetails: PropTypes.func,
    handleGetMilkLogDetails: PropTypes.func,
    handlePushToMilkLogForDayDetails: PropTypes.func
};

const defaultProps = {
    token: "",
    milkLog: {},
    milkLogDetailsForDay: [],
    comingFrom: "",
    handleGetMilkLogForDayAction: () => {},
    handleResetmilkLogForDayDetails: () => {},
    handleGetMilkLogDetails: () => {},
    handlePushToMilkLogForDayDetails: () => {}
};

class MilkLogDetailsContainer extends Component {

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        this.handleMilkLogDetailsListing();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comingFrom !== this.props.comingFrom) {
            this.handleMilkLogDetailsListing();
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleMilkLogDetailsListing = () => {
        const milkLog = {...this.props.milkLog};
        console.log(milkLog);
        const stellaCode = this.props.comingFrom === "milkLogListing" ? milkLog.cattle.stellaCode : milkLog.cattles[0].stellaCode;
        this.props.handleGetMilkLogForDayAction(stellaCode, milkLog.collectedOn, this.props.token).then((milkLogForDay) => {
            this.props.handleResetmilkLogForDayDetails();
            if (milkLogForDay) {
                milkLogForDay.map((milkLogInner) => {
                    this.props.handleGetMilkLogDetails(milkLogInner.id, this.props.token).then((milkLogDetails) => {
                        this.props.handlePushToMilkLogForDayDetails(milkLogDetails);
                    });
                    return null;
                });
            }
        });
    }

    handleBackPress = () => {
        navigateBack("milkLogListing");
        return true;
    }

    onPressMilkLogEdit = (milkLogDetails) => {
        this.props.handleGetMilkLogDetails(milkLogDetails.id, this.props.token).then((response) => {
            if (response) navigateTo("recordMilkLog", {isEditMilkLog: true, comingFrom: "milkLogDetails"});
        });
    }

    render() {
        const {language} = this.props
        return (
            <View style={styles.container}>
                <MilkLogDetails
                    onbackPress={() => navigateBack("milkLogListing")}
                    toolbarTitle= {I18n.t('milkLogDetails', {locale:language})}
                    milkLogDetailsForDay={this.props.milkLogDetailsForDay}
                    handlePressEditMilkLog={this.onPressMilkLogEdit}
                    language={language}
                />
                <Footer 
                 language={language}/>
            </View>
        );
    }
}

MilkLogDetailsContainer.propTypes = propTypes;

MilkLogDetailsContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    milkLogDetailsForDay: state.productionReducer.milkLogDetailsForDay,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetMilkLogDetails: (id, token) => dispatch(getMilkLogDetailsAction(id, token)),
    handleGetMilkLogForDayAction: (stellaCode, collectedOn, token) => dispatch(getMilkLogForDayAction(stellaCode, collectedOn, token)),
    handlePushToMilkLogForDayDetails: milkLogDetails => dispatch(pushToMilkLogForDayDetails(milkLogDetails)),
    handleResetmilkLogForDayDetails: () => dispatch({type: "EMPTY_MILKLOG_DETAILS_FOR_DAY"})
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(MilkLogDetailsContainer));
