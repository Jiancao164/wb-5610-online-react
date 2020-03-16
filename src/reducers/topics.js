
// const topics = [
//     {_id: "123", title: "Lesson 123"},
//     {_id: "234", title: "Lesson 234"},
//     {_id: "345", title: "Lesson 345"},
//     {_id: "456", title: "Lesson 456"}
// ]

// ===> (State A)

const topicReducer = (state = {topics: []}, action) => {
    switch (action.type) {
        case 'CREATE_TOPIC':
            return {
                topics: [
                    ...state.topics,
                    action.topic
                ]
            }
            break;
        case 'DELETE_TOPIC':
            return {
                topics: state.topics.filter(
                    topic => topic._id !== action.topicId)
            }
            break;
        case 'UPDATE_TOPIC':
            return {
                topics: state.topics.map(topic =>
                    topic._id === action.topicId ? action.topic : topic
                )
            }
            break;
        case 'FIND_TOPICS_FOR_LESSON':
            return {
                topics: action.topics
            }
        case 'FIND_ALL_TOPICS':
            return {
                topics: action.topics
            }
        default:
            return state
    }
}

export default topicReducer
