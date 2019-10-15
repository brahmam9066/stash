
import {connect} from "react-redux";
import {compose} from "redux";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text} from "react-native";
import {reduxForm, Field} from "redux-form";

import InputText from "../../../components/InputText";
import ChangePassword from "../../../templates/authentication/ChangePasswordTemplate";
import {navigateTo} from "../../../utils/utility";
import {changePasswordAction} from "../../../actions/auth.actions";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    token: PropTypes.string,
    handleSubmit: PropTypes.func,
    handlechangePassword: PropTypes.func,
    reset: PropTypes.func
};

const defaultProps = {
    token: "",
    handleSubmit: () => {},
    handlechangePassword: () => {},
    reset: () => {}
};

class ChangePasswordContainer extends Component {

    state = {
        showModal: false,
        strength: null,
        firstRule: false,
        thirdRule: false,
        fourthRule: false,
        fifthRule: false
    };

    onSubmit = (values) => {
        const payload = {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
        };
        this.props.handlechangePassword(payload, this.props.token).then((data) => {
            this.modalToggle();
        });
    }

    handleOnPressOk = () => {
        this.modalToggle();
        navigateTo("dashboard");
        this.props.reset();
    }

    modalToggle = () => {
        this.setState(prevState => ({showModal: !prevState.showModal}));
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, labelStyle, label, secureTextEntry, isPasswordType, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
                    labelStyle={labelStyle}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    isPasswordType={isPasswordType}
                    label={label}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderLoginForm = () => {
        const {language} = this.props
        return (
            <View>
                <Field
                    name="currentPassword"
                    label= {I18n.t('currentPassword', {locale:language})}
                    secureTextEntry={true}
                    isPasswordType={true}
                    component={this.renderTextInput} />
                <Field
                    name="newPassword"
                    label= {I18n.t('newPassword', {locale:language})}
                    isPasswordType={true}
                    secureTextEntry={true}
                    onChange={data => {this.checkPasswordStrength(data)}}
                    component={this.renderTextInput} />
                <Field
                    name="confirmPassword"
                    label= {I18n.t('confirmPassword', {locale:language})}
                    secureTextEntry={true}
                    isPasswordType={true}
                    labelStyle={styles.confirmLabelStyle}
                    component={this.renderTextInput} />
            </View>);
    }

    onbackPress = () => {
        this.props.reset();
        navigateTo("dashboard");
    }

    checkPasswordStrength = (value) => {
        const { username } = this.props;
        const password = value ? value.toLowerCase() : ""
        //this.checkForNameOrEmail(value);
        // if(this.state.firstRule == true && this.state.thirdRule == true){
        //     this.setState({
        //         strength: <Text style={{color:"green"}}>Good</Text>
        //     })
        // } else if(this.state.firstRule == true || this.state.thirdRule == true){
        //     this.setState({
        //     strength: <Text style={{color:"orange"}}>Medium</Text>
        //     })
        // } else {
        //     this.setState({
        //         strength: <Text style={{color:"red"}}>Low</Text>
        //         })
        // }
        // if(password.length < 8 ) {
        //     this.setState({
        //         firstRule: true})

        // } else{
        //     this.setState({
        //         firstRule: false
        //     })
        // }
        // if(/^(?=.*[0-9]).{2,}$/g.test(value.trim()) && /^(?=.*[!@#\$%\^&\`~\<>\,.\;:\?|\=+\-_\()\{}\'"\*]).{2,}$/g.test(value.trim()) && /^(?=.*[A-Z]).{2,}$/g.test(value.trim())) {
        //     this.setState({
        //         thirdRule: true})
        // } else {
        //     this.setState({
        //         thirdRule: false
        //     })
        // }

        if (value.trim().length >= 8 && this.state.firstRule && this.state.thirdRule && this.state.fourthRule && this.state.fifthRule) {
            this.setState({
                strength: <Text style={{ color: "green" }}>Strong</Text>
            })
        }
        if (/^(?=.*[A-Z]).{0,}$/g.test(value.trim())) {
            this.setState({
                fifthRule: true,
                strength: <Text style={{ color: "orange" }}>Medium</Text>
            })
            if (value.trim().length >= 8 && this.state.thirdRule && this.state.fifthRule && this.state.fourthRule && this.state.firstRule) {
                this.setState({
                    strength: <Text style={{ color: "green" }}>Strong</Text>
                })
            }
        }
        else if (this.state.firstRule) {
            this.setState({
                fifthRule: false,
                strength: <Text style={{ color: "orange" }}>Medium</Text>
            })
        }
        else {
            this.setState({
                fifthRule: false,
                strength: <Text style={{ color: "red" }}>Low</Text>
            })
        }

        if (value.trim().length >= 8 && this.state.firstRule && this.state.thirdRule && this.state.fourthRule && this.state.fifthRule) {
            this.setState({
                strength: <Text style={{ color: "green" }}>Strong</Text>
            })
        }
        if (/^(?=.*[0-9]).{1,}$/g.test(value.trim())) {
            this.setState({
                thirdRule: true,
                strength: <Text style={{ color: "orange" }}>Medium</Text>
            })
            if (value.trim().length >= 8 && this.state.thirdRule && this.state.fifthRule && this.state.fourthRule && this.state.firstRule) {
                this.setState({
                    strength: <Text style={{ color: "green" }}>Strong</Text>
                })
            }
        }
        else if (this.state.firstRule) {
            this.setState({
                thirdRule: false,
                strength: <Text style={{ color: "orange" }}>Medium</Text>
            })
        }
        else {
            this.setState({
                thirdRule: false,
                strength: <Text style={{ color: "red" }}>Low</Text>
            })
        }

        if (value.trim().length >= 8 && this.state.firstRule && this.state.thirdRule && this.state.fourthRule && this.state.fifthRule) {
            this.setState({
                strength: <Text style={{ color: "green" }}>Strong</Text>
            })
        }
        if (/^(?=.*[!@#\$%\^&\`~\<>\,.\;:\?|\=+\-_\()\{}\'"\*]).{0,}$/g.test(value.trim())) {
            this.setState({
                fourthRule: true,
                strength: <Text style={{ color: "red" }}>Low</Text>
            })
            if (value.trim().length >= 8) {
                this.setState({
                    fourthRule: true,
                    strength: <Text style={{ color: "green" }}>Strong</Text>
                })
            }
        }
        else if (this.state.firstRule) {
            this.setState({
                fourthRule: false,
                strength: <Text style={{ color: "orange" }}>Medium</Text>
            })
        }
        else {
            this.setState({
                fourthRule: false,
                strength: <Text style={{ color: "red" }}>Low</Text>
            })
        }

        if (value.trim().length >= 8 && this.state.firstRule && this.state.thirdRule && this.state.fourthRule && this.state.fifthRule) {
            this.setState({
                firstRule: true,
                thirdRule: true,
                fourthRule: true,
                fifthRule: true,
                strength: <Text style={{ color: "green" }}>Strong</Text>
            })
        }
        if (password.length >= 8) {
            this.setState({
                firstRule: true,
                strength: <Text style={{ color: "orange" }}>Medium</Text>
            })

           // if(value.trim().length >= 8 ){
            this.setState({
                // firstRule: true,
                strength: <Text style={{ color: "green" }}>Strong</Text>
            })
            // }
        } else if (this.state.thirdRule) {
            this.setState({
                firstRule: false,
                strength: <Text style={{ color: "orange" }}>Medium</Text>
            })
        } else {
            this.setState({
                firstRule: false,
                strength: <Text style={{ color: "red" }}>Low</Text>
            })
        }
        //     // else if(this.state.firstRule || this.state.thirdRule){
        //     this.setState({
        //         strength: <Text style={{color:"yellow"}}>Medium</Text>
        //     })
        // }
        // else {
        //     this.setState({
        //         strength: <Text style={{color:"red"}}>Low</Text>
        //     })
        // }

    }

    render() {
        const {handleSubmit,language} = this.props;
        return (
            <View style={styles.appContainer}>
                <ChangePassword
                    loginForm={this.renderLoginForm()}
                    onLogin={handleSubmit(this.onSubmit)}
                    onbackPress={this.onbackPress}
                    showModal={this.state.showModal}
                    onPressOk={this.handleOnPressOk}
                    isNameOrEmail={this.state.isNameOrEmail}
                    firstRule={this.state.firstRule}
                    thirdRule={this.state.thirdRule}
                    fourthRule={this.state.fourthRule}
                    fifthRule={this.state.fifthRule}
                    strength={this.state.strength}
                    language={language}
                />
            </View>
        );
    }
}

const validate = (values) => {
    const errors = {};
    if (!values.newPassword) {
        errors.newPassword = "Password is required";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.newPassword) {
        errors.confirmPassword = "Confirm Password is not correct";
    }
    return errors;
};

ChangePasswordContainer.propTypes = propTypes;

ChangePasswordContainer.defaultProps = defaultProps;

const mapStateToProps = state => ({
    token: state.authReducer.token,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handlechangePassword: (payload, token) => dispatch(changePasswordAction(payload, token))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "createPassword", validate})
)(ChangePasswordContainer);


