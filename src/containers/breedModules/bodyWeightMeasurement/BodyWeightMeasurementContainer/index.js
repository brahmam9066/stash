import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {View, Text, Picker,BackHandler} from "react-native";
import Config from "react-native-config";
import {reduxForm, Field, formValueSelector} from "redux-form";
import moment from "moment";

import authenticatedLayer from "../../../authenticatedLayer";
import InputText from "../../../../components/InputText";
import TextArea from "../../../../components/TextArea";
import ListPicker from "../../../../components/ListPicker";
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import BodyWeightMeasurement from "../../../../templates/breedModules/bodyWeightMeasurementTemplates/BodyWeightMeasurement";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {createBWMAction, updateBWMAction, getBwmListAction} from "../../../../actions/breedModule.actions";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    value: PropTypes.any,
    token: PropTypes.string,
    isEditBwm: PropTypes.bool,
    searchList: PropTypes.array,
    bwmDetails: PropTypes.object,
    reset: PropTypes.func,
    handleSetPropertyValue: PropTypes.func,
    handleCattleSearch: PropTypes.func,
    handleEmptyCattleSearch: PropTypes.func,
    handleUpdateBWM: PropTypes.func,
    handleCreateBWM: PropTypes.func,
    handleEmptyBwmList: PropTypes.func,
    handleGetBwmList: PropTypes.func,
    handleResetObservationPropertyValue: PropTypes.func,
    handleSubmit: PropTypes.func
};

const defaultProps = {
    value: "",
    token: "",
    isEditBwm: false,
    searchList: [],
    bwmDetails: {},
    reset: () => {},
    handleSetPropertyValue: () => {},
    handleCattleSearch: () => {},
    handleEmptyCattleSearch: () => {},
    handleUpdateBWM: () => {},
    handleCreateBWM: () => {},
    handleEmptyBwmList: () => {},
    handleGetBwmList: () => {},
    handleResetObservationPropertyValue: () => {},
    handleSubmit: () => {}
};

class BodyWeightMeasurementContainer extends Component {

    state = {
        stellaCode: "",
        bcsDetails: {},
        // isInventory: false,
        measurementList: [
            {label: "DIRECT", value: "DIRECT"},
            {label: "INDIRECT", value: "INDIRECT"}
        ]
    }


    componentDidMount() {
        if (this.props.isEditBwm) {
            this.setState({
                stellaCode: this.props.bwmDetails.cattle ? this.props.bwmDetails.cattle.stellaCode : "",
                bcsDetails: this.props.bwmDetails.cattle ? this.props.bwmDetails.cattle : {}
            });
        }
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
        this.props.reset();
    }

    handleBackPress = () => {
        navigateBack();
        return true;
    }

    onCattleSearch = (searchText) => {
        this.props.handleCattleSearch(searchText, this.props.token);
    }

    onSearchItemPress = (item, node) => {
        this.setState({
            stellaCode: item.stellaCode,
            bcsDetails: item
        });
        this.props.handleEmptyCattleSearch();
        node.clear();
        this.props.handleSetPropertyValue("cattle", item.stellaCode);
    }

