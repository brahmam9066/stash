import PropTypes from "prop-types";
import React, {Component} from "react";
import {View, Text, TextInput, Image, DatePickerAndroid, TouchableOpacity} from "react-native";

import {CalendarIcons} from "../../assets";

import styles from "./styles";

const propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    label: PropTypes.string,
    returnKeyType: PropTypes.string,
    style: PropTypes.object,
    onChangeDate: PropTypes.func,
    onChangeText: PropTypes.func,
    maxDate: PropTypes.any,
    minDate: PropTypes.any,
    id: PropTypes.string,
    datePickerButtonId: PropTypes.string
};

const defaultProps = {
    value: "",
    placeholder: "",
    maxLength: 200,
    keyboardType: "default",
    secureTextEntry: false,
    returnKeyType: "next",
    label: "Label",
    style: {},
    onChangeDate: () => {},
    onChangeText: () => {},
    minDate: new Date("01-01-1970"),
    maxDate: new Date(new Date().setDate(new Date().getDate() + 365)),
    id: "",
    datePickerButtonId: ""
};

class DatePicker extends Component {

    mapElement = (node) => {
        this.datePicker = node;
    }

    openDatePicker = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(this.props.value),
                minDate: this.props.minDate,
                maxDate: this.props.maxDate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const selectedMonth = (`0${month + 1}`).slice(-2);
                const selectedDay = (`0${day}`).slice(-2);
                // this.props.onChangeDate(`${selectedDay}-${selectedMonth}-${year}`);
                this.props.onChangeDate(`${year}-${selectedMonth}-${selectedDay}`);
                this.datePicker.blur();
            } else if (action === DatePickerAndroid.dismissedAction) {
                this.datePicker.blur();
            }
        } catch ({code, message}) {
            console.log(message);
        }
    }

    render() {
        return (
            <View style={this.props.style}>
                <TouchableOpacity
                    onPress={this.props.disabled ? null : this.openDatePicker}
                    accessibilityLabel={this.props.datePickerButtonId}
                    testID={this.props.datePickerButtonId}
                >
                    <View>
                        <Text style={styles.labelText}>{this.props.label}</Text>
                        <TextInput
                            accessibilityLabel={this.props.id}
                            testID={this.props.id}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholderTextColor="rgba(51, 51, 51, 0.6)"
                            selectionColor="rgb(51, 51, 51)"
                            style={styles.inputComponentStyles}
                            ref={this.mapElement}
                            returnKeyType={this.props.returnKeyType}
                            placeholder={this.props.placeholder}
                            secureTextEntry={this.props.secureTextEntry}
                            keyboardType={this.props.keyboardType}
                            maxLength={this.props.maxLength}
                            value={this.props.value}
                            onChangeText={this.props.onChangeText} />
                        <View style={styles.dateOverlay} />
                    </View>
                    <View style={styles.calendarIconContainer}>
                        <Image style={styles.calendarIconStyle} source={CalendarIcons.iconCalendar} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

DatePicker.defaultProps = defaultProps;

DatePicker.propTypes = propTypes;

export default DatePicker;
