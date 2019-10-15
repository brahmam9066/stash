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
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import RecordPD from "../../../../templates/breedModules/pregnancyDetectionTemplates/RecordPD";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {createPDAction, getPDListAction} from "../../../../actions/breedModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {getCurrentInseminationAction} from "../../../../actions/registerAnimal.actions";
import I18n from "../../../../utils/language.utils";

import styles from "./styles";

class RecordPDContainer extends Component<{}> {

    state = {
        stellaCode: "",
        cattleDetails: {},
        // isInventory: false,
        doneByList: [
            {label: "Govt Doctor", value: "Govt Doctor"},
            {label: "Pvt Doctor", value: "Pvt Doctor"},
            {label: "Self", value: "Self"}
        ],
        resultList: [
            {label: "Pregnant", value: "Pregnant"},
            {label: "Review", value: "Review"},
            {label: "Aborted", value: "Aborted"},
            {label: "Empty", value: "Empty"},
            {label: "Doubtful", value: "Doubtful"}
        ]
    }

    componentDidMount() {
        if (this.props.comingFrom === "aiDetails" && this.props.animalDetails) {
            this.setState({
                stellaCode: this.props.animalDetails ? this.props.animalDetails.stellaCode : "",
                cattleDetails: this.props.animalDetails ? this.props.animalDetails : {}
            });
            this.props.dispatch(getCurrentInseminationAction(this.props.animalDetails.id, this.props.token));
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
        this.props.dispatch(getCurrentInseminationAction(item.id, this.props.token));
        this.props.handleEmptyCattleSearch();
        node.clear();
    }

    handleCheckInventory = () => {
        const checkInventory = this.props.orgConfiguration.filter(item => (item.configName === "ENABLE_INVENTORY"));
        if (checkInventory.length > 0 && checkInventory[0].value === "TRUE") {
            return true;
        }
        return false;
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
        const convertUTCactualDate = moment.utc(values.actualDate);
        const actualDateWithTime = moment(convertUTCactualDate).toISOString();
        let resultStatus = "";
        const {currentInsemination} = this.props;
        switch (values.status) {
        case "Pregnant":
            resultStatus = "success";
            break;
        case "Review":
            resultStatus = "review";
            break;
        default:
            resultStatus = "fail";
        }
        const payload = {
            insemination: {
                cattle : {
                    stellaCode : values.registration ? values.registration :this.state.stellaCode
                }
            },
            actualDate: actualDateWithTime,
            status: resultStatus,
            result: values.status,
            performedBy: values.performedBy,
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };
        if (!this.props.isInternetConnected) {
            if (this.props.comingFrom === "pdOfflineList") {
                payload._id = this.props.initialValues._id;
                this.props.dispatch({
                    type: "UPDATE_PD_OFFLINE_LIST",
                    payload
                });
            } else {
                payload._id = this.createRandomId();
                this.props.dispatch({
                    type: "SET_PD_OFFLINE_LIST",
                    payload
                });
            }
            navigateBack();
            return false;
        }
        else{
            payload._id = this.props.initialValues ? this.props.initialValues._id :"";
            this.props.dispatch(createPDAction(payload, this.props.token)).then((data) => {
                if (data) {
                    this.props.handleEmptyPDList();
                    this.props.handleGetPDList(this.props.token);
                    // navigateTo("pdDetails", {comingFrom: "recordPD"});
                    if (this.props.comingFrom === "aiDetails") {
                        navigateTo("pdDetails", {comingFrom: "recordPD"});
                    }else {
                        navigateTo("pdDetails", {comingFrom: "recordPD1"});
                    }
                }
            });
        }
    };

    onSubmitAndPerformAi = (values) => {
        const convertUTCactualDate = moment.utc(values.actualDate);
        const actualDateWithTime = moment(convertUTCactualDate).toISOString();
        let resultStatus = "";
        const {currentInsemination} = this.props;
        switch (values.status) {
        case "Pregnant":
            resultStatus = "success";
            break;
        case "Review":
            resultStatus = "review";
            break;
        default:
            resultStatus = "fail";
        }
        const payload = {
            insemination: {
                id: currentInsemination.id
            },
            // actualDate: values.actualDate ? moment(values.actualDate, "YYYY-MM-DD").toISOString() : "",
            actualDate: actualDateWithTime,
            status: resultStatus,
            result: values.status,
            performedBy: values.performedBy,
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };
        console.log("payload", payload);
        this.props.dispatch(createPDAction(payload, this.props.token)).then((data) => {
            if (data) navigateTo("recordAI", {comingFrom: "recordPd", animalDetails: this.state.cattleDetails});
        });
        this.props.reset();
    }

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
        const {meta: {touched, error}, label, maxDate, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
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
                        <TouchableOpacity onPress={() => navigateTo("camera", {comingFrom: "pdOfflineForm", handleScan: this.handleScan})} style={styles.qrcodeContainer}>
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

    renderRecordPDForm = () => {
        const {cattlePregnancyDetails,language} = this.props;
        return (
            <View style={styles.formContainer}>
                { (!this.props.isInternetConnected  || this.props.comingFrom  === "pdOfflineList") &&
                    <View style={styles.width100}>
                        <Field
                            name="registration"
                            label={I18n.t('registrationId', {locale:language})}
                            component={this.renderTextInputWithScan} />
                    </View>
                }
                <View style={styles.width100}>
                    <Field
                        name="actualDate"
                        label={I18n.t('pdCheckDate', {locale:language})}
                        component={this.renderDatePicker} />
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
                <View style={styles.width100}>
                    <Field
                        name="status"
                        label={I18n.t('pdResult', {locale:language})}
                        component={this.renderListPicker}>
                        <Picker.Item label="Select" value="" />
                        {this.renderPickerItems(this.state.resultList)}
                    </Field>
                </View>
                {/* cost comes from backend */}
                {/* <View style={styles.width100}>
                    <Field
                        name="cost"
                        label="Service Cost"
                        component={this.renderTextInput} />
                </View> */}
            </View>);
    }

    render() {
        const {handleSubmit,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <RecordPD
                    onbackPress={navigateBack}
                    toolbarTitle={I18n.t('recordPD', {locale:language})}
                    PDForm={this.renderRecordPDForm()}
                    currentInsemination={this.props.currentInsemination}
                    handleNextPress={handleSubmit(this.onSubmit)}
                    handleSaveAndPerformAi={handleSubmit(this.onSubmitAndPerformAi)}
                    stellaCode={this.state.stellaCode}
                    cattleDetails={this.state.cattleDetails}
                    isEditDehorning={this.props.isEditDehorning}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    status={this.props.status}
                    offlineInput={this.renderRecordPDForm()}
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
    if (!values.actualDate) {
        errors.actualDate = "actualDate  is required";
    }
    if (!values.performedBy) {
        errors.performedBy = "performedBy  is required";
    }
    if (!values.status) {
        errors.status = "status  is required";
    }
    return errors;
};

const selector = formValueSelector("recordPD");

const constructPdEditObject = (props) => {
    if (props.comingFrom === "pdOfflineList" && props.offlinePDDetails) {
        return{
            registration : props.offlinePDDetails.insemination.cattle.stellaCode,
            actualDate : moment(props.offlinePDDetails.actualDate).format("YYYY-MM-DD") ,
            performedBy : props.offlinePDDetails.performedBy,
            status : props.offlinePDDetails.result,
            _id: props.offlinePDDetails._id
        }
    }
};

const mapStateToProps = (state, ownProps) => ({
    token: state.authReducer.token,
    isInternetConnected: state.appReducer.isInternetConnected,
    searchList: state.searchReducer.searchList,
    orgConfiguration: state.lookupDataReducer.orgConfiguration,
    cattleHealthMetaData: state.lookupDataReducer.cattleHealthMetaData,
    cattlePregnancyDetails: state.animalMgmtReducer.cattlePregnancyDetails,
    currentInsemination: state.animalMgmtReducer.currentInsemination,
    status: selector(state, "status"),
    initialValues: constructPdEditObject(ownProps),
    language: state.localeReducer.language,
    location:state.healthModuleOfflineReducer.location
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_PD_PROPERTY_VALUE", property, value}),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyPDList: () => dispatch({type: "EMPTY_PD_LIST"}),
    handleGetPDList: token => dispatch(getPDListAction(null, token))

});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "recordPD", validate})
)(authenticatedLayer(RecordPDContainer));
