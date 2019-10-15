import PropTypes from "prop-types";
import React, {Component} from "react";
import {connect} from "react-redux";
import {Text, View, Modal, TouchableOpacity, Image} from "react-native";

import {errorIcons} from "../../assets";

import styles from "./styles";

const propTypes = {
    errors: PropTypes.array,
    isServerError: PropTypes.bool,
    handleRemoveError: PropTypes.func
};

const defaultProps = {
    errors: [],
    isServerError: false,
    handleRemoveError: () => {}
};

class ErrorModalSmall extends Component<{}> {

    renderErrorMessages = () => {
        const {errors} = this.props;
        return errors.map((item, index) => {
            if (item.params && typeof item.params === "object" && Object.keys(item.params).length > 0) {
                return Object.keys(item.params).map((key, i) => {
                    return (
                        <Text key={i} style={styles.errorTextStyle}>
                            <Text style={styles.boldText}>{key[0].toUpperCase() + key.slice(1)}</Text>: {item.params[key][0].toUpperCase() + item.params[key].slice(1)}
                        </Text>
                    );
                });
            }
            if (item.detail) {
                return (<Text key={index} style={styles.errorTextStyle}>{item.detail}</Text>);
            }
            return (<Text key={index} style={styles.errorTextStyle}>{item.title}</Text>);
        });
    }

    closeErrorPopup = () => {
        this.props.handleRemoveError();
    }

    render() {
        if (this.props.isServerError) {
            return (
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={true}
                        onRequestClose={() => {
                            console.log("Modal has been closed.");
                        }}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalWrapper}>
                                <TouchableOpacity
                                    onPress={this.closeErrorPopup}
                                    style={styles.cancelIcon}>
                                    <Text style={styles.cancelIconText}>X</Text>
                                </TouchableOpacity>
                                <Image source={errorIcons.cloudIcon} style={styles.imageStyle} resizeMode="contain" />
                                <Text style={styles.modalTitle}>Something went wrong!</Text>
                                {this.renderErrorMessages()}
                            </View>
                        </View>
                    </Modal>
                </View>
            );
        }
        return (<View />);
    }
}

ErrorModalSmall.defaultProps = defaultProps;

ErrorModalSmall.propTypes = propTypes;

const mapStateToProps = state => ({
    errors: state.appReducer.errors,
    isServerError: state.appReducer.isServerError,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    handleRemoveError: () => dispatch({type: "REMOVE_ERROR"})
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModalSmall);
