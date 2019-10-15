import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker} from "react-native";
import {reduxForm, Field, formValueSelector} from "redux-form";

import authenticatedLayer from "../../authenticatedLayer";
import InputText from "../../../components/InputText";
import TextArea from "../../../components/TextArea";
import ListPicker from "../../../components/ListPicker";
import DatePickerAndroid from "../../../components/DatePicker/DatePicker.android";
import Transfer from "../../../templates/registerAnimalTemplates/Transfer";
import SubText from "../../../components/SubText";
import {navigateBack, navigateTo} from "../../../utils/utility";

import styles from "./styles";

class TransferContainer extends Component<{}> {


    componentDidMount() {
     
    }

    onSubmit = (values) => {
       
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
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
                            this.props.dispatch({type: "RESET_OBSERVATION_PROPERTY_VALUE", property: "diagnosis"});
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

    renderTransferRecordForm = () => {
        return (
            <View style={styles.formContainer}>
                <View style={styles.width100}>
                    <Field
                        name="cattle"
                        label="Cattle"
                        component={this.renderListPicker} />
                </View>
                <View style={styles.width100}>
                    <Field
                        name="farm"
                        label="To Which Farm"
                        component={this.renderListPicker} />
                </View>
                <View style={styles.profileViewStyle}>
                    <Text
                         style={styles.textStyle}
                         numberOfLines={1}
                         ellipsizeMode="tail"><Text style={styles.labelStyle}>Registration ID : </Text>{}
                    </Text>
                    <View style={styles.flexRowStyle}>
                                <SubText
                                    text="Lactation"
                                    value=""
                                    textStyle={styles.subTextstyle}
                                    labelStyle={styles.subLabelstyle}
                                />
                                <SubText
                                    text="Breeding"
                                    value=""
                                    textStyle={styles.subTextstyle}
                                    labelStyle={styles.subLabelstyle}
                                />
                    </View>
                    <View style={styles.flexRowStyle}>
                                <SubText
                                    text="HMB"
                                    value=""
                                    textStyle={styles.subTextstyle}
                                    labelStyle={styles.subLabelstyle}
                                />
                                <SubText
                                    text="Farmer"
                                    value=""
                                    textStyle={styles.subTextstyle}
                                    labelStyle={styles.subLabelstyle}
                                />
                    </View>
                </View>
                <View style={styles.width100Padding}>
                    <Field
                        name="date"
                        label="Date"
                        component={this.renderDatePicker} />
                </View>
                <View style={styles.width100}>
                    <Field
                        name="sold"
                        label="Sold To"
                        component={this.renderTextInput} />
                </View>
                <View style={styles.width100}>
                    <Field
                        name="reason"
                        label="Reason"
                        component={this.renderListPicker} />
                </View>
                <View style={styles.width100}>
                    <Field
                        name="notes"
                        label="Notes"
                        component={this.renderTextArea} />
                </View>
               
            </View>);
    }

    render() {
        const {handleSubmit, isEditTreatment} = this.props;
        return (
            <View style={styles.appContainer}>
                <Transfer
                    onbackPress={navigateBack}
                    toolbarTitle="Transfer Record"
                    transferRecordForm={this.renderTransferRecordForm()}
                    handleNextPress={handleSubmit(this.onSubmit)}
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

const selector = formValueSelector("transfer");

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = dispatch => ({
    dispatch,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "transfer", validate})
)(authenticatedLayer(TransferContainer));
