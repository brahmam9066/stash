import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker, TouchableOpacity} from "react-native";
import {reduxForm, Field, formValueSelector} from "redux-form";
import moment from "moment";
import {Icon} from "react-native-elements";

import authenticatedLayer from "../../../authenticatedLayer";
import InputText from "../../../../components/InputText";
import ListPicker from "../../../../components/ListPicker";
import SubText from "../../../../components/SubText";
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import RecordAI from "../../../../templates/breedModules/artificialInseminationTemplates/RecordAI";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {createAIAction, getAIListAction} from "../../../../actions/breedModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {getCattlePregnancyDetailsAction} from "../../../../actions/registerAnimal.actions";
import I18n from "../../../../utils/language.utils";

import styles from "./styles";

class RecordAIContainer extends Component<{}> {

    state = {
        stellaCode: "",
        cattleDetails: {},
        // isInventory: false,
        doneByList: [
            {label: "Govt Doctor", value: "Govt Doctor"},
            {label: "Pvt Doctor", value: "Pvt Doctor"},
            {label: "Self", value: "Self"}
        ],
        serviceType: [
            {label: "Artificial", value: "Artificial"},
            {label: "Natural", value: "Natural"}
        ],
        statusList: [
            {label: "Success", value: "success"},
            {label: "Failure", value: "fail"}
        ]
    }

