const initialState = {
    parseText: {
        type: 'PARSE_TEXT',
        text: ''
    },
    otherText: {
        type: 'OTHER_TEXT',
        text: ''
    }
}

const funcReducer = (state = initialState, action) => {
    switch(action.type){
        case 'PARSE_TEXT':
            return {...state, parseText:{...state.parseText, text: action.text}}
        case 'OTHER_TEXT':
            return {...state, otherText:{...state.otherText, text: action.text}}
        default:
            return state;
    }
}

export default funcReducer;