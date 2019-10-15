import React, {Component} from "react";
import {Text, View} from "react-native";
import Config from "react-native-config";
import {Button, Icon} from "react-native-elements";
import PropTypes from "prop-types";
import {ProfileIcons} from "../../../assets";
import  I18n from "../../../utils/language.utils";

import Toolbar from "../../../components/Toolbar";

import styles from "./styles";

const propTypes = {
    passwordForm: PropTypes.element,
    onHandlePassword: PropTypes.func,
    isNameOrEmail: PropTypes.bool,
    firstRule: PropTypes.bool,
    thirdRule: PropTypes.bool,
    strength: PropTypes.any

};

const defaultProps = {
    passwordForm: (<Text>Login Form</Text>),
    onHandlePassword: () => {},
    isNameOrEmail: false,
    firstRule: true,
    thirdRule: true,
    strength: ""
};

class Password extends Component<{}> {

    render() {
        const {language} = this.props
        return (
            <View style={styles.appContainer}>
                <Toolbar
                    title={Config.APP_TYPE === "corporate" ? "HAIS" : ""}
                    iconmooOn={Config.APP_TYPE === "corporate" ? "" : ProfileIcons.iconMooOn} />
                <View style={styles.loginWrapper}>
                    {this.props.passwordForm}
                    <Text style={styles.passwordStrength}>Password Strength : {this.props.strength}</Text>
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
                        title="Submit"
                        backgroundColor="#ed1c24"
                        borderRadius={4}
                        containerViewStyle={styles.loginButtonStyle}
                        textStyle={styles.loginTextStyle}
                        onPress={this.props.onHandlePassword} />
                </View>
            </View>
        );
    }
}

Password.defaultProps = defaultProps;

Password.propTypes = propTypes;

export default Password;
