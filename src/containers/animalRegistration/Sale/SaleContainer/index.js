
import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text, Picker} from "react-native";
import {reduxForm, Field, formValueSelector} from "redux-form";
import moment from "moment";

import authenticatedLayer from "../../../authenticatedLayer";
import InputText from "../../../../components/InputText";
import TextArea from "../../../../components/TextArea";
import DatePickerAndroid from "../../../../components/DatePicker/DatePicker.android";
import Sale from "../../../../templates/animalListingTemplates/SaleTemplates/Sale";
import {navigateBack, navigateTo} from "../../../../utils/utility";
import {createSaleAction} from "../../../../actions/registerAnimal.actions";
import {cattleSearchAction} from "../../../../actions/search.actions";
import  I18n from "../../../../utils/language.utils";

import styles from "./styles";


class SaleContainer extends Component<{}> {

    state = {
        stellaCode: "",
        cattleDetails: {}
    }

    componentDidMount() {
        this.props.handleCreateSale(this.props.token);
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
        const convertUTCdeliveryDate = moment.utc(values.Date);
        const actualDateWithTime = moment(convertUTCdeliveryDate).toISOString();
        const payload = {
            actualDate: actualDateWithTime,
            to : { name : values.sold},
            comments: values.notes
        };
            this.props.dispatch(createSaleAction(this.state.cattleDetails.id, payload, this.props.token)).then((data) => {             
                    this.props.reset();
                    navigateTo("dashboard");
            });
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

    renderSaleRecordForm = () => {
        const {language} = this.props;
        return (
            <View style={styles.formContainer}>
                <View style={styles.width100}>
                    <Field
                        name="Date"
                        label= {I18n.t('date', {locale:language})}
                        component={this.renderDatePicker} >
                     </Field>
                </View>
                <View style={styles.width100}>
                <Field
                        name="sold"
                        label= {I18n.t('soldto', {locale:language})}
                        component={this.renderTextInput} >
                 </Field>
                </View>
                <View style={styles.width100}>
                <Field
                        name="notes"
                        label= {I18n.t('notes', {locale:language})}
                        component={this.renderTextArea}>
                </Field>
                </View>
            </View>);
    }

    render() {
        const {handleSubmit,language} = this.props;
        console.log("renderlanguage",language);
        return (
            <View style={styles.appContainer}>
                <Sale
                    onbackPress={navigateBack}
                    toolbarTitle="Sale Record"
                    saleRecordForm={this.renderSaleRecordForm()}
                    handleNextPress={handleSubmit(this.onSubmit)}
                    stellaCode={this.state.stellaCode}
                    cattleDetails={this.state.cattleDetails}
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
    return errors;
};

const selector = formValueSelector("sale");



const mapStateToProps = (state, ownProps) => ({
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    orgConfiguration: state.lookupDataReducer.orgConfiguration,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    // handleSetPropertyValue: (property, value) => dispatch({type: "SET_SALE", property, value}),
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    handleEmptyCattleSearch: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    handleCreateSale: token => dispatch(createSaleAction(token))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "sale", validate})
)(authenticatedLayer(SaleContainer));

