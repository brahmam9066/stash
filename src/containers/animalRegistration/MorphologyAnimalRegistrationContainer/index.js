import {connect} from "react-redux";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text} from "react-native";
import {reduxForm, Field} from "redux-form";
import moment from "moment";

import authenticatedLayer from "../../authenticatedLayer";
import InputText from "../../../components/InputText";
import MorphologicalDetails from "../../../templates/registerAnimalTemplates/MorphologicalDetails";
import {navigateBack, navigateTo} from "../../../utils/utility";
import {getMorphologicalConfigsAction, saveMorphologicalDetailsAction} from "../../../actions/registerAnimal.actions";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

class MorphologyAnimalRegistrationContainer extends Component<{}> {

    componentDidMount() {
        this.props.dispatch(getMorphologicalConfigsAction(this.props.token));
    }

    componentWillUnmount() {
        this.props.reset();
    }

    onSubmit = (values) => {
        const {animalDetails, userDetails} = this.props;
        const todaysDate = new Date();
        const orgId = userDetails.userInfo ? userDetails.userInfo.rootOrgId : "";

        const morphologyDetails = this.props.morphologicalConfigs.map((item) => {
            return {
                cattleMorphologyConfigId: item.id,
                value: values[item.id]
            };
        }).filter((item) => {
            if (item.value) {
                return true;
            }
            return false;
        });

        const payload = {
            rootOrgId: orgId,
            measurementDate: moment(todaysDate, "YYYY-MM-DD").toISOString(),
            cattle: {
                stellaCode: animalDetails.stellaCode
            },
            cattleMorphologyRecords: morphologyDetails,
            lat : this.props.location.lat,
            lng : this.props.location.lng
        };

        this.props.dispatch(saveMorphologicalDetailsAction(payload, this.props.token)).then((data) => {
            console.log(data);
            // navigateTo("animalDetails");
           navigateTo("animalDetails",{comingFrom:"morphologicalDetails"})
        }).catch((error) => {
            console.log(error);
        });
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

    rendermorphologicalForm = () => {
        return (
            <View style={styles.formContainer}>
                <View style={styles.width100}>
                    {this.props.morphologicalConfigs.map((item, index) => {
                        return (
                            <Field
                                id={`morphology-configs-${index}`}
                                key={index}
                                name={item.id}
                                label={item.name}
                                component={this.renderTextInput} />
                        );
                    })
                    }
                </View>
            </View>);
    }

    render() {
        const {handleSubmit, comingFrom, language} = this.props;
        return (
            <View style={styles.appContainer}>
                <MorphologicalDetails
                    onbackPress={() => {
                        // if (comingFrom === "animalSummary") {
                        //     navigateBack();
                        // } else {
                        //     navigateBack("dashboard");
                        // }
                        navigateBack("dashboard");
                    }}
                    toolbarTitle={I18n.t('registerAnimal', {locale:language})}
                    // onPressSkip={() => navigateTo("animalDetails")}
                    onPressSkip={() => navigateTo("animalDetails",{comingFrom:"morphologicalDetails"})}
                    morphologicalForm={this.rendermorphologicalForm()}
                    handleSavePress={handleSubmit(this.onSubmit)}
                    morphologicalDetails={this.props.morphologicalDetails}
                    language={language}
                />
            </View>
        );
    }
}

const constructInitialObject = (data) => {
    console.log(data);
    const initialValue = {};
    if (data && data.cattleMorphologyRecords && data.cattleMorphologyRecords.length > 0) {
        data.cattleMorphologyRecords.forEach((item) => {
            initialValue[item.cattleMorphologyConfigId] = item.value;
        });
    }
    return initialValue;
};

const mapStateToProps = (state, ownProps) => ({
    location:state.healthModuleOfflineReducer.location,
    token: state.authReducer.token,
    morphologicalConfigs: state.animalMgmtReducer.morphologicalConfigs,
    userDetails: state.farmAdminReducer.userDetails,
    animalDetails: state.animalMgmtReducer.animalDetails,
    initialValues: ownProps.isEditMorphologicalInfo ? constructInitialObject(state.animalMgmtReducer.morphologicalCurrentDetails) : {},
    morphologicalDetails: state.animalMgmtReducer.morphologicalDetails,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "morphologicalInformation"})
)(authenticatedLayer(MorphologyAnimalRegistrationContainer));
