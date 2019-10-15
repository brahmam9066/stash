import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, TouchableOpacity, Modal, Dimensions} from "react-native";

import LinkButton from "../LinkButton";
import styles from "./styles";

const propTypes = {
    showModal: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    buttonCancelText: PropTypes.string,
    buttonOkText: PropTypes.string,
    onPressCancel: PropTypes.func,
    onPressOk: PropTypes.func,
    showCancel: PropTypes.bool,
    showOk: PropTypes.bool
};

const defaultProps = {
    showModal: false,
    title: "",
    content: "",
    buttonCancelText: "Cancel",
    buttonOkText: "Ok",
    onPressCancel: () => {},
    onPressOk: () => {},
    showCancel: true,
    showOk: true
};

class ModalSmall extends Component<{}> {

    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.showModal}
                    onRequestClose={() => {
                        console.log("Modal has been closed.");
                    }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalWrapper}>
                            <Text style={styles.modalTitle}>{this.props.title}</Text>
                            <Text style={styles.modalContent}>{this.props.content}</Text>
                            <View style={styles.buttonCont}>
                                {
                                    this.props.showCancel ? <LinkButton title={this.props.buttonCancelText} onPress={this.props.onPressCancel} textStyle={styles.cancelButton} /> : null
                                }
                                {
                                    this.props.showOk ? <LinkButton title={this.props.buttonOkText} onPress={this.props.onPressOk} textStyle={styles.agreeButton} /> : null
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

ModalSmall.defaultProps = defaultProps;

ModalSmall.propTypes = propTypes;

export default ModalSmall;
