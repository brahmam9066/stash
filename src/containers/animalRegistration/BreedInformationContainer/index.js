import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker} from "react-native";
import {reduxForm, Field, formValueSelector} from "redux-form";
import moment from "moment";

import authenticatedLayer from "../../authenticatedLayer";
import InputText from "../../../components/InputText";
import ListPicker from "../../../components/ListPicker";
import DatePickerAndroid from "../../../components/DatePicker/DatePicker.android";
import BreedInformation from "../../../templates/registerAnimalTemplates/BreedInformation";
import {navigateBack, navigateTo} from "../../../utils/utility";
import {updateBreedingInfoAction, createPregnancyInfoAction, updatePregnancyInfoAction} from "../../../actions/registerAnimal.actions";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

class BreedInformationContainer extends Component<{}> {

    state = {
        aiDate: "",
        pdCheckDate: "",
        resultList: [
            {label: "Pregnant", value: "Pregnant"},
            {label: "Review", value: "Review"}
            // {label: "Aborted", value: "Aborted"},
            // {label: "Empty", value: "Empty"},
            // {label: "Doubtful", value: "Doubtful"}
        ]
    }

    componentDidMount() {
        const {cattlePregnancyCurrentDetails, isEditBreedInfo, handleSetPropertyValue} = this.props;
        if (isEditBreedInfo && cattlePregnancyCurrentDetails.inseminations && cattlePregnancyCurrentDetails.inseminations.length > 0) {
            handleSetPropertyValue("aiDate", cattlePregnancyCurrentDetails.inseminations[0].inseminationDate);
            const date = new Date(cattlePregnancyCurrentDetails.inseminations[0].expectedPdFollowpDate);
            handleSetPropertyValue("pdCheckDate", moment(date).format("YYYY-MM-DD"));
            handleSetPropertyValue("parity", `${cattlePregnancyCurrentDetails.pregnancyParity}`);
            handleSetPropertyValue("sireType", cattlePregnancyCurrentDetails.inseminations[0].inseminationType);
            handleSetPropertyValue("inseminator", cattlePregnancyCurrentDetails.inseminations[0].inseminatorName);
            handleSetPropertyValue("pregID", cattlePregnancyCurrentDetails.id);
            let daysDifference = "";
            if (cattlePregnancyCurrentDetails.inseminations[0].inseminationDate && cattlePregnancyCurrentDetails.inseminations[0].expectedPdFollowpDate) {
                const startDate = Date.parse(cattlePregnancyCurrentDetails.inseminations[0].inseminationDate);
                const endDate = Date.parse(date);
                const timeDiff = endDate - startDate;
                daysDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            }
            handleSetPropertyValue("daysSinceAi", `${daysDifference}`);
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    onSubmit = (values) => {
        const convertUTCaiDate = moment.utc(values.aiDate);
        const aiDateDateWithTime = moment(convertUTCaiDate).toISOString();
        const convertUTCpdCheckDate = moment.utc(values.pdCheckDate);
        const pdCheckDateDateWithTime = moment(convertUTCpdCheckDate).toISOString();
        let resultStatus = "";
        const {animalDetails, userDetails, breedingState, aiDate, isEditBreedInfo} = this.props;
        const orgId = userDetails.userInfo ? userDetails.userInfo.rootOrgId : "";
        const payloadBreeding = {
            id: animalDetails.id,
            lactationState: values.lactationState,
            breedingState: values.breedingState,
            noOfCalves: values.noOfCalves
        };

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

        const payloadPregnancy = {
            // fromDate: values.aiDate ? moment(values.aiDate, "YYYY-MM-DD").toISOString() : null,
            fromDate: aiDateDateWithTime,
            toDate: null,
            inseminations: [
                {
                    inseminationDate: aiDateDateWithTime,
                    // inseminationDate: values.aiDate ? moment(values.aiDate, "YYYY-MM-DD").toISOString() : null,
                    // expectedPdFollowpDate: values.pdCheckDate ? moment(values.pdCheckDate, "YYYY-MM-DD").toISOString() : null,
                    expectedPdFollowpDate: pdCheckDateDateWithTime,
                    inseminationType: values.sireType || null,
                    inseminatorName: values.inseminator || null,
                    pdInspections: [
                        {
                            actualDate: pdCheckDateDateWithTime,
                            // actualDate: values.pdCheckDate ? moment(values.pdCheckDate, "YYYY-MM-DD").toISOString() : null,
                            status: resultStatus,
                            result: values.status // ny default we are giving the cattle as pregnant, so hardcoding the status to success
                        }
                    ]
                }
            ],
            pregnancyParity: values.parity
        };
        // Check if the cattle is more than 2 years
        const cattleDob = moment(animalDetails.dob);
        const noOfYears = moment(new Date()).diff(cattleDob, "years");
        let responseData = "";
        if (noOfYears >= 2 && breedingState && aiDate && animalDetails && animalDetails.gender &&
            animalDetails.gender.toLowerCase() === "female" &&
            (breedingState && breedingState.toLowerCase() !== "calf") &&
            (breedingState && breedingState.toLowerCase() !== "heifer") &&
            (breedingState && breedingState.toLowerCase() !== "open unbred")) {
            if (isEditBreedInfo) payloadPregnancy.id = values.pregID;
            responseData = Promise.all([
                this.props.dispatch(updateBreedingInfoAction(payloadBreeding, this.props.token)).then(
                    this.props.dispatch(!isEditBreedInfo ?
                        createPregnancyInfoAction(animalDetails.id, payloadPregnancy, this.props.token) :
                        updatePregnancyInfoAction(animalDetails.id, [payloadPregnancy], this.props.token))
                )

            ]);
        } else {
            responseData = this.props.dispatch(updateBreedingInfoAction(payloadBreeding, this.props.token));
        }

        responseData.then((data) => {
            if (data) {
                if (this.props.comingFrom === "breedinfo") {
                    navigateTo("animalDetails");
                } else {
                    navigateTo("animalDetails",{comingFrom : "breeds"});
                    // navigateBack();
                }
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, id, label, secureTextEntry, editable, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    id={id}
                    onChangeText={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    editable={editable}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    calculateDaysSinceAi = (name, date) => {
        if (name === "aiDate") {
            this.props.handleSetPropertyValue("daysSinceAi", `${moment().diff(moment(date, "YYYY-MM-DD"), "days")}`);
        }
        // if (name === "aiDate") {
        //     this.setState({
        //         aiDate: date,
        //         pdCheckDate: ""
        //     });
        //     this.props.handleSetPropertyValue("pdCheckDate", "");
        // } else if (name === "pdCheckDate") {
        //     this.setState({
        //         pdCheckDate: date
        //     }, () => {
        //         let daysDifference = "";
        //         if (this.state.aiDate && this.state.pdCheckDate) {
        //             const startDate = Date.parse(this.state.aiDate);
        //             const endDate = Date.parse(this.state.pdCheckDate);
        //             const timeDiff = endDate - startDate;
        //             daysDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        //         }
        //         // console.log(daysDifference);
        //         this.props.handleSetPropertyValue("daysSinceAi", `${daysDifference}`);
        //     });
        // }
    }

    renderDatePicker = (field) => {
        const {meta: {touched, error}, id, datePickerButtonId, label, maxDate, minDate, secureTextEntry, maxLength, keyboardType, placeholder, input: {name, onChange, ...restInput}} = field;
        return (
            <View>
                <DatePickerAndroid
                    id={id}
                    datePickerButtonId={datePickerButtonId}
                    onChangeText={onChange}
                    onChangeDate={(date) => {
                        this.calculateDaysSinceAi(name, date);
                        onChange(date);
                    }}
                    maxLength={maxLength}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderListPicker = (field) => {
        const {meta: {touched, error}, id, input: {onChange, value, ...inputProps}, children, ...pickerProps} = field;
        return (
            <View>
                <ListPicker
                    id={id}
                    selectedValue={value}
                    onValueChange={val => onChange(val)}
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
            object.push({label: item.name, value: item.name});
        });
        return object;
    }

    renderBreedForm = (formMetaData) => {
        const {breedingState, animalDetails, language} = this.props;
        const lactationList = (formMetaData && formMetaData.LACTATION_STATES) ? this.createObjectFromMetaData(formMetaData.LACTATION_STATES) : [];
        const breedingStateList = (formMetaData && formMetaData.BREEDING_STATES) ? this.createObjectFromMetaData(formMetaData.BREEDING_STATES) : [];
        const showNoOfcalves = false;

        return (
            <View style={styles.formContainer}>
                {
                    animalDetails.gender === "MALE" ?
                        <View style={styles.width100}>
                            <Field
                                id="lactation-state"
                                name="lactationState"
                                label={I18n.t('lactation', {locale:language})}
                                component={this.renderListPicker}>
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="None" value="None" />
                            </Field>
                        </View>
                        :
                        <View style={styles.width100}>
                            <Field
                                id="lactation-state"
                                name="lactationState"
                                label={I18n.t('lactation', {locale:language})}
                                component={this.renderListPicker}>
                                <Picker.Item label="Select" value="" />
                                {this.renderPickerItems(lactationList)}
                            </Field>
                        </View>
                }

                {
                    animalDetails.gender === "MALE" ?
                        <View style={styles.width100}>
                            <Field
                                id="breeding-state"
                                name="breedingState"
                                label={I18n.t('breedingState', {locale:language})}
                                component={this.renderListPicker}>
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="Calf" value="Calf" />
                                <Picker.Item label="Hiefer" value="Hiefer" />
                            </Field>
                        </View>
                        :
                        <View style={styles.width100}>
                            <Field
                                id="breeding-state"
                                name="breedingState"
                                label={I18n.t('breedingState', {locale:language})}
                                component={this.renderListPicker}>
                                <Picker.Item label="Select" value="" />
                                {this.renderPickerItems(breedingStateList)}
                            </Field>
                        </View>
                }
                {/* {showNoOfcalves &&
                    <View style={styles.width100}>
                        <Field
                            id="no-of-calves"
                            name="noOfCalves"
                            label="Number Of Calving"
                            component={this.renderListPicker}>
                            <Picker.Item label="Select" value="" />
                            <Picker.Item label="0" value="0" />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Field>
                    </View>
                } */}
            </View>);
    }

    renderpregnancyDetialsForm = () => {
        const {breedingState, animalDetails, cattlesMetadata, language} = this.props;
        const pdCheckMinDate = new Date(this.props.aiDate).setDate(new Date(this.props.aiDate).getDate() + 21);
        const cattleDob = moment(animalDetails.dob);
        const noOfYears = moment(new Date()).diff(cattleDob, "years");

        let sireTypeList = [];
        if (animalDetails.species && cattlesMetadata && cattlesMetadata.BREED && cattlesMetadata.BREED.length > 0) {
            const sireArray = cattlesMetadata.BREED.filter((breed) => {
                return (breed.species.toLowerCase()).includes(animalDetails.species[0].toLowerCase());
            });
            sireTypeList = this.createObjectFromMetaData(sireArray);
        }

        if (noOfYears >= 2 && breedingState && animalDetails && animalDetails.gender &&
            animalDetails.gender.toLowerCase() === "female" && breedingState.toLowerCase() !== "calf" && breedingState.toLowerCase() !== "heifer" && breedingState.toLowerCase() !== "open unbred") {
            return (
                <View>
                    <Text style={[styles.h6, styles.paddingHorizontal16]}>
                    {I18n.t('currentPregnancyInformation', {locale:language})}
                    </Text>
                    <View style={styles.formContainer}>
                        <View style={styles.row}>
                            <View style={styles.width50}>
                                <Field
                                    id="parity"
                                    name="parity"
                                    label={I18n.t('parity', {locale:language})}
                                    maxLength={1}
                                    component={this.renderTextInput} />
                            </View>
                            <View style={styles.width50}>
                                <Field
                                    id="ai-date"
                                    datePickerButtonId="ai-date-button"
                                    name="aiDate"
                                    label={I18n.t('aiDate', {locale:language})}
                                    minDate={new Date(animalDetails.dob)}
                                    component={this.renderDatePicker} />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.width50}>
                                <Field
                                    id="days-since-ai"
                                    name="daysSinceAi"
                                    label={I18n.t('dayssinceAI', {locale:language})}
                                    editable={false}
                                    component={this.renderTextInput} />
                            </View>
                            <View style={styles.width50}>
                                <Field
                                    id="inseminator"
                                    name="inseminator"
                                    label={I18n.t('inseminator', {locale:language})}
                                    component={this.renderTextInput} />
                            </View>
                        </View>
                        <View style={styles.width100}>
                            <Field
                                id="sire-type"
                                name="sireType"
                                label={I18n.t('sireType', {locale:language})}
                                component={this.renderListPicker}>
                                <Picker.Item label="Select" value="" />
                                {this.renderPickerItems(sireTypeList)}
                            </Field>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.width50}>
                                <Field
                                    id="pd-check-date"
                                    datePickerButtonId="pd-check-date-button"
                                    name="pdCheckDate"
                                    label={I18n.t('pdCheckDate', {locale:language})}
                                    component={this.renderDatePicker} />
                            </View>
                            <View style={styles.width50}>
                                <Field
                                    id="status"
                                    name="status"
                                    label={I18n.t('pdResult', {locale:language})}
                                    component={this.renderListPicker}>
                                    <Picker.Item label="Select" value="" />
                                    {this.renderPickerItems(this.state.resultList)}
                                </Field>
                            </View>
                        </View>
                    </View>
                </View>);
        }
        return (<View />);
    }

    render() {
        const {handleSubmit, cattlesMetadata, comingFrom, language} = this.props;
        return (
            <View style={styles.appContainer}>
                <BreedInformation
                    onbackPress={() => {
                        if (comingFrom === "animalSummary") {
                            navigateBack();
                        } else {
                            navigateBack("dashboard");
                        }
                    }}
                    toolbarTitle={I18n.t('registerAnimal', {locale:language})}
                    breedForm={this.renderBreedForm(cattlesMetadata)}
                    pregnancyDetialsForm={this.renderpregnancyDetialsForm(cattlesMetadata)}
                    handleNextPress={handleSubmit(this.onSubmit)}
                    language={language}
                    onPressSkip={() => {
                        if (this.props.comingFrom === "breedinfo") {
                            navigateTo("animalDetails");
                        } else {
                            navigateBack();
                        }
                    }}
                />
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.lactationState) {
        errors.lactationState = "Lactation State is required";
    }
    if (!values.breedingState) {
        errors.breedingState = "Breeding State is required";
    }
    return errors;
};

const selector = formValueSelector("breedInformation");

const mapStateToProps = (state, ownProps) => ({
    cattlesMetadata: state.animalMgmtReducer.cattlesMetadata,
    token: state.authReducer.token,
    userDetails: state.farmAdminReducer.userDetails,
    animalDetails: state.animalMgmtReducer.animalDetails,
    breedingState: selector(state, "breedingState"),
    lactationState: selector(state, "lactationState"),
    noOfCalves: selector(state, "noOfCalves"),
    aiDate: selector(state, "aiDate"),
    daysSinceAi: selector(state, "daysSinceAi"),
    pdCheckDate: selector(state, "pdCheckDate"),
    initialValues: ownProps.isEditBreedInfo ? state.animalMgmtReducer.animalDetails : {},
    cattlePregnancyCurrentDetails: state.animalMgmtReducer.cattlePregnancyCurrentDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleSetPropertyValue: (property, value) => dispatch({type: "SET_BREEADING_PROPERTY_VALUE", property, value})
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "breedInformation", validate})
)(authenticatedLayer(BreedInformationContainer));
