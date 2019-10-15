import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View} from "react-native";

import styles from "./styles";

const propTypes = {
    breadcrumbPath: PropTypes.string,
    style: PropTypes.object
};

const defaultProps = {
    breadcrumbPath: "",
    style: {}
};

class Breadcrumb extends Component<{}> {

    renderBreadcrumb = () => {
        const {breadcrumbPath} = this.props;
        const format = /[/]/;
        let element = (<Text />);
        if (format.test(breadcrumbPath)) {

            const splitBreadcrumb = breadcrumbPath.split("/");
            const lastString = splitBreadcrumb.pop();

            element = (
                <View style={styles.row}>
                    <Text style={styles.breadcrumbStyle}>{splitBreadcrumb.join(" / ")}</Text>
                    <Text style={styles.breadcrumbActive}> / {lastString}</Text>
                </View>);

        } else if (breadcrumbPath !== "") {
            element = (<Text style={styles.breadcrumbStyle}>{breadcrumbPath}</Text>);
        }

        return element;
    }

    render() {
        return (
            <View style={[styles.breadcrumbContainer, this.props.style]}>
                {this.renderBreadcrumb()}
            </View>
        );
    }
}

Breadcrumb.defaultProps = defaultProps;

Breadcrumb.propTypes = propTypes;

export default Breadcrumb;
