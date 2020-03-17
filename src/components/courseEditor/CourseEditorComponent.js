import React from "react";
import ModuleList from "./ModuleListComponent";
import LessonTabs from "./LessonTabs";
import {Link} from "react-router-dom";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import modules from '../../reducers/modules'
import lessons from '../../reducers/lessons'
import widgets from '../../reducers/widgetReducer'
import ModuleListContainer from "../../containers/ModuleListContaner";
import WidgetList from "./WidgetList";
import TopicPills from "./TopicPills";
import topics from "../../reducers/topics";

const reducers = combineReducers({
    modules, lessons, widgets, topics
})

const store = createStore(reducers)

const CourseEditorComponent = ({hideEditor, match, courseId, moduleId, lessonId, topicId, widgetId, history}) =>
    <Provider store={store}>
        <div>
            <button onClick={() => {
                history.push("/")
            }}>
                Close
            </button>
            <Link to="/">
                Back
            </Link>
            <h3>Course Editor {courseId}</h3>
            <div className="row">
                <div className="col-3">
                    <ModuleListContainer
                        moduleId={moduleId}
                        history={history}
                        courseId={courseId}/>
                </div>
                <div className="col-9">
                    <LessonTabs
                        courseId={courseId}
                        history={history}
                        moduleId={moduleId}/>
                    <TopicPills
                        courseId={courseId}
                        history={history}
                        moduleId={moduleId}
                        lessonId={lessonId}
                    />
                    {console.log(topicId)}
                    {topicId &&
                    <WidgetList
                        courseId={courseId}
                        history={history}
                        moduleId={moduleId}
                        lessonId={lessonId}
                        topicId={topicId}
                        widgetId={widgetId}/>}

                </div>
            </div>
        </div>
    </Provider>
export default CourseEditorComponent
