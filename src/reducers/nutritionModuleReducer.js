const initialState = {
    nutritionFeedPlan: [],
    nutritionLogResponse: {},
    nutritionList: [],
    nutritionDetails: {}
};

export default (state = initialState, action) => {
    const myModel = [];
    let payload;
    switch (action.type) {
        case "GET_NUTRITION_CLASSIFICATIONS":
            payload = action.payload;
            if (payload !== undefined || payload !== null) {
                let i;
                for (i = 0; i < payload.length; i++) {
                    const item = payload[i];
                    const clf = {};
                    clf.id = item.id;
                    clf.name = item.name;
                    clf.feedList = {};
                    clf.feedList.feeds = item.feeds;
                    clf.feedList.qty = "";
                    clf.feedList.cost = "";
                    clf.feedList.widgetId = `${item.id}_${i}`;
                    clf.feedList.selectedFeed = "";
                    myModel.push(clf);
                }
            }
            return {
                ...state,
                nutritionFeedPlan: myModel
            };
        case "CLEAR_NUTRITION_CLASSIFICATIONS":
            return {
                ...state,
                nutritionFeedPlan: []
            };
        case "LOG_NUTRITION":
            return {
                ...state,
                nutritionLogResponse: action.payload
            };
        case "SET_NUTRITION_LIST":
            return {

                ...state,
                nutritionList: [
                    ...state.nutritionList,
                    ...action.payload
                ]
            };
        case "EMPTY_NUTRITION_LIST":
            return {
                ...state,
                nutritionList: []
            };
        case "SET_NUTRITION_DETAILS":
            return {
                ...state,
                nutritionDetails: action.payload
            };
        default:
            return state;
    }

};