    onSubmit = (values) => {
        const convertUTCmeasurementDate = moment.utc(values.measurementDate);
        const measurementDateWithTime = moment(convertUTCmeasurementDate).toISOString();
        const payload = {
            cattle: {
                stellaCode: this.state.stellaCode
            },
            measurementDate: measurementDateWithTime,
            chestGirth: values.chestGirth,
            bodyLength: values.bodyLength,
            weight: values.weight,
            // done: values.done,
            measurementMethod: values.measurementMethod,
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };
        if (this.props.isEditBwm && this.props.bwmDetails.id) {
            payload.id = this.props.bwmDetails.id;
            this.props.handleUpdateBWM(payload, this.props.token).then((data) => {
                if (data) {
                    this.props.handleEmptyBwmList();
                    this.props.handleGetBwmList(this.props.token);
                    navigateBack("bwmDetails");
                }
            });
        } else {
            this.props.handleCreateBWM(payload, this.props.token).then((data) => {
                if (data) {
                    this.props.handleEmptyBwmList();
                    this.props.handleGetBwmList(this.props.token);
                    navigateTo("bwmDetails");
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
        const {meta: {touched, error}, label, secureTextEntry, minDate, maxDate, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
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
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderListPicker = (field) => {
        const {meta: {touched, error}, input: {name, onChange, value, ...inputProps}, children, ...pickerProps} = field;
        return (
            <View>
                <ListPicker
                    selectedValue={value}
                    onValueChange={(val) => {
                        if (name === "symptom") {
                            this.props.handleResetObservationPropertyValue("diagnosis");
                        }
                        onChange(val);
                        this.setState({val});
                    }}
                    {...inputProps}
                    {...pickerProps}>
                    {children}
                </ListPicker>
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderTextArea=(field) => {
        const {meta: {touched, error}, label, underlineColorAndroid, multiline, numberOfLines, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <TextArea
                    onChangeText={onChange}
                    underlineColorAndroid={underlineColorAndroid}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    label={label}
                    {...restInput} />
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

    renderBWMForm = () => {
        const {language} = this.props
        return (
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <View style={styles.width50}>
                        <Field
                            name="chestGirth"
                            label={I18n.t('chestWidthInch', {locale:language})}
                            // format={value => value === null ? '' : value.toString()}
                            component={this.renderTextInput} />
                    </View>
                    <View style={styles.width50}>
                        <Field
                            name="bodyLength"
                            label={I18n.t('bodyLengthInch', {locale:language})}
                            // format={value => value === null ? '' : value.toString()}
                            component={this.renderTextInput} />
                    </View>
                </View>
                <View style={styles.width100}>
                    <Field
                        name="weight"
                        label={I18n.t('totalWeightkg', {locale:language})}
                        // format={value => value === null ? '' : value.toString()}
                        component={this.renderTextInput} />
                </View>
                <View style={styles.width100Padding}>
                    <Field
                        name="measurementDate"
                        label={I18n.t('dateTimeBar', {locale:language})}
                        component={this.renderDatePicker} />
                </View>
                {/* <View style={styles.width100}>
                    <Field
                        name="done"
                        label={I18n.t('doneBy', {locale:language})}
                        component={this.renderTextInput} />
                </View> */}
                <View style={styles.width100}>
                    <Field
                        name="measurementMethod"
                        label={I18n.t('measurementType', {locale:language})}
                        component={this.renderListPicker}>
                        <Picker.Item label="Select" value="" />
                        {this.renderPickerItems(this.state.measurementList)}
                    </Field>
                </View>
            </View>);
    }

    render() {
        const {handleSubmit, isEditBwm,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <BodyWeightMeasurement
                    onbackPress={navigateBack}
                    toolbarTitle={I18n.t('bodyweightmeasurement', {locale:language})}
                    stellaCode={this.state.stellaCode}
                    bcsDetails={this.state.bcsDetails}
                    isEditBwm={isEditBwm}
                    bwmForm={this.renderBWMForm()}
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

const selector = formValueSelector("bwmForm");

const constructInitailValuesObject = (bwmDetails) => {
    return {
        ...bwmDetails,
        measurementDate: bwmDetails.measurementDate ? bwmDetails.measurementDate : "",
        chestGirth: bwmDetails.chestGirth ? `${bwmDetails.chestGirth}` : "",
        bodyLength: bwmDetails.bodyLength ? `${bwmDetails.bodyLength}` : "",
        weight: bwmDetails.weight ? `${bwmDetails.weight}` : "",
        measurementMethod: bwmDetails.measurementMethod
    };
};


const mapStateToProps = (state, ownProps) => ({
    location:state.healthModuleOfflineReducer.location,
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    initialValues: ownProps.isEditBwm ? constructInitailValuesObject(state.breedModuleReducer.bwmDetails) : "",
    bwmDetails: state.breedModuleReducer.bwmDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_BWM_PROPERTY_VALUE", property, value}),
    handleGetBwmList: token => dispatch(getBwmListAction(null, token)),
    handleEmptyBwmList: () => dispatch({type: "EMPTY_BWM_LIST"}),
    handleUpdateBWM: (payload, token) => dispatch(updateBWMAction(payload, token)),
    handleCreateBWM: (payload, token) => dispatch(createBWMAction(payload, token)),
    handleResetObservationPropertyValue: property => dispatch({type: "RESET_OBSERVATION_PROPERTY_VALUE", property})
});

BodyWeightMeasurementContainer.defaultProps = defaultProps;

BodyWeightMeasurementContainer.propTypes = propTypes;

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "bwmForm", validate})
)(authenticatedLayer(BodyWeightMeasurementContainer));
