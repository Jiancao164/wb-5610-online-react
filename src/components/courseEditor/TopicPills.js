import React from 'react'

import {connect} from "react-redux";
import {TOPICS_API_URL, LESSONS_TOPICS_API_URL} from "../../common/constants";
import {updateTopic} from "../../services/TopicService";


class TopicPills extends React.Component {

    componentDidMount() {
        console.log(this.props.lessonId)
        this.props.findTopicsForLesson(this.props.lessonId)
        console.log(this.props.topics)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.lessonId !== prevProps.lessonId) {
            this.props.findTopicsForLesson(this.props.lessonId)
        }
    }


    state = {
        selectedTopicId: "qq",
        editingTopicId: '',
        topic: {
            title: '',
            _id: ''
        }
    }

    edit=(topic) => {
        const topicId = topic._id
        this.props.history.push(`/course-editor/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${topicId}`)
        this.setState({
            editingLessonId: topic._id
        })
    }

    select = (topic) => {
        const topicId = topic.id
        console.log(topic.id)
        this.props.history.push(`/course-editor/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${topicId}`)
        this.setState({
            selectedTopicId: topic._id
        })
    }

    // editing={lesson._id === this.state.editingLessonId}


    render() {
        return(
            <ul className="nav nav-tabs active">
                {
                    this.props.topics && this.props.topics.map(topic =>
                        <li className={`nav-item `}
                            onClick={() => {this.select(topic) } }
                            key={topic._id} >
                            {console.log(88)}
                            <a className={`nav-link ${console.log(this.state.selectedTopicId === topic._id)}
                                            ${(this.state.editingTopicId === topic._id || this.state.selectedTopicId === topic._id)?'active':''}`}>
                                {this.state.editingTopicId !== topic._id &&
                                <span>{topic.title}</span>}
                                {this.state.editingTopicId === topic._id &&
                                <input
                                    onChange={(e) => {
                                        const newTitle = e.target.value
                                        this.setState(prevState => ({
                                            topic: {
                                                ...prevState.topic,
                                                title: newTitle
                                            }
                                        }))
                                    }}
                                    value={this.state.topic.title}/>}
                                <button onClick={() =>
                                {
                                    this.props.updateTopic(this.state.topic)
                                        .then(() =>
                                            this.setState({
                                                editingTopicId: ''
                                            })
                                        )
                                }
                                }>
                                    Save
                                </button>
                                <button onClick={
                                    () => this.props.deleteTopic(topic._id)}>
                                    X
                                </button>
                                <button onClick={() => {
                                    this.setState({
                                        topic: topic,
                                        editingTopicId: topic._id
                                    })
                                }}>
                                    Edit
                                </button>
                            </a>
                        </li>)
                }
                <li className="nav-item">
                    <button onClick={() => this.props.addTopic(this.props.lessonId)}>+</button>
                </li>
            </ul>
        )
    }
}


const stateToPropertyMapper = (state) => ({
    topics: state.topics.topics
})

const dispatcherToPropertyMapper = (dispatcher) => ({
    findTopicsForLesson: lessonId =>
        fetch(LESSONS_TOPICS_API_URL(lessonId))
            .then(response => response.json())
            .then(topics => dispatcher({
                type: 'FIND_TOPICS_FOR_LESSON',
                topics: topics
            })),
    updateTopic: async (topic) => {
        const actualTopic = await updateTopic(topic)
        dispatcher({
            type: 'UPDATE_TOPIC',
            topic: actualTopic,
            topicId: actualTopic._id
        })
    },
    addTopic: (lessonId) =>
        fetch(LESSONS_TOPICS_API_URL(lessonId), {
            method: 'POST',
            body: JSON.stringify({title: 'New Topic', id: (new Date()).getSeconds()}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
            .then(actualTopic =>
                dispatcher({
                    type: 'CREATE_TOPIC',
                    topic: actualTopic
                })),
    deleteTopic: (topicId) =>
        fetch(`${TOPICS_API_URL}/${topicId}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(status =>
                dispatcher({
                    type: 'DELETE_TOPIC',
                    topicId: topicId
                })),
    findAllTopics: () =>
        fetch(TOPICS_API_URL)
            .then(response => response.json())
            .then(topics =>
                dispatcher({
                    type: 'FIND_ALL_TOPICS',
                    topics: topics
                })
            )
})

export default connect(
    stateToPropertyMapper,
    dispatcherToPropertyMapper
)(TopicPills)