    componentDidMount() {
        if (this.props.comingFrom === "recordPd" && this.props.animalDetails) {
            this.setState({
                stellaCode: this.props.animalDetails ? this.props.animalDetails.stellaCode : "",
                cattleDetails: this.props.animalDetails ? this.props.animalDetails : {}
            });
            this.props.reset();
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
        this.props.dispatch(getCattlePregnancyDetailsAction(item.id, this.props.token));
        this.props.handleEmptyCattleSearch();
        node.clear();
    }

    createRandomId = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i += 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    onSubmit = (values) => {
        const convertUTCinseminationDate = moment.utc(values.inseminationDate);
        const inseminationDateWithTime = moment(convertUTCinseminationDate).toISOString();
        const convertUTCexpectedPdFollowpDate = moment.utc(values.expectedPdFollowpDate);
        const convertutcexpectedPdFollowpDateWithTime = moment(convertUTCexpectedPdFollowpDate).toISOString();
        const payload = {
            cattle: {
                stellaCode: values.registration ? values.registration : this.state.stellaCode
            },
            inseminationCost: values.inseminationCost,
            inseminationDate: inseminationDateWithTime,
            inseminationType: values.inseminationType,
            semenCode: values.semenCode,
            status: values.status,
            performedBy: values.performedBy,
            expectedPdFollowpDate: convertutcexpectedPdFollowpDateWithTime,
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };
        
        if (!this.props.isInternetConnected) {
            if (this.props.comingFrom === "aiOfflineList") {
                payload._id = this.props.initialValues._id;
                this.props.dispatch({
                    type: "UPDATE_AI_OFFLINE_LIST",
                    payload
                });
            } else {
                payload._id = this.createRandomId();
                this.props.dispatch({
                    type: "SET_AI_OFFLINE_LIST",
                    payload
                });
            }
            navigateBack();
            return false;
        }
        else{
            payload._id = this.props.initialValues ? this.props.initialValues._id :"";
            this.props.dispatch(createAIAction(payload, this.props.token)).then((data) => {
                if (data) {
                    this.props.handleEmptyAIList();
                    this.props.handleGetAI(this.props.token);
                    navigateTo("aIDetails");
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
        const {meta: {touched, error}, label, maxDate, minDate, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
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

    renderPickerItems = (list) => {
        return list.map((item, index) => {
            return (
                <Picker.Item key={index} label={item.label} value={item.value} />
            );
        });
    }

    handleScan = (data) => {
        this.props.handleSetPropertyValue("registration", data);
    }

    renderTextInputWithScan = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, editable, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <View style={{width: "80%"}}>
                        <InputText
                            onChangeText={onChange}
                            maxLength={maxLength}
                            placeholder={placeholder}
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry}
                            editable={editable}
                            label={label}
                            {...restInput} />
                    </View>
                    <View style={{width: "20%"}}>
                        <TouchableOpacity onPress={() => navigateTo("camera", {comingFrom: "aiOfflineForm", handleScan: this.handleScan})} style={styles.qrcodeContainer}>
                            <Icon
                                name="qrcode-scan"
                                type="material-community"
                                size={26}
                                iconStyle={[styles.qrcodeStyle]}
                                color="#666666" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderRecordAIForm = () => {
        const {cattlePregnancyDetails,language} = this.props;
        console.log("cattlePregnancyDetails", cattlePregnancyDetails);
        if (cattlePregnancyDetails.length > 0) {
            this.props.handleSetPropertyValue("lastCalving", cattlePregnancyDetails[0].deliveryDate);
            this.props.handleSetPropertyValue("lastHeat", cattlePregnancyDetails[0].inseminations[0].inseminationDate);
        }
        return (
            <View style={styles.formContainer}>
                { (this.props.isInternetConnected  || !this.props.comingFrom  === "aiOfflineList") && cattlePregnancyDetails.length > 0 &&
                    <View style={styles.cattleConteiner}>
                        <SubText
                            text={I18n.t('lastCalvingDate', {locale:language})}
                            value={moment(cattlePregnancyDetails[0].deliveryDate.slice(0, 10)).format("DD-MM-YYYY")}
                            textStyle={styles.textstyle}
                            labelStyle={styles.labelStyle}
                        />
                        <SubText
                            text={I18n.t('lastHeatDate', {locale:language})}
                            value={moment(cattlePregnancyDetails[0].inseminations[0].inseminationDate).format("DD-MM-YYYY")}
                            textStyle={styles.textstyle}
                            labelStyle={styles.labelStyle}
                        />
                    </View>
                }
                { (!this.props.isInternetConnected  || this.props.comingFrom  === "aiOfflineList") &&
                    <View style={styles.width100}>
                        <Field
                            name="registration"
                            label={I18n.t('registrationId', {locale:language})}
                            component={this.renderTextInputWithScan} />
                    </View>
                }
                <View style={styles.width100Padd}>
                    <Field
                        name="inseminationDate"
                        label={I18n.t('inseminationDate', {locale:language})}
                        component={this.renderDatePicker} />
                </View>
                <View style={styles.width100}>
                    <Field
                        name="inseminationType"
                        label={I18n.t('selectServiceType', {locale:language})}
                        component={this.renderListPicker}>
                        <Picker.Item label="Select" value="" />
                        {this.renderPickerItems(this.state.serviceType)}
                    </Field>
                </View>
                <View style={styles.width100}>
                    <Field
                        name="semenCode"
                        label={I18n.t('SemenStrawId', {locale:language})}
                        component={this.renderTextInput} />
                </View>
                <View style={styles.width100}>
                    <Field
                        name="performedBy"
                        label={I18n.t('doneBy', {locale:language})}
                        component={this.renderListPicker}>
                        <Picker.Item label="Select" value="" />
                        {this.renderPickerItems(this.state.doneByList)}
                    </Field>
                </View>
                {/* Treatment cosr comes from back-end, we are not recording it manully */}
                {/* <View style={styles.width100}>
                    <Field
                        name="inseminationCost"
                        label="Treatment Cost Amount"
                        component={this.renderTextInput} />
                </View> */}
                <View style={styles.width100}>
                    <Field
                        name="expectedPdFollowpDate"
                        label={I18n.t('pdCheckDue', {locale:language})}
                        component={this.renderDatePicker} />
                </View>
                <View style={styles.width100}>
                    <Field
                        name="status"
                        label={I18n.t('status', {locale:language})}
                        component={this.renderListPicker}>
                        <Picker.Item label="Select" value="" />
                        {this.renderPickerItems(this.state.statusList)}
                    </Field>
                </View>
                {/* <View style={styles.width100}>
                    <Field
                        name="inseminationDate"
                        label="Insemination Date"
                        maxDate={new Date()}
                        component={this.renderDatePicker} />
                </View>
                <View style={styles.width100}>
                    <Field
                        name="status"
                        label="Status"
                        component={this.renderListPicker}>
                        <Picker.Item label="Select" value="" />
                        {this.renderPickerItems(this.state.statusList)}
                    </Field>
                </View> */}
            </View>);
    }

    render() {
        const {handleSubmit,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <RecordAI
                    onbackPress={navigateBack}
                    toolbarTitle={I18n.t('recordAi', {locale:language})}
                    AIForm={this.renderRecordAIForm()}
                    handleNextPress={handleSubmit(this.onSubmit)}
                    stellaCode={this.state.stellaCode}
                    cattleDetails={this.state.cattleDetails}
                    isEditAI={this.props.isEditAI}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    offlineInput={this.renderRecordAIForm()}
                    comingFrom={this.props.comingFrom}
                    isInternetConnected={this.props.isInternetConnected}
                    handleSubmitOfflineStellaCode={handleSubmit(this.onSubmit)}
                    language={language}
                />
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.registration) {
        errors.registration = "registration  is required";
    }
    if (!values.inseminationDate) {
        errors.inseminationDate = "inseminationDate  is required";
    }
    if (!values.inseminationType) {
        errors.inseminationType = "inseminationType  is required";
    }
    if (!values.semenCode) {
        errors.semenCode = "semenCode  is required";
    }
    if (!values.performedBy) {
        errors.performedBy = "performedBy  is required";
    }
    if (!values.expectedPdFollowpDate) {
        errors.expectedPdFollowpDate = "expectedPdFollowpDate  is required";
    }
    if (!values.status) {
        errors.status = "status  is required";
    }
    return errors;
};

const selector = formValueSelector("recordAI");

const constructAIEditObject = (props,aIDetails) => {
    console.log(aIDetails);
    if (props.isEditAI) {
    return {
        ...aIDetails,
        treatmentDate: aIDetails.treatmentDate,
        performedBy: aIDetails.performedBy,
        medicine: aIDetails.prescriptions ? aIDetails.prescriptions[0].medicine : "",
        dose: aIDetails.prescriptions ? `${aIDetails.prescriptions[0].dose}` : "",
        cattle: aIDetails.cattle,
        id: aIDetails.id
    }; 
}
else{
    if (props.comingFrom === "aiOfflineList" && props.offlineAIDetails) {
        return{
            registration: props.offlineAIDetails.cattle.stellaCode,
            inseminationDate: moment(props.offlineAIDetails.inseminationDate).format("YYYY-MM-DD"),
            inseminationType: props.offlineAIDetails.inseminationType,
            semenCode :  props.offlineAIDetails.semenCode,
            performedBy : props.offlineAIDetails.performedBy,
            expectedPdFollowpDate: moment(props.offlineAIDetails.expectedPdFollowpDate).format("YYYY-MM-DD"),
            status: props.offlineAIDetails.status,
            _id: props.offlineAIDetails._id
        }
    }
}
};

const mapStateToProps = (state, ownProps) => ({
    isInternetConnected: state.appReducer.isInternetConnected,
    token: state.authReducer.token,
    language: state.localeReducer.language,
    location:state.healthModuleOfflineReducer.location,
    searchList: state.searchReducer.searchList,
    orgConfiguration: state.lookupDataReducer.orgConfiguration,
    cattleHealthMetaData: state.lookupDataReducer.cattleHealthMetaData,
    cattlePregnancyDetails: state.animalMgmtReducer.cattlePregnancyDetails,
    initialValues: ownProps.isEditAI ? constructAIEditObject(ownProps,state.breedModuleReducer.aIDetails) : constructAIEditObject(ownProps)
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_AI_PROPERTY_VALUE", property, value}),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyAIList: () => dispatch({type: "EMPTY_AI_LIST"}),
    handleGetAI: token => dispatch(getAIListAction(null, token))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "recordAI", validate})
)(authenticatedLayer(RecordAIContainer));
