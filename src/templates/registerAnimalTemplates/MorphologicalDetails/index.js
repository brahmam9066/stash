import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import {Button} from "react-native-elements";

import LinkButton from "../../../components/LinkButton";
import Toolbar from "../../../components/Toolbar";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string,
    morphologicalForm: PropTypes.element,
    handleSavePress: PropTypes.func,
    onPressSkip: PropTypes.func
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    morphologicalForm: <Text>Pregnancy Form</Text>,
    handleSavePress: () => {},
    onPressSkip: () => {}
};

class ProfileInformation extends Component<{}> {

    render() {
        const {language} = this.props
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
                            {I18n.t('morphologyInformation', {locale:language})}                 
                            </Text>
                            <LinkButton
                                id="morphology-skip-and-save-button"
                                onPress={this.props.onPressSkip}
                                title={I18n.t('skipAndSave', {locale:language})}                 
                                textStyle={styles.linkButtonStyle} />
                        </View>
                        {this.props.morphologicalForm}
                        <Button
                            id="morphology-save-button"
                            raised
                            title={I18n.t('save', {locale:language})}                 
                            backgroundColor="#ed1c24"
                            borderRadius={4}
                            containerViewStyle={styles.buttonStyle}
                            textStyle={styles.buttonTextStyle}
                            onPress={this.props.handleSavePress} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

ProfileInformation.defaultProps = defaultProps;

ProfileInformation.propTypes = propTypes;

export default ProfileInformation;
