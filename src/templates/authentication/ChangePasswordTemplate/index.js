import React, {Component} from "react";
import {Text, View, ScrollView} from "react-native";
import Config from "react-native-config";
import {Button, Icon} from "react-native-elements";
import PropTypes from "prop-types";

import {ProfileIcons} from "../../../assets";
import Toolbar from "../../../components/Toolbar";
import Modal from "../../../components/ModalSmall";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    showModal: PropTypes.bool,
    loginForm: PropTypes.element,
    onLogin: PropTypes.func,
    onbackPress: PropTypes.func,
    onPressOk: PropTypes.func
};

const defaultProps = {
    showModal: false,
    loginForm: (<Text>Login Form</Text>),
    onLogin: () => {},
    onbackPress: () => {},
    onPressOk: () => {}
};

class ChangePassword extends Component {

    render() {
        const {language} = this.props
        return (
            <View style={styles.appContainer}>
                <Toolbar
                    title={Config.APP_TYPE === "corporate" ? "HAIS" : ""}
                    iconmooOn={Config.APP_TYPE === "corporate" ? "" : ProfileIcons.iconMooOn}
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress} />
                <ScrollView contentContainerStyle={styles.loginWrapper}>
                    <Text style={styles.welcomeText}>
                    {I18n.t('changePassword', {locale:language})}
                    </Text>
                    {this.props.loginForm}
                    <Text style={styles.passwordStrength}>
                    {I18n.t('passwordStrengthColon', {locale:language})}
                    {this.props.strength}</Text>
                    <View style={styles.viewInstructionsText}>
                        <View style={{flexDirection: "row"}}>
                            {this.props.isNameOrEmail && <Text style={[styles.instructions, {color: "red"}]}>X</Text>}
                            {/* <Text style={styles.instructions}>
                            {I18n.t('mustnotcontainyournameoremail', {locale:language})}
                            </Text> */}
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Icon
                                name={this.props.firstRule ? "checkbox-marked" : "checkbox-blank-outline"}
                                type="material-community"
                                color="green"
                            />
                            <Text style={styles.instructions}>
                            {I18n.t('Atleast8to12characters', {locale:language})}
                            </Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Icon
                                 name={this.props.thirdRule ? "checkbox-marked" : "checkbox-blank-outline"}
                                 type="material-community"
                                 color="green"
                            />
                            <Text style={styles.instructions}>
                            {I18n.t('containsanumber', {locale:language})}
                            </Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Icon
                                 name={this.props.fourthRule ? "checkbox-marked" : "checkbox-blank-outline"}
                                 type="material-community"
                                 color="green"
                            />
                            <Text style={styles.instructions}>
                            {I18n.t('containsaspecialcharacters', {locale:language})}
                            </Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Icon
                                 name={this.props.fifthRule ? "checkbox-marked" : "checkbox-blank-outline"}
                                 type="material-community"
                                 color="green"
                            />
                            <Text style={styles.instructions}>
                            {I18n.t('containsauppercase', {locale:language})}
                            </Text>
                        </View>
                    </View>
                    <Button
                        raised
                        title= {I18n.t('done', {locale:language})}
                        backgroundColor="#ed1c24"
                        borderRadius={4}
                        containerViewStyle={styles.loginButtonStyle}
                        textStyle={styles.loginTextStyle}
                        onPress={this.props.onLogin} />
                </ScrollView>
                <Modal
                    showModal={this.props.showModal}
                    onPressOk={this.props.onPressOk}
                    showCancel={false}
                    title= {I18n.t('passwordChanged', {locale:language})}
                    content="Your password changed successfully!"
                />
            </View>
        );
    }
}

ChangePassword.defaultProps = defaultProps;

ChangePassword.propTypes = propTypes;

export default ChangePassword;
