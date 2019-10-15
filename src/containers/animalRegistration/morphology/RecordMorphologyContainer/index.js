import {connect} from "react-redux";
import {compose} from "redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text} from "react-native";
import {reduxForm, Field} from "redux-form";
import moment from "moment";

import authenticatedLayer from "../../../authenticatedLayer";
import InputText from "../../../../components/InputText";
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import RecordMorphology from "../../../../templates/registerAnimalTemplates/morphologyTemplates/RecordMorphology";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {cattleSearchAction} from "../../../../actions/search.actions";
import  I18n from "../../../../utils/language.utils";
import {getMorphologicalConfigsAction, saveMorphologicalDetailsAction, updateMorphologicalDetailsAction, getMorphologicalListAction} from "../../../../actions/registerAnimal.actions";
import {resetImagesForRecordAction} from "../../../../actions/imageUpload.action";

import styles from "./styles";

const propTypes = {
    token: PropTypes.string,
    userDetails: PropTypes.object,
    morphologicalConfigs: PropTypes.array,
    comingFrom: PropTypes.string,
    morphologicalDetails: PropTypes.object,
    handleGetMorphologicalConfigs: PropTypes.func,
    reset: PropTypes.func,
    handleSaveMorphologicalDetails: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleEmptyCattleSearch: PropTypes.func,
    handleCattleSearch: PropTypes.func,
    isEditMorphologyDetails: PropTypes.bool,
    searchList: PropTypes.array,
    handleUpdateMorphologicalDetails: PropTypes.func,
    handleGetMorphologicalList: PropTypes.func,
    handleEmptyMorphologicalList: PropTypes.func,
    change: PropTypes.func
};

const defaultProps = {
    token: "",
    userDetails: {},
    morphologicalConfigs: [],
    comingFrom: "",
    morphologicalDetails: {},
    handleGetMorphologicalConfigs: () => {},
    reset: () => {},
    handleSaveMorphologicalDetails: () => {},
    handleSubmit: () => {},
    handleEmptyCattleSearch: () => {},
    handleCattleSearch: () => {},
    isEditMorphologyDetails: false,
    searchList: [],
    handleUpdateMorphologicalDetails: () => {},
    handleGetMorphologicalList: () => {},
    handleEmptyMorphologicalList: () => {},
    change: () => {}
};

class RecordMorphologyContainer extends Component {

    state = {
        cattleDetails: this.props.isEditMorphologyDetails ? this.props.morphologicalDetails.cattle : {}
    }

    componentDidMount() {
        this.props.handleGetMorphologicalConfigs(this.props.token);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    onSubmit = (values) => {

        const payload = {
            rootOrgId: this.state.cattleDetails.rootOrgId,
            measurementDate: moment(values.measurementDate, "YYYY-MM-DD").toISOString(),
            cattle: {
                stellaCode: this.state.cattleDetails.stellaCode
            },
            cattleMorphologyRecords: values.cattleMorphologyRecords
        };

        if (this.props.isEditMorphologyDetails) {
            payload.id = this.props.morphologicalDetails.id;
            this.props.handleUpdateMorphologicalDetails(payload, this.props.token).then((data) => {
                if (data) navigateBack("morphologicalDetails");
                this.props.handleEmptyMorphologicalList();
                this.props.handleGetMorphologicalList(this.props.token);
            });
        } else {
            this.props.handleSaveMorphologicalDetails(payload, this.props.token).then((data) => {
                if (data) navigateTo("morphologicalDetails");
                this.props.handleEmptyMorphologicalList();
                this.props.handleGetMorphologicalList(this.props.token);
                this.props.handleEmptyImages();
            });
        }
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, id, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    id={id}
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

    onChangeMorphologyConfigs = (data, index) => {
        this.props.change(`cattleMorphologyRecords[${index}].cattleMorphologyConfigId`, data.id);
    }

    rendermorphologicalForm = () => {
        const {language}= this.props
        return (
            <View style={styles.formContainer}>
                <View style={styles.width100}>
                    <Field
                        id="measurementDate"
                        name="measurementDate"
                        label= {I18n.t('measurementDate', {locale:language})}
                        component={this.renderDatePicker} />
                    {this.props.morphologicalConfigs.map((item, index) => {
                        return (
                            <Field
                                id={`morphology-configs-${item.name}`}
                                key={index}
                                name={`cattleMorphologyRecords[${index}].value`}
                                label={item.name}
                                onChange={() => { this.onChangeMorphologyConfigs(item, index); }}
                                component={this.renderTextInput} />
                        );
                    })}
                </View>
            </View>);
    }

    render() {
        const {handleSubmit, comingFrom, searchList, isEditMorphologyDetails,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <RecordMorphology
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
                    toolbarTitle= {I18n.t('recordMorphology', {locale:language})}
                    isEditMorphologyDetails={isEditMorphologyDetails}
                    morphologicalForm={this.rendermorphologicalForm()}
                    handleSavePress={handleSubmit(this.onSubmit)}
                    morphologicalDetails={this.props.morphologicalDetails}
                    language={language}
                />
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    token: state.authReducer.token,
    morphologicalConfigs: state.animalMgmtReducer.morphologicalConfigs,
    userDetails: state.farmAdminReducer.userDetails,
    morphologicalDetails: state.animalMgmtReducer.morphologicalDetails,
    initialValues: ownProps.isEditMorphologyDetails ? state.animalMgmtReducer.morphologicalDetails : {},
    searchList: state.searchReducer.searchList,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetMorphologicalConfigs: token => dispatch(getMorphologicalConfigsAction(token)),
    handleSaveMorphologicalDetails: (payload, token) => dispatch(saveMorphologicalDetailsAction(payload, token)),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleEmptyMorphologicalList: () => dispatch({type: "EMPTY_MORPHOLOGICAL_LIST"}),
    handleUpdateMorphologicalDetails: (payload, token) => dispatch(updateMorphologicalDetailsAction(payload, token)),
    handleGetMorphologicalList: token => dispatch(getMorphologicalListAction(token)),
    handleEmptyImages: () => dispatch(resetImagesForRecordAction())
});

RecordMorphologyContainer.propTypes = propTypes;
RecordMorphologyContainer.defaultProps = defaultProps;

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "morphology"})
)(authenticatedLayer(RecordMorphologyContainer));
