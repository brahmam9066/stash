import {connect} from "react-redux";
import {compose} from "redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text} from "react-native";
import {reduxForm, Field} from "redux-form";
import moment from "moment";

import authenticatedLayer from "../../authenticatedLayer";
import DatePickerAndroid from "../../../components/DatePicker/DatePicker.android";
import DryOff from "../../../templates/registerAnimalTemplates/DryOff";
import {navigateBack, navigateTo} from "../../../utils/utility";
import {cattleSearchAction} from "../../../actions/search.actions";
import {createDryOffAction} from "../../../actions/registerAnimal.actions";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    token: PropTypes.string,
    searchList: PropTypes.array,
    handleSubmit: PropTypes.func,
    handleEmptyCattleSearch: PropTypes.func,
    handleCattleSearch: PropTypes.func,
    handleCreateDryOff: PropTypes.func,
    reset: PropTypes.func
};

const defaultProps = {
    token: "",
    searchList: [],
    handleSubmit: () => {},
    handleEmptyCattleSearch: () => {},
    handleCattleSearch: () => {},
    handleCreateDryOff: () => {},
    reset: () => {}
};

class RecordMorphologyContainer extends Component {

    state={
        cattleDetails: {}
    };

    componentWillUnmount() {
        this.props.reset();
    }

    onSubmit = (values) => {
        const payload = {
            dryOffDate: moment(values.dryOffDate, "YYYY-MM-DD").toISOString()
        };
        this.props.handleCreateDryOff(this.state.cattleDetails.id, payload, this.props.token).then((data) => {
            if (data) navigateTo("dashboard");
        });
    }

    renderDatePicker = (field) => {
        const {meta: {touched, error}, id, label, maxDate, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <DatePickerAndroid
                    id={id}
                    onChangeText={onChange}
                    onChangeDate={date => onChange(date)}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    maxDate={maxDate}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    onCattleSearch = (searchText) => {
        this.props.handleCattleSearch(searchText, this.props.token);
    }

    onSearchItemPress = (item, node) => {
        this.setState({
            cattleDetails: item
        });
        this.props.handleEmptyCattleSearch();
        node.clear();
    }

    renderDryOffForm = () => {
        const {language} = this.props
        return (
            <View style={styles.formContainer}>
                <View style={styles.width100}>
                    <Field
                        id="dryOffDate"
                        name="dryOffDate"
                        label= {I18n.t('dryoffDate', {locale:language})}
                        component={this.renderDatePicker} />
                </View>
            </View>
        );
    }

    render() {
        const {handleSubmit, searchList,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <DryOff
                    onbackPress={() => {
                        // if (comingFrom === "animalSummary") {
                        navigateBack();
                        // } else {
                        // navigateBack("dashboard");
                        // }
                    }}
                    searchList={searchList}
                    handleSearch={this.onCattleSearch}
                    handleSearchItemPress={this.onSearchItemPress}
                    cattleDetails={this.state.cattleDetails}
                    toolbarTitle= {I18n.t('recordDryoff', {locale:language})}
                    renderDryOffForm={this.renderDryOffForm()}
                    handleSavePress={handleSubmit(this.onSubmit)}
                    language={language}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleCreateDryOff: (id, payload, token) => dispatch(createDryOffAction(id, payload, token))
});

RecordMorphologyContainer.propTypes = propTypes;
RecordMorphologyContainer.defaultProps = defaultProps;

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "dryOffForm"})
)(authenticatedLayer(RecordMorphologyContainer));
