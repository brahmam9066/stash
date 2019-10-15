import { connect } from "react-redux";
import { compose } from "redux";
import React, { Component } from "react";
import { View, Text } from "react-native";

import LanguagePreference from "../../../templates/authentication/LanguagePreferenceTemplate";
import { navigateTo } from "../../../utils/utility";
import { setLanguage } from "../../../actions/locale.actions";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

class LanguagePreferenceContainer extends Component<{}> {

    onbackPress = () => {
        navigateTo("dashboard");
    }

    onChangeLanguage = (language) => {
        console.log(language);
        this.props.setLanguage(language);
    }

    render() {
        const { handleSubmit, language } = this.props;
        return (
            <View style={styles.appContainer}>
                <LanguagePreference
                    toolbarTitle= {I18n.t('languagePreference', {locale:language})}
                    onbackPress={this.onbackPress}
                    activeLanguage={this.props.language}
                    changeLanguage={this.onChangeLanguage}
                    language={language}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    setLanguage: (language) => dispatch(setLanguage(language))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(LanguagePreferenceContainer);
