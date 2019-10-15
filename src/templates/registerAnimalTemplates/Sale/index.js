import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import {Button} from "react-native-elements";

import Toolbar from "../../../components/Toolbar";

import styles from "./styles";

const propTypes = {
    onbackPress: PropTypes.func,
    toolbarTitle: PropTypes.string,
    recordObservationForm: PropTypes.element,
    clinicalFindingsForm: PropTypes.element,
    handleNextPress: PropTypes.func
};

const defaultProps = {
    onbackPress: () => {},
    toolbarTitle: "",
    recordObservationForm: <Text>Sale Form</Text>,
    handleNextPress: () => {}
};

class Sale extends Component<{}> {

    render() {
        return (
            <View style={styles.flex1}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={this.props.onbackPress}
                    title={this.props.toolbarTitle} />
                <View style={[styles.flex1, styles.bodyContent]}>
                    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                                <Text style={[styles.h6, styles.paddingHorizontal]}>Search</Text>
                                {this.props.saleRecordForm}
                                <Button
                                    raised
                                    title="Submit"
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

Sale.defaultProps = defaultProps;

Sale.propTypes = propTypes;

export default Sale;
