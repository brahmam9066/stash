import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker, TouchableOpacity} from "react-native";
import {reduxForm, Field, formValueSelector, FieldArray} from "redux-form";
import moment from "moment";
import {Icon} from "react-native-elements";

import authenticatedLayer from "../../../authenticatedLayer";
import InputText from "../../../../components/InputText";
import SubTitle from "../../../../components/SubTitle";
import ListPicker from "../../../../components/ListPicker";
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import CalfBirth from "../../../../templates/breedModules/calfBirthTemplates/CalfBirth";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {getMedicineListAction} from "../../../../actions/healthModule.actions";
import {createCalfbirthAction} from "../../../../actions/breedModule.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import {getAnimalProfiledetailsAction} from "../../../../actions/registerAnimal.actions";
import  I18n from "../../../../utils/language.utils";
import {cattleScanRequest} from "../../../../services/search.service";

import styles from "./styles";

class CalfBirthContainer extends Component<{}> {

    state = {
        stellaCode: "",
        cattleDetails: {},
        deliveryStatusList: [
            {label: "Aborted", value: "Aborted"},
            {label: "Delivered", value: "Delivered"}
        ],
        pregnancyTypeList: [
            {label: "Normal", value: "NORMAL"},
            {label: "Assisted", value: "ASSISTED"}
        ],
        gender: [
            {label: "Male", value: "MALE"},
            {label: "Female", value: "FEMALE"},
        ],
        birthList: [
            {label: "Natural", value: "NATURAL"},
            {label: "Assisted", value: "ASSISTED"}
        ]
    }

