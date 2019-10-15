import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker} from "react-native";
import {reduxForm, Field} from "redux-form";
import PropTypes from "prop-types";

import moment from "moment";
import authenticatedLayer from "../../../authenticatedLayer";
import InputText from "../../../../components/InputText";
import ListPicker from "../../../../components/ListPicker";
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import MilkLog from "../../../../templates/productionModules/milkLogTemplates/RecordMilkLogTemplate";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {updateMilkLogAction, createMilkLogAction, getMilkLogListAction} from "../../../../actions/productionModule.action";
import TimePickerAndroid from "../../../../components/TimePicker/TimePicker.android";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    token: PropTypes.string,
    isEditMilkLog: PropTypes.bool,
    initialValues: PropTypes.object,
    searchList: PropTypes.array,
    handleSubmit: PropTypes.func,
    reset: PropTypes.func,
    handleCattleSearch: PropTypes.func,
    handleEmptyCattleSearch: PropTypes.func,
    createMilkLogAction: PropTypes.func,
    updateMilkLogAction: PropTypes.func
};

const defaultProps = {
    token: "",
    isEditMilkLog: false,
    initialValues: {},
    searchList: [],
    handleSubmit: () => {},
    reset: () => {},
    handleCattleSearch: () => {},
    handleEmptyCattleSearch: () => {},
    createMilkLogAction: () => {},
    updateMilkLogAction: () => {}
};

class MilkLogContainer extends Component {

    state = {
        stellaCode: "",
        cattleDetails: {}
        // isInventory: false,
    }


