import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryScatter, VictoryLabel } from "victory-native";
import { Circle, G, Line } from "react-native-svg";
import {connect} from "react-redux";

import styles from "./styles";
import Toolbar from "../../../components/Toolbar";
import { navigateBack } from "../../../utils/utility";
import {getMilkReferenceChartAction} from "../../../actions/productionModule.action";
import authenticatedLayer from "../../authenticatedLayer";
import  I18n from "../../../utils/language.utils";

class CustomIndicator extends React.Component {

    render() {
        const { data, scale } = this.props;
        console.log(this.props);
        const radius = 4;

        return data.map((coords, index) =>
            <G
            // transform={`translate(${scale.x(coords._x) - radius}, ${scale.y(coords._y) - radius})`}
            >
                {
                    data[index - 1]
                        ? <Line
                            x1={scale.x(data[index - 1]._x)}
                            y1={scale.y(data[index - 1]._y)}
                            x2={scale.x(coords._x)}
                            y2={scale.y(coords._y)}
                            style={{ stroke: "grey", strokeWidth: 2 }}
                        />
                        : null
                }
                <Circle
                    cx={scale.x(coords._x)}
                    cy={scale.y(coords._y)}
                    r={radius}
                    fill="red"
                />
            </G>
        )
    }
}

const data = [
    // {days: 0, yield: 0},
    { days: 10, yield: 9.6 },
    { days: 20, yield: 9 },
    { days: 30, yield: 8.2 },
    { days: 50, yield: 8 },
    { days: 60, yield: 9 },
    { days: 80, yield: 10.5 },
    { days: 90, yield: 11 },
    { days: 110, yield: 11.3 },
    { days: 120, yield: 10 },
    { days: 140, yield: 11.8 },
    { days: 150, yield: 10 },
    { days: 170, yield: 12.8 },
    { days: 180, yield: 14 },
    { days: 200, yield: 13.1 },
    { days: 210, yield: 12 },
    { days: 230, yield: 15.4 },
    { days: 240, yield: 15 },
    { days: 260, yield: 12 },
    { days: 270, yield: 10 },
    { days: 290, yield: 11 },
    { days: 300, yield: 12 }
];

const data1 = [
    // {days: 0, yield: 0},
    { days: 10, yield: 1 },
    { days: 20, yield: 2 },
    { days: 30, yield: 3 },
    { days: 50, yield: 4.5 },
    { days: 60, yield: 5 },
    { days: 80, yield: 6 },
    { days: 90, yield: 7 },
    { days: 110, yield: 7.5 },
    { days: 120, yield: 8 },
    { days: 140, yield: 9.1 },
    { days: 150, yield: 12 },
    { days: 170, yield: 12.8 },
    { days: 180, yield: 12 },
    { days: 200, yield: 14 },
    { days: 210, yield: 13 },
    { days: 230, yield: 12 },
    { days: 240, yield: 11 },
    { days: 260, yield: 10 },
    { days: 270, yield: 9 },
    { days: 290, yield: 8 },
    { days: 300, yield: 7 }
];

class LactationGraph extends Component {

    componentDidMount(){
        this.props.handleGetMilkReferenceChartAction(this.props.token);
    }

    getMax = (dataList, key) => (key ? Math.max(...dataList.map(innerData => innerData[key])) : Math.max(...dataList));

    getMin = (dataList, key) => Math.min(...dataList.map(innerData => innerData[key]));

    render() {

        const height = 400;
        const width = 500;
        const {language} = this.props

        return (
            <View style={styles.container}>
                <Toolbar
                    leftIconName="arrow-left"
                    onPressLeftIcon={() => { navigateBack(); }}
                    title= {I18n.t('lactationgraph', {locale:language})}
                    />
                <ScrollView horizontal>
                    <View pointerEvents="none">
                        <VictoryChart
                            height={height}
                            width={width}
                        >
                            <VictoryAxis
                                crossAxis={false}
                                style={{
                                    axis: { stroke: "grey" },
                                    grid: {
                                        stroke: t => ((t === 120 || t === 240 || t === 330) ? "grey" : "#dddddd"),
                                        strokeDasharray: t => ((t === 120 || t === 240) ? "4" : null)
                                    },
                                    tickLabels: {
                                        fontSize: 10,
                                        angle: -60
                                    },
                                    axisLabel: {
                                        fontSize: 10
                                    }
                                }}
                                tickValues={[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]}
                                label= {I18n.t('days', {locale:language})}
                                standalone={false}
                            />
                            <VictoryAxis
                                theme={VictoryTheme.material}
                                dependentAxis
                                domain={{ y: [0, Math.floor(Math.max(this.getMax(data, "yield"), this.getMax(data1, "yield"))) + 3] }}
                                tickCount={10}
                                label= {I18n.t('milkcollectedinliters', {locale:language})}
                                style={{
                                    axis: { stroke: "grey" },
                                    tickLabels: {
                                        fontSize: 10
                                    },
                                    grid: {
                                        stroke: t => ((t === Math.floor(Math.max(this.getMax(data, "yield"), this.getMax(data1, "yield"))) + 3 || t === 0) ? "grey" : "#dddddd")
                                    },
                                    axisLabel: {
                                        fontSize: 10
                                    }
                                }}
                                standalone={false}
                            />
                            <VictoryLabel
                                text= {I18n.t('earlyLactation', {locale:language})}
                                style={styles.labelStyle}
                                x={0.24 * width}
                                y={60}
                            />
                            <VictoryLabel
                                text= {I18n.t('midLactation', {locale:language})}
                                style={styles.labelStyle}
                                x={0.54 * width}
                                y={60}
                            />
                            <VictoryLabel
                                text= {I18n.t('lateLactation', {locale:language})}
                                style={styles.labelStyle}
                                x={0.79 * width}
                                y={60}
                            />
                            <VictoryLine
                                style={{
                                    data: { stroke: "#cccccc" }
                                }}
                                x="days"
                                y="yield"
                                data={data}
                            // interpolation="natural"
                            // dataComponent={<CustomIndicator />}
                            />
                            <VictoryScatter
                                style={{
                                    data: { fill: "#c43a31" },
                                    labels: { fill: "#444444", fontSize: 8 }
                                }}
                                size={2}
                                data={data}
                                x="days"
                                y="yield"
                                labels={datum => datum.yield}
                            />
                            <VictoryLine
                                style={{
                                    data: { stroke: "#cccccc" }
                                }}
                                x="days"
                                y="yield"
                                data={data1}
                            // interpolation="natural"
                            // dataComponent={<CustomIndicator />}
                            />
                            <VictoryScatter
                                style={{
                                    data: { fill: "#c43a31" },
                                    labels: { fill: "#444444", fontSize: 8 }
                                }}
                                size={2}
                                data={data1}
                                x="days"
                                y="yield"
                                labels={datum => datum.yield}
                            />
                        </VictoryChart>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    token: state.authReducer.token,
    milkReferenceChart: state.productionReducer.milkReferenceChart,
    language: state.localeReducer.language
});

const mapDispatchToProps = dispatch => ({
    handleGetMilkReferenceChartAction: (token) => dispatch(getMilkReferenceChartAction(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(authenticatedLayer(LactationGraph));
