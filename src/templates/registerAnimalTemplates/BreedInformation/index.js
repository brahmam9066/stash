import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import {Button} from "react-native-elements";

import Toolbar from "../../../components/Toolbar";
import LinkButton from "../../../components/LinkButton";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string,
    breedForm: PropTypes.element,
    pregnancyDetialsForm: PropTypes.element,
    handleNextPress: PropTypes.func,
    onPressSkip: PropTypes.func
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    breedForm: <Text>Breed Form</Text>,
    pregnancyDetialsForm: <Text>Pregnancy Form</Text>,
    handleNextPress: () => {},
    onPressSkip: () => {}
};

class ProfileInformation extends Component<{}> {

    render() {
        const {language} = this.props;
        return (
            <View style={styles.flex1}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <View style={[styles.flex1, styles.bodyContent]}>
                    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                        <View style={styles.spaceContainer}>
                            <Text style={[styles.h6, styles.paddingHorizontal16]}>
                            {I18n.t('breedInformation', {locale:language})}
                            </Text>
                            <LinkButton
                                onPress={this.props.onPressSkip}
                                accessibilityLabel="breed-information-save-and-skip-button"
                                testID="breed-information-save-and-skip-button"
                                title={I18n.t('skipAndSave', {locale:language})}                  
                                textStyle={styles.linkButtonStyle} />
                        </View>
                        {this.props.breedForm}
                        {this.props.pregnancyDetialsForm}
                        <Button
                            accessibilityLabel="breed-information-save-button"
                            testID="breed-information-save-button"
                            raised
                            title={I18n.t('next', {locale:language})}                  
                            backgroundColor="#ed1c24"
                            borderRadius={4}
                            containerViewStyle={styles.buttonStyle}
                            textStyle={styles.buttonTextStyle}
                            onPress={this.props.handleNextPress} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

ProfileInformation.defaultProps = defaultProps;

ProfileInformation.propTypes = propTypes;

export default ProfileInformation;