    componentDidMount() {
        if (this.props.isEditMilkLog) {
            this.setState({
                stellaCode: this.props.initialValues.cattles && this.props.initialValues.cattles[0] ? this.props.initialValues.cattles[0].stellaCode : "",
                cattleDetails: this.props.initialValues.cattles && this.props.initialValues.cattles[0] ? this.props.initialValues.cattles[0] : {}
            });
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    onCattleSearch = (searchText) => {
        this.props.handleCattleSearch(searchText, this.props.token);
    }

    onSearchItemPress = (item, node) => {
        this.setState({
            stellaCode: item.stellaCode,
            cattleDetails: item
        });
        this.props.handleEmptyCattleSearch();
        node.clear();
    }

    onSubmit = (values) => {
        console.log(values, "values");
        if (this.props.isEditMilkLog && values.id) {
            const payload = {
                id: values.id,
                cattles: [{stellaCode: values.cattles[0].stellaCode}],
                collectedOn: moment.utc(moment(`${values.milkRecordedDate} ${values.milkRecordedTime}`, "YYYY-MM-DD hh:mm A")).format(),
                quantity: values.quantity,
                quantityUnit: "Liters",
                collectionSession: values.collectionSession,
                collectionMode: "MANUAL",
                qualityMeasurements: [{
                    fat: values.fat,
                    snf: values.snf,
                    scc: values.scc
                }]
            };
            console.log(payload, "update");
            this.props.updateMilkLogAction(payload, this.props.token).then((data) => {
                if (data) {
                    this.props.handleGetMilkLogList(this.props.token);
                    navigateTo("milkLogDetails", {milkLog: data, comingFrom: "recordMilkLog"});
                }
            });
        } else {
            const payload = {
                cattles: [{
                    stellaCode: this.state.stellaCode
                }],
                milkCollections: [{
                    collectedOn: moment.utc(moment(`${values.milkRecordedDate} ${values.milkRecordedTime}`, "YYYY-MM-DD hh:mm A")).format(),
                    quantity: values.quantity,
                    quantityUnit: "Liters",
                    collectionSession: values.collectionSession,
                    collectionMode: "MANUAL"
                }],
                qualityMeasurements: [{
                    fat: values.fat,
                    snf: values.snf,
                    scc: values.scc
                }]
            };
            console.log(payload, "create");
            this.props.createMilkLogAction(payload, this.props.token).then((data) => {
                if (data) {
                    this.props.handleGetMilkLogList(this.props.token);
                    navigateTo("milkLogDetails", {milkLog: data, comingFrom: "recordMilkLog"});
                }
            });
        }
    };

    renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, editable, maxLength, keyboardType, placeholder, input: {value, onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    editable={editable}
                    value={value}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderDatePicker = (field) => {
        const {meta: {touched, error}, label, disabled, secureTextEntry, minDate, maxDate, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <DatePickerAndroid
                    onChangeText={onChange}
                    onChangeDate={date => onChange(date)}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    minDate={minDate}
                    maxDate={maxDate}
                    disabled={disabled}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderTimePicker = (field) => {
        const {meta: {touched, error}, label, disabled, secureTextEntry, minDate, maxDate, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <TimePickerAndroid
                    onChangeText={onChange}
                    onChangeTime={time => onChange(time)}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    minDate={minDate}
                    maxDate={maxDate}
                    disabled={disabled}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderListPicker = (field) => {
        const {meta: {touched, error}, input: {name, onChange, value, ...inputProps}, children, enabled, ...pickerProps} = field;
        return (
            <View>
                <ListPicker
                    selectedValue={value}
                    onValueChange={(val) => { onChange(val); }}
                    enabled={enabled}
                    {...inputProps}
                    {...pickerProps}>
                    {children}
                </ListPicker>
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderPickerItems = (list) => {
        return list.map((item, index) => {
            return (
                <Picker.Item key={index} label={item.label} value={item.value} />
            );
        });
    }

    renderMilkLogCollectionForm = () => {
        const {language} = this.props
        const sessions = [{label: "Morning", value: "MORNING"}, {label: "Afternoon", value: "AFTERNOON"}, {label: "Evening", value: "EVENING"}];
        return (
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="milkRecordedDate"
                            label= {I18n.t('milkRecorderData', {locale:language})}
                            disabled={this.props.isEditMilkLog}
                            component={this.renderDatePicker} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="milkRecordedTime"
                            label= {I18n.t('milkRecorderTime', {locale:language})}
                            disabled={this.props.isEditMilkLog}
                            component={this.renderTimePicker} />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="collectionSession"
                            label= {I18n.t('session', {locale:language})}
                            enabled={!this.props.isEditMilkLog}
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            {this.renderPickerItems(sessions)}
                        </Field>
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="quantity"
                            label= {I18n.t('QuantityLTR', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                </View>
            </View>
        );
    }

    renderMilkLogQualityMeasurementForm = () => {
        const {language} = this.props
        return (
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <View style={styles.width33}>
                        <Field
                            name="fat"
                            label= {I18n.t('fatper', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width33}>
                        <Field
                            name="snf"
                            label= {I18n.t('snfper', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width33}>
                        <Field
                            name="scc"
                            label= {I18n.t('sccperml', {locale:language})}
                            component={this.renderTextInput} />
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const {handleSubmit, isEditMilkLog,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <MilkLog
                    onbackPress={navigateBack}
                    toolbarTitle= {I18n.t('milkLog', {locale:language})}
                    stellaCode={this.state.stellaCode}
                    cattleDetails={this.state.cattleDetails}
                    isEditMilkLog={isEditMilkLog}
                    milkLogCollectionForm={this.renderMilkLogCollectionForm()}
                    milkLogQualityMeasurementForm={this.renderMilkLogQualityMeasurementForm()}
                    handleNextPress={handleSubmit(this.onSubmit)}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    language={language}
                />
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.typeOfBirth) {
        errors.typeOfBirth = "";
    }
    return errors;
};

// const selector = formValueSelector("milkLogForm");

const constructInitailValuesObject = (milkLogDetails) => {
    // const milkCollection = milkLogDetails.milkCollections && milkLogDetails.milkCollections[0] ? milkLogDetails.milkCollections[0] : null;
    const qualityMeasurement = milkLogDetails.qualityMeasurements && milkLogDetails.qualityMeasurements[0] ? milkLogDetails.qualityMeasurements[0] : null;
    return {
        ...milkLogDetails,
        milkRecordedDate: milkLogDetails.collectedOn ? moment(milkLogDetails.collectedOn).format("YYYY-MM-DD") : "",
        milkRecordedTime: milkLogDetails.collectedOn ? moment(milkLogDetails.collectedOn).format("hh:mm A") : "",
        collectionSession: milkLogDetails.collectionSession ? milkLogDetails.collectionSession : "",
        quantity: milkLogDetails.quantity ? `${milkLogDetails.quantity}` : "",
        quantityUnit: milkLogDetails.quantityUnit ? milkLogDetails.quantityUnit : "",
        fat: qualityMeasurement && qualityMeasurement.fat ? `${qualityMeasurement.fat}` : "",
        snf: qualityMeasurement && qualityMeasurement.snf ? `${qualityMeasurement.snf}` : "",
        scc: qualityMeasurement && qualityMeasurement.scc ? `${qualityMeasurement.scc}` : "",
        measuredBy: qualityMeasurement && qualityMeasurement.measuredBy ? qualityMeasurement.measuredBy : "",
        measuredOn: qualityMeasurement && qualityMeasurement.measuredOn ? moment(qualityMeasurement.measuredOn).format("YYYY-MM-DD") : ""
    };
};

const mapStateToProps = (state, ownProps) => ({
    token: state.authReducer.token,
    language: state.localeReducer.language,
    searchList: state.searchReducer.searchList,
    initialValues: ownProps.isEditMilkLog ? constructInitailValuesObject(state.productionReducer.milkLogDetails) : {}
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleGetMilkLogList: (token) => dispatch(getMilkLogListAction(token)),
    updateMilkLogAction: (payload, token) => dispatch(updateMilkLogAction(payload, token)),
    createMilkLogAction: (payload, token) => dispatch(createMilkLogAction(payload, token)),
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_MilkLog_PROPERTY_VALUE", property, value})
});

MilkLogContainer.propTypes = propTypes;
MilkLogContainer.defaultProps = defaultProps;

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "milkLogForm", validate})
)(authenticatedLayer(MilkLogContainer));
