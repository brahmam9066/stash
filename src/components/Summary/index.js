import React, {Component} from "react";
import moment from "moment";
import {View} from "react-native";
import PropTypes from "prop-types";
import SubTitle from "../SubTitle";
import SubText from "../SubText";
import "lodash";

import styles from "./styles";
import  I18n from "../../utils/language.utils";

const propTypes = {
    onPressEvent: PropTypes.func,
    selectedAnimalDetails: PropTypes.object
};

const defaultProps = {
    onPressEvent: () => {},
    selectedAnimalDetails: {}
};

class Summary extends Component {

    render() {
        const {selectedAnimalDetails, language} = this.props;
        const dob = selectedAnimalDetails.dob ? selectedAnimalDetails.dob : "";
        const years = moment().diff(dob, "years");
        const months = moment().diff(dob, "months");
        const age = dob !== "" ? `${years}y ${months % 12}m` : "";
        console.log(selectedAnimalDetails);
        const dateOfBirth = moment(dob).format("DD-MM-YYYY");
        return (
            <View style={styles.viewStyle}>
                <SubTitle
                    heading= {I18n.t('profileinformation', {locale:language})}
                    eventText= {I18n.t('viewmore', {locale:language})}
                    onPressEvent={this.props.onPressEvent}
                    subTitleStyle={styles.subTitleStyle}
                    titleStyle={styles.titlestyle}
                    eventTextStyle={styles.eventTextStyle}
                />
                <View style={styles.flexRowStyle}>
                    <SubText
                        text= {I18n.t('species', {locale:language})}
                        value={selectedAnimalDetails.species ? selectedAnimalDetails.species : ""}
                        textStyle={styles.textstyle}
                        labelStyle={styles.labelstyle}
                    />
                    <SubText
                        text= {I18n.t('breed', {locale:language})}
                        value={selectedAnimalDetails.breed ? selectedAnimalDetails.breed : ""}
                        textStyle={styles.textstyle}
                        labelStyle={styles.labelstyle}
                    />
                </View>
                <View style={styles.flexRowStyle}>
                    <SubText
                        text= {I18n.t('age', {locale:language})}
                        value={age}
                        textStyle={styles.textstyle}
                        labelStyle={styles.labelstyle}
                    />
                    <SubText
                        text= {I18n.t('dob', {locale:language})}
                        value={dateOfBirth}
                        textStyle={styles.textstyle}
                        labelStyle={styles.labelstyle}
                    />
                </View>
                <View style={styles.flexRowStyle}>
                    <SubText
                        text= {I18n.t('sireType', {locale:language})}
                        value={selectedAnimalDetails.father ? selectedAnimalDetails.father.breed : ""}
                        textStyle={styles.textstyle}
                        labelStyle={styles.labelstyle}
                    />
                    <SubText
                        text= {I18n.t('damType', {locale:language})}
                        value={selectedAnimalDetails.mother ? selectedAnimalDetails.mother.breed : ""}
                        textStyle={styles.textstyle}
                        labelStyle={styles.labelstyle}
                    />
                </View>
                <View style={styles.flexRowStyle}>
                    <SubText
                        text= {I18n.t('gender', {locale:language})}
                        value={selectedAnimalDetails.gender ? selectedAnimalDetails.gender[0].toUpperCase() + selectedAnimalDetails.gender.slice(1).toLowerCase() : ""}
                        textStyle={styles.textstyle}
                        labelStyle={styles.labelstyle}
                    />
                    <SubText
                        text= {I18n.t('status', {locale:language})}
                        value={selectedAnimalDetails.livestockState ? selectedAnimalDetails.livestockState[0].toUpperCase() + selectedAnimalDetails.livestockState.slice(1).toLowerCase() : ""}
                        textStyle={styles.textstyle}
                        labelStyle={styles.labelstyle}
                    />
                </View>
            </View>
        );
    }
}

Summary.propTypes = propTypes;

Summary.defaultProps = defaultProps;

export default Summary;
