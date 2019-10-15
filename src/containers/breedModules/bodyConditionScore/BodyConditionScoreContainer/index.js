import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker} from "react-native";
import Config from "react-native-config";
import PropTypes from "prop-types";
import {reduxForm, Field, formValueSelector} from "redux-form";
import moment from "moment";

import authenticatedLayer from "../../../authenticatedLayer";
import InputText from "../../../../components/InputText";
import TextArea from "../../../../components/TextArea";
import ListPicker from "../../../../components/ListPicker";
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import BodyConditionScore from "../../../../templates/breedModules/bodyConditionScoreTemplates/BodyConditionScore";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {createBCSAction, updateBCSAction, getBcsListAction} from "../../../../actions/breedModule.actions";
import  I18n from "../../../../utils/language.utils";


import styles from "./styles";

const propTypes = {
    value: PropTypes.any,
    token: PropTypes.string,
    isEditBcs: PropTypes.bool,
    searchList: PropTypes.array,
    bcsDetails: PropTypes.object,
    reset: PropTypes.func,
    handleCattleSearch: PropTypes.func,
    handleEmptyCattleSearch: PropTypes.func,
    handleUpdateBCS: PropTypes.func,
    handleCreateBCS: PropTypes.func,
    handleEmptyBcsList: PropTypes.func,
    handleGetBcsList: PropTypes.func,
    handleResetObservationPropertyValue: PropTypes.func,
    handleSubmit: PropTypes.func
};

const defaultProps = {
    value: "",
    token: "",
    isEditBcs: false,
    searchList: [],
    bcsDetails: {},
    reset: () => {},
    handleCattleSearch: () => {},
    handleEmptyCattleSearch: () => {},
    handleUpdateBCS: () => {},
    handleCreateBCS: () => {},
    handleEmptyBcsList: () => {},
    handleGetBcsList: () => {},
    handleResetObservationPropertyValue: () => {},
    handleSubmit: () => {}
};

class BodyConditionScoreContainer extends Component {

    state = {
        stellaCode: "",
        bcsDetails: {}
        // isInventory: false,
    }


    componentDidMount() {
        if (this.props.isEditBcs) {
            this.setState({
                stellaCode: this.props.bcsDetails.cattle ? this.props.bcsDetails.cattle.stellaCode : "",
                bcsDetails: this.props.bcsDetails.cattle ? this.props.bcsDetails.cattle : {}
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
            bcsDetails: item
        });
        this.props.handleEmptyCattleSearch();
        node.clear();
    }

    onSubmit = (values) => {
        const convertUTCmeasurementDate = moment.utc(values.measurementDate);
        const measurementDateWithTime = moment(convertUTCmeasurementDate).toISOString();
        const payload = {
            cattle: {
                stellaCode: this.state.stellaCode
            },
            measurementDate: measurementDateWithTime,
            score: values.score,
            done: values.done,
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };
        if (this.props.isEditBcs && this.props.bcsDetails.id) {
            payload.id = this.props.bcsDetails.id;
            this.props.handleUpdateBCS(payload, this.props.token).then((data) => {
                if (data) {
                    this.props.handleEmptyBcsList();
                    this.props.handleGetBcsList(this.props.token);
                    navigateBack("bcsDetails");
                }
            });
        } else {
            this.props.handleCreateBCS(payload, this.props.token).then((data) => {
                if (data) {
                    this.props.handleEmptyBcsList();
                    this.props.handleGetBcsList(this.props.token);
                    navigateTo("bcsDetails");
                }
            });
        }
    };

    renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, editable, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                    label={label}
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

    renderBCSForm = () => {
        const {language}= this.props
        return (
            <View style={styles.formContainer}>
                {/* <View style={styles.width100}>
                    <Field
                        name="cattle"
                        label="Cattle"
                        editable={false}
                        component={this.renderTextInput}>
                    </Field>
                </View> */}
                <View style={styles.width100}>
                    <Field
                        name="score"
                        label= {I18n.t('bodyConditionScore1To10', {locale:language})}
                        // format={value => value === null ? '' : value.toString()}
                        component={this.renderTextInput} />
                </View>
                <View style={styles.width100Padding}>
                    <Field
                        name="measurementDate"
                        label= {I18n.t('dateTimebar', {locale:language})}
                        component={this.renderDatePicker} />
                </View>
            </View>);
    }

    render() {
        const {handleSubmit, isEditBcs, language} = this.props;
        return (
            <View style={styles.appContainer}>
                <BodyConditionScore
                    onbackPress={navigateBack}
                    toolbarTitle= {I18n.t('bodyconditionscore', {locale:language})}
                    stellaCode={this.state.stellaCode}
                    bcsDetails={this.state.bcsDetails}
                    isEditBcs={isEditBcs}
                    bcsForm={this.renderBCSForm()}
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

BodyConditionScoreContainer.defaultProps = defaultProps;

BodyConditionScoreContainer.propTypes = propTypes;

const validate = (values) => {
    const errors = {};
    if (!values.score) {
        errors.score = "Body Condition Score is required";
    }
    if (!values.measurementDate) {
        errors.measurementDate = "Date/Time is required";
    }
    return errors;
};

const selector = formValueSelector("bcsForm");

const constructInitailValuesObject = (bcsDetails) => {
    return {
        ...bcsDetails,
        measurementDate: bcsDetails.measurementDate,
        score: `${bcsDetails.score}`
    };
};


const mapStateToProps = (state, ownProps) => ({
    location:state.healthModuleOfflineReducer.location,
    token: state.authReducer.token,
    language: state.localeReducer.language,
    searchList: state.searchReducer.searchList,
    bcsDetails: state.breedModuleReducer.bcsDetails,
    initialValues: ownProps.isEditBcs ? constructInitailValuesObject(state.breedModuleReducer.bcsDetails) : ""
});
const mapDispatchToProps = dispatch => ({
    dispatch,
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_BCS_PROPERTY_VALUE", property, value}),
    handleResetObservationPropertyValue: property => dispatch({type: "RESET_OBSERVATION_PROPERTY_VALUE", property}),
    handleCreateBCS: (payload, token) => dispatch(createBCSAction(payload, token)),
    handleUpdateBCS: (payload, token) => dispatch(updateBCSAction(payload, token)),
    handleGetBcsList: token => dispatch(getBcsListAction(null, token)),
    handleEmptyBcsList: () => dispatch({type: "EMPTY_BCS_LIST"})
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "bcsForm", validate})
)(authenticatedLayer(BodyConditionScoreContainer));
