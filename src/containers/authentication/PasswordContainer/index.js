import {connect} from "react-redux";
import PropTypes from "prop-types";
import {compose} from "redux";
import React, {Component} from "react";
import {View, Text} from "react-native";
import {reduxForm, Field} from "redux-form";

import InputText from "../../../components/InputText";
import Password from "../../../templates/authentication/PasswordTemplate";
import {registerUser} from "../../../services/authenticate.service";
import {setUserLoggedInAction} from "../../../actions/auth.actions";
import  I18n from "../../../utils/language.utils";

import styles from "./styles";

const propTypes = {
    username: PropTypes.any
};

const defaultProps = {
    username: "vineet"
};

class PasswordContainer extends Component<{}> {

    state = {
        isNameOrEmail: false,
        isRegex: false,
        passwordFoucused: false,
        firstRule: false,
        thirdRule: false,
        strength: ""
    }

    onSubmit = (values) => {
        if (values && values.password) {
            const payload = {
                password: values.password,
                username: this.props.username
            };
            registerUser(payload, (data) => {
                if (data) {
                    this.props.setUserLoggedIn(data);
                }
            });
        }
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
            console.log("else [0-9] numbers thirdRule", this.state.thirdRule)

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


    checkForNameOrEmail = (value) => {
        const {username} = this.props;
        const password = value ? value.toLowerCase() : "";
        if (password.includes(username)) {
            this.setState({
                isNameOrEmail: true
            });
        } else {
            this.setState({
                isNameOrEmail: false
            });
        }
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, label, isPasswordType, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    onChangeText={(e) => {
                        this.checkPasswordStrength(e);
                        onChange(e);
                    }}
                    maxLength={maxLength}
                    isPasswordType={isPasswordType}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    {...restInput} />
                <Text style={styles.errorText}>{touched ? error : ""}</Text>
            </View>
        );
    }

    renderPasswordForm = () => {
        return (
            <View>
                <Field
                    name="password"
                    label="Password"
                    isPasswordType={true}
                    secureTextEntry={true}
                    component={this.renderTextInput} />
            </View>);
    }

    render() {
        console.log(this.state.isNameOrEmail);
        const {handleSubmit, language} = this.props;
        return (
            <View style={styles.appContainer}>
                <Password
                    passwordForm={this.renderPasswordForm()}
                    onHandlePassword={handleSubmit(this.onSubmit)}
                    isNameOrEmail={this.state.isNameOrEmail}
                    firstRule={this.state.firstRule}
                    thirdRule={this.state.thirdRule}
                    strength={this.state.strength}
                    language={language}
                     />
            </View>
        );
    }
}

PasswordContainer.defaultProps = defaultProps;

PasswordContainer.propTypes = propTypes;

const validate = (values) => {
    const errors = {};
    if (!values.password) {
        errors.password = "Password is required";
    }
    return errors;
};

const mapStateToProps = state => ({
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    setUserLoggedIn: payload => dispatch(setUserLoggedInAction(payload))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "password", validate})
)(PasswordContainer);