    componentDidMount() {
        this.props.handleGetMedicineList(this.props.token);
        if (this.props.isEditCalfBirth) {
            this.setState({
                stellaCode: this.props.initialValues.cattle ? this.props.initialValues.cattle.stellaCode : "",
                cattleDetails: this.props.initialValues.cattle ? this.props.initialValues.cattle : {}
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

    createRandomId = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i += 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    onSubmit = (values) => {
        const convertUTCdeliveryDate = moment.utc(values.deliveryDate);
        const deliveryDateWithTime = moment(convertUTCdeliveryDate).toISOString();
        const payload = {
            offlineRegId : values.registration ? values.registration : null ,
            deliveryDate: deliveryDateWithTime,
            pregnancyType: values.pregnancyType,
            result: values.deliveryStatus
        };
        if (values.deliveryStatus === "Delivered") {
            payload.children = values.children;
        }
        if (this.props.isEditCalfBirth && this.props.initialValues.id) {
            payload.id = this.props.initialValues.id;
            payload.prescriptions[0].id = this.props.initialValues.prescriptions[0].id;
            this.props.dispatch(getAnimalProfiledetailsAction(payload, this.props.token)).then((data) => {
                if (data) navigateBack();
            });
        } else {
            this.props.dispatch(createCalfbirthAction(this.state.cattleDetails.id, payload, this.props.token)).then((data) => {
                if (data) {
                    navigateBack();
                }
            });
        }
    };

    onSubmitOffline = (values) => {
        const convertUTCdeliveryDate = moment.utc(values.deliveryDate);
        const deliveryDateWithTime = moment(convertUTCdeliveryDate).toISOString();
        const payload = {
            offlineRegId : values.registration ? values.registration : null ,
            deliveryDate: deliveryDateWithTime,
            pregnancyType: values.pregnancyType,
            result: values.deliveryStatus
        };
        if (values.deliveryStatus === "Delivered") {
            payload.children = values.children;
        }
        if (!this.props.isInternetConnected) {
            if (this.props.comingFrom === "calfBirthOfflineList") {
                payload._id = this.props.initialValues._id;
                this.props.dispatch({
                    type: "UPDATE_CALF_BIRTH_OFFLINE_LIST",
                    payload
                });
            } else {
                payload._id = this.createRandomId();
                this.props.dispatch({
                    type: "SET_CALF_BIRTH_OFFLINE_LIST",
                    payload
                });
            }
            navigateBack();
            return false;
        }
         else {
            payload._id = this.props.initialValues ? this.props.initialValues._id :"";
            cattleScanRequest(payload.offlineRegId,this.props.token).then((data)=>{
                if(data && data.length !==0 ){
                    this.props.dispatch(createCalfbirthAction(data[0].id,payload,this.props.token)).then((data)=>{
                        if (data) {
                            navigateBack();
                        }
                    })
                }else{
                    this.props.dispatch({
                        type: "SERVER_ERROR",
                        isServerError: true,
                        payload: {title: "Invalid cattle for CalfBirth for offline record"}
                    })
                }
      })
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

    createObjectFromMetaData = (list) => {
        const object = [];
        list.forEach((item) => {
            object.push({label: item.medicineName, value: item.id});
        });
        return object;
    }

    createBreedObjectFromMetaData = (list) => {
        const object = [];
        list.forEach((item) => {
            object.push({label: item.name, value: item.name});
        });
        return object;
    }

    handleScan = (data) => {
        this.props.handleSetPropertyValue("registration", data);
    }

    renderTextInputWithScan = (field) => {
        const {meta: {touched, error}, label, editable, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
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
                        <TouchableOpacity onPress={() => navigateTo("camera", {comingFrom: "calfBirthOfflineForm", handleScan: this.handleScan})} style={styles.qrcodeContainer}>
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

    renderRecordcalfBirthForm = () => {
        const {language} = this.props
        return (
            <View style={styles.formContainer}>
                { (!this.props.isInternetConnected  || this.props.comingFrom  === "calfBirthOfflineList") &&
                    <View style={styles.width100}>
                        <Field
                            name="registration"
                            label= {I18n.t('registrationId', {locale:language})}
                            component={this.renderTextInputWithScan} />
                    </View>
                }
                <View style={styles.width100}>
                    <Field
                        name="deliveryDate"
                        label= {I18n.t('deliveryDate', {locale:language})}
                        component={this.renderDatePicker} />
                </View>
                <View style={styles.width100}>
                    <Field
                        name="pregnancyType"
                        label= {I18n.t('pregnancyType', {locale:language})}
                        component={this.renderListPicker}>
                        <Picker.Item label="Select" value="" />
                        {this.renderPickerItems(this.state.pregnancyTypeList)}
                    </Field>
                </View>
                <View style={styles.width1002}>
                    <Field
                        name="deliveryStatus"
                        label= {I18n.t('deliveryStatus', {locale:language})}
                        onChange={(data)=> {
                            if(data === "Delivered"){
                                this.props.handleSetPropertyValue("children", [{}]);
                            } else {
                                this.props.handleSetPropertyValue("children", []);
                            }
                        }}
                        component={this.renderListPicker}>
                        <Picker.Item label="Select" value="" />
                        {this.renderPickerItems(this.state.deliveryStatusList)}
                    </Field>
                </View>
                {this.props.deliveryStatus === "Delivered" &&
                    <FieldArray name="children" component={this.renderCalfForms} />
                }
            </View>);
    }

    createObjectFromMetaDataForLiveStockState = (list) => {
        const object = [];
        list.forEach((item) => {
            object.push({label: item, value: item});
        });
        return object;
    }

    renderCalfForms = ({fields, meta: {error, submitFailed}}) => {
        const {cattlesMetadata,language} = this.props;
        const {cattleDetails} = this.state;
        console.log(cattleDetails);
        let breedList = [];
        if (this.props.isInternetConnected && cattleDetails.species && cattlesMetadata && cattlesMetadata.BREED && cattlesMetadata.BREED.length > 0) {
            const breedArray = cattlesMetadata.BREED.filter((breed) => {
                return (breed.species.toLowerCase()).includes(cattleDetails.species[0].toLowerCase());
            });
            breedList = this.createBreedObjectFromMetaData(breedArray);
        }
        else if(cattlesMetadata && cattlesMetadata.BREED && cattlesMetadata.BREED.length > 0) {
            const breedArray = cattlesMetadata.BREED;
            breedList = this.createBreedObjectFromMetaData(breedArray);
        }
        const liveStockStateList = (cattlesMetadata && cattlesMetadata.LIVESTOCK_STATES) ? this.createObjectFromMetaDataForLiveStockState(cattlesMetadata.LIVESTOCK_STATES) : [];
        return (
            <View>
                <View style={styles.calfStyle}>
                    <SubTitle   
                        eventText= {I18n.t('add', {locale:language})}
                        subTitleStyle={styles.subTitleStyle}
                        titleStyle={styles.titlestyle}
                        eventTextStyle={styles.eventTextStyle}
                        onPressEvent={() => { fields.push({}); }} />
                </View>
                {fields.map((child, index) => {
                    return (
                        <View key={index + 1}>
                       <Text style= {styles.calfHash}>   
                             {I18n.t('calfRecordCalfBirth', {locale:language})}{index + 1}
                        </Text>
                            <View style={styles.row}>
                                <View style={styles.width50}>
                                    <Field
                                        name={`${child}.breed`}
                                        label= {I18n.t('breed', {locale:language})}
                                        component={this.renderListPicker}>
                                        <Picker.Item label="Select" value="" />
                                        {this.renderPickerItems(breedList)}
                                    </Field>
                                </View>
                                <View style={styles.width50}>
                                    <Field
                                        name={`${child}.gender`}
                                        label= {I18n.t('gender', {locale:language})}
                                        component={this.renderListPicker}>
                                        <Picker.Item label="Select" value="" />
                                        {this.renderPickerItems(this.state.gender)}
                                    </Field>
                                </View>
                            </View>
                            <View style={styles.width100}>
                                <Field
                                    id="birth-type"
                                    name={`${child}.birthType`}
                                    label= {I18n.t('typeOfBirth', {locale:language})}
                                    component={this.renderListPicker}>
                                    <Picker.Item label="Select" value="" />
                                    {this.renderPickerItems(this.state.birthList)}
                                </Field>
                            </View>
                            <View style={styles.width1001}>
                                <Field
                                    name={`${child}.livestockState`}
                                    label= {I18n.t('livestockState', {locale:language})}
                                    component={this.renderListPicker}>
                                    <Picker.Item label="Select" value="" />
                                    {/* {this.renderPickerItems(liveStockStateList)} */}
                                    <Picker.Item label="Alive" value="ALIVE" />
                                    <Picker.Item label="Dead" value="DEAD" />
                                </Field>
                            </View>
                        </View>
                    );
                })
                }
            </View>
        );
    }

    render() {
        const {handleSubmit,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <CalfBirth
                    onbackPress={navigateBack}
                    toolbarTitle= {I18n.t('calfbirth', {locale:language})}
                    calfBirthForm={this.renderRecordcalfBirthForm()}
                    handleNextPress={handleSubmit(this.onSubmit)}
                    stellaCode={this.state.stellaCode}
                    cattleDetails={this.state.cattleDetails}
                    isEditCalfBirth={this.props.isEditCalfBirth}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    offlineInput={this.renderRecordcalfBirthForm()}
                    comingFrom={this.props.comingFrom}
                    isInternetConnected={this.props.isInternetConnected}
                    handleSubmitOfflineStellaCode={handleSubmit(this.onSubmitOffline)}
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
    if (!values.deliveryDate) {
        errors.deliveryDate = "Delivery date is required";
    }
    if (!values.pregnancyType) {
        errors.pregnancyType = "Pregnancy type is required";
    }
    if (!values.deliveryStatus) {
        errors.deliveryStatus = "DeliveryStatus is required"
    }
    if (!values.children) {
        errors.dose = "All values are required";
    }
    return errors;
};

const selector = formValueSelector("calfBirth");

const constructAIEditObject = (props) => {
    if(props.comingFrom === "calfBirthOfflineList" && props.offlinecalfBirthDetails){
    return {
        registration : props.offlinecalfBirthDetails.offlineRegId,
        deliveryDate : moment(props.offlinecalfBirthDetails.deliveryDate).format("YYYY-MM-DD"),
        pregnancyType : props.offlinecalfBirthDetails.pregnancyType,
        deliveryStatus : props.offlinecalfBirthDetails.result,
        _id : props.offlinecalfBirthDetails._id
    }; 
    }
}

const mapStateToProps = (state, ownProps) => ({
    token: state.authReducer.token,
    isInternetConnected: state.appReducer.isInternetConnected,
    cattlesMetadata: state.lookupDataReducer.cattlesMetadata,
    searchList: state.searchReducer.searchList,
    orgConfiguration: state.lookupDataReducer.orgConfiguration,
    cattleHealthMetaData: state.lookupDataReducer.cattleHealthMetaData,
    medicineList: state.lookupDataReducer.medicineList,
    deliveryStatus: selector(state, "deliveryStatus"),
    pregnancyType: selector(state, "pregnancyType"),
    deliveryDate: selector(state, "deliveryDate"),
    language: state.localeReducer.language,
    initialValues: ownProps.isEditCalfBirth ? state.animalMgmtReducer.cattleDetails : constructAIEditObject(ownProps)  
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_CALF_BIRTH_VALUE", property, value}),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleGetMedicineList: token => dispatch(getMedicineListAction(token))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "calfBirth", validate})
)(authenticatedLayer(CalfBirthContainer));
