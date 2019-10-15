import React from "react";
import {View} from "react-native";
import styles from "./styles";

export default class ProgressiveLoader extends React.Component {
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <View style={[styles.loader, this.props.loaderStyle]}>
                    <View
                        style={{
                                backgroundColor: this.props.color ? this.props.color : "#ed1c24",
                                width: `${this.props.progress * 100}%`,
                                height: "100%"
                            }}
                    />
                </View>
            </View>
        );
    }
}