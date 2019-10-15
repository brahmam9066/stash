const initialState = {
    imageObjects: [],
    images: []
};

export default (state = initialState, action) => {

    switch (action.type) {
    case "SET_IMAGE_OBJECTS":
        return {
            ...state,
            imageObjects: action.payload
        };
    case "RESET_IMAGE_OBJECTS":
        return {
            ...state,
            imageObjects: []
        };
    case "SET_IMAGES":
        return {
            ...state,
            images: action.payload
        };
    case "RESET_IMAGES":
        return {
            ...state,
            images: []
        };
    default:
        return state;
    }
};
