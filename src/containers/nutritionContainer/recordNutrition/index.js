import {connect} from "react-redux";
import {compose} from "redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {DatePickerAndroid, FlatList, Image, Picker, TouchableHighlight, View} from "react-native";
import {Field, formValueSelector, reduxForm} from "redux-form";
import {Text} from "react-native-elements";
import moment from "moment";
import authenticatedLayer from "../../authenticatedLayer";
import {navigateBack} from "../../../utils/utility";
import {cattleSearchAction} from "../../../actions/search.actions";
import {getNutritionClassificationAction, logNutritionAction} from "../../../actions/nutritionModule.actions";
import NutritionRecord from "../../../templates/nutritionTemplates/recordNutrition";
import I18n from "../../../utils/language.utils";
import styles from "./styles";
import ListPicker from "../../../components/ListPicker";
import {Actions} from "../../../assets";
import InputText from "../../../components/InputText";

const propTypes = {
    token: PropTypes.string,
    handleCattleSearch: PropTypes.func,
    handleEmptySearchList: PropTypes.func,
    handleEmptyCattleSearch: PropTypes.func,
    searchList: PropTypes.array,
    getClassificationTypesForCattle: PropTypes.func,
    clearNutritionFeedPlan: PropTypes.func,
    nutritionFeedPlan: PropTypes.array,
    logNutrition: PropTypes.func,
    nutritionLogResponse: PropTypes.object,
    userDetails: PropTypes.object
};

const defaultProps = {
    token: "",
    handleCattleSearch: () => {
    },
    handleEmptySearchList: () => {
    },
    searchList: [],
    handleEmptyCattleSearch: () => {
    },
    getClassificationTypesForCattle: () => {
    },
    nutritionFeedPlan: [],
    clearNutritionFeedPlan: () => {
    },
    logNutrition: () => {
    },
    nutritionLogResponse: {},
    userDetails: {}
};

class RecordNutritionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cattleDetails: {},
            selectedDate: `${new Date().getUTCFullYear()}-${this.getFormattedMonth(new Date().getUTCMonth())}-${new Date().getUTCDate()}`
        };
    }

    renderListPicker = (field) => {
        const {meta: {touched, error}, id, input: {name, onChange, value, ...inputProps}, children, ...pickerProps} = field;
        return (
            <View>
                <View style={{...styles.listItemContainer, ...styles.width100}}>
                    <View style={{...styles.feedListPicker}}>
                        <ListPicker
                            onValueChange={val => onChange(val)}
                            selectedValue={value}
                            {...inputProps}
                            {...pickerProps}>
                            {children}
                        </ListPicker>
                        <Text style={styles.errorText}>{touched ? error : ""}</Text>
                    </View>
                    <View style={styles.addMoreContainer}>
                        <TouchableHighlight onPress={() => this.onAddButtonClicked(id)}>
                            <Image source={Actions.add} style={styles.addMoreImage} />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }

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

    renderPickerItems = (list) => {
        return list.map((item, index) => {
            return (
                <Picker.Item key={index} label={item.name} value={item.id} />
            );
        });
    }

    getFormattedMonth = (month) => {
        const mm = month + 1;
        let mmStr;
        if (mm < 10) {
            mmStr = `0${mm}`;
        } else {
            mmStr = mm;
        }
        return mmStr;
    };

    renderDatePicker = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {

                this.setState({
                    selectedDate: `${year}-${this.getFormattedMonth(month)}-${day}`
                });
            } else {
                this.setState({
                    // selectedDate: ""
                });
            }
        } catch ({code, message}) {
            console.warn("Cannot open date picker", message);
        }
    };

    onCattleSearch = (searchText) => {
        this.props.handleCattleSearch(searchText, this.props.token);
    };

    onSearchItemPress = (item, node) => {
        this.setState({cattleDetails: item});
        this.props.getClassificationTypesForCattle(this.props.token, item.stellaCode);
        this.props.handleEmptyCattleSearch();
        node.clear();
    };

    onSubmit = (values) => {
        const a = this.props.nutritionFeedPlan.slice();
        const request = {};
        const time = moment(new Date().getTime()).format("hh:mm A");
        request.nutritionDate = moment.utc(moment(`${this.state.selectedDate} ${time}`, "YYYY-MM-DD hh:mm A")).format();
        request.cattle = {}
        request.cattle.id = this.state.cattleDetails.id;
        request.userId = this.props.userDetails.id;
        request.cost = 0;
        request.quantity = 0;
        request.rootOrgId = 0;
        request.unitCost = 0
        request.items = [];
        let i;
        for (i = 0; i < a.length; i++) {
            let feedId = values[`${a[i].feedList.widgetId}_feed`];
            if (!this.isStringNotEmpty(feedId)) {
                break;
            }
            const feedSplit = feedId.split("_");
            feedId = this.isStringNotEmpty(feedId) ? feedSplit[0] : null;
            const cost = values[`${a[i].feedList.widgetId}_cost`];
            const qty = values[`${a[i].feedList.widgetId}_qty`];
            if (this.isStringNotEmpty(feedId) && this.isStringNotEmpty(cost) && this.isStringNotEmpty(qty) && this.isStringNotEmpty(request.nutritionDate)) {
                const item = {};
                item.cost = cost;
                item.quantity = qty;
                item.feedType = {
                    id: feedId
                };
                request.items.push(item);
            }
        }
        if (request.items.length > 0) {
            this.props.logNutrition(this.props.token, request).then((data) => {
                if (this.isStringNotEmpty(data)) {
                    if (this.isStringNotEmpty(data.id)) {
                        this.props.clearNutritionFeedPlan();
                        navigateBack(null);
                    }
                }
            });
        }
    };

    isStringNotEmpty = (value) => {
        return value !== "undefined" && value;
    };

    onAddButtonClicked = (id) => {
        const idSplit = id.split("_");
        /* let rowHolder = this.props.nutritionFeedPlan.find(o => o.id === idSplit[0]);
        let newRow = {};
        lf.feedList = {};
        clf.feedList.feeds = item.feeds;
        clf.feedList.qty = "";
        clf.feedList.cost = "";
        clf.feedList.widgetId = `${item.id}_${i}`;
        clf.feedList.selectedFeed = ""; */
    };

    renderFeedList = () => {
        return (
            <View style={styles.listContainer}>
                <FlatList
                    style={styles.listFeedType}
                    data={this.props.nutritionFeedPlan}
                    renderItem={({item, index}) =>
                        <View>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{...styles.textBoldHighlight, ...styles.padding}}>{item.name}
                            </Text>
                            <View>
                                <Field
                                    id={`${item.feedList.widgetId}_feed`}
                                    name={`${item.feedList.widgetId}_feed`}
                                    component={this.renderListPicker}>
                                    <Picker.Item label="Select" value="" />
                                    {this.renderPickerItems(item.feedList.feeds)}
                                    <Picker.Item label="None" value="" />
                                </Field>
                                <View style={{...styles.listItemContainer, ...styles.paddingHorizontal}}>
                                    <View style={styles.width50}>
                                        <Field
                                            id={`${item.feedList.widgetId}_qty`}
                                            name={`${item.feedList.widgetId}_qty`}
                                            label={I18n.t("quantity", {locale: this.props.language})}
                                            component={this.renderTextInput} />
                                    </View>
                                    <View style={styles.width50}>
                                        <Field
                                            id={`${item.feedList.widgetId}_cost`}
                                            name={`${item.feedList.widgetId}_cost`}
                                            label={I18n.t("cost", {locale: this.props.language})}
                                            component={this.renderTextInput} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    }/>
            </View>
        );
    }

    render() {
        const {handleSubmit, language} = this.props;
        return (
            <View style={styles.container}>
                <NutritionRecord
                    toolbarTitle={I18n.t("recordNutrition", {locale: language})}
                    onBackPress={() => {
                        this.props.clearNutritionFeedPlan();
                        navigateBack(null);
                    }}
                    handleSearch={this.onCattleSearch}
                    searchList={this.props.searchList}
                    handleSearchItemPress={this.onSearchItemPress}
                    language={this.language}
                    cattleDetails={this.state.cattleDetails}
                    onSaveButtonClicked={handleSubmit(this.onSubmit)}
                    onDatePickerClicked={this.renderDatePicker}
                    selectedDate={this.state.selectedDate}
                    renderListView={this.renderFeedList()}
                    isHidden={!this.isStringNotEmpty(this.state.cattleDetails.id)}
                />
            </View>
        );
    }
}

RecordNutritionContainer.propTypes = propTypes;

RecordNutritionContainer.defaultProps = defaultProps;

const selector = formValueSelector("recordNutrition");

const mapStateToProps = state => ({
    token: state.authReducer.token,
    searchList: state.searchReducer.searchList,
    language: state.localeReducer.language,
    nutritionDate: selector(state, "nutritionDate"),
    nutritionFeedPlan: state.nutritionReducer.nutritionFeedPlan,
    nutritionLogResponse: state.nutritionReducer.nutritionLogResponse,
    userDetails: state.farmAdminReducer.userDetails
});

const mapDispatchToProps = dispatch => ({
    handleCattleSearch: (payload, token) => dispatch(cattleSearchAction(payload, token)),
    getClassificationTypesForCattle: (token, stellaCode) => dispatch(getNutritionClassificationAction(token, stellaCode)),
    handleEmptySearchList: () => dispatch({type: "EMPTY_SEARCH_LIST"}),
    clearNutritionFeedPlan: () => dispatch({type: "CLEAR_NUTRITION_CLASSIFICATIONS"}),
    logNutrition: (token, payload) => dispatch(logNutritionAction(token, payload))
});

const validate = (values) => {
    const errors = {};
    /* if (!values.lactationState) {
        errors.lactationState = "Lactation State is required";
    }
    if (!values.breedingState) {
        errors.breedingState = "Breeding State is required";
    } */
    return errors;
};

export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm({
    form: "recordNutrition",
    validate
}))(authenticatedLayer(RecordNutritionContainer));
