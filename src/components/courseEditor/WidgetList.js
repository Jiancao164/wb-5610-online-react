import React from "react";
import {connect} from "react-redux";
import HeadingWidget from "./widgets/HeadingWidget";
import ParagraphWidget from "./widgets/PararagraphWidget";
import {
    findAllWidgets,
    createWidget,
    deleteWidget,
    updateWidget,
    findWidgetsForTopic
} from "../../services/WidgetService";

class WidgetList extends React.Component {
    state = {
        editingWidgetId: '',
        widget: {
            id: ''
        },
        widgetType: ""
    }
    componentDidMount() {
        this.props.findWidgetsForTopic(this.props.topicId);
        // this.props.findAllWidgets();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topicId !== this.props.topicId) {
            this.props.findWidgetsForTopic(this.props.topicId);
        }
    }

    changeWidgetType = (type) => {

        this.setState({
            widgetType: type

        })
        console.log(this.state.widgetType)
    }

    saveWidget = (widgetId, widget) => {
        this.setState({
            editingWidgetId: ''
        })
        {console.log(this.state.editingWidgetId)}
        this.props.updateWidget(widgetId, widget)
    }

    render(){
        return(
            <div>

            <div>
                {this.props.widgets && this.props.widgets.map(widget =>
                        <div key={widget.id}>
                            {widget.type === "HEADING" &&
                            <HeadingWidget
                                updateWidget = {this.updateWidget}
                                saveWidget={this.saveWidget}
                                editingWidgetId = {this.state.editingWidgetId}
                                editing={this.state.editingWidgetId === widget.id}
                                deleteWidget={this.props.deleteWidget}
                                {...this.props}
                                widget={widget}/>}
                            {widget.type === "PARAGRAPH" &&
                            <ParagraphWidget
                                updateWidget={this.updateWidget}
                                saveWidget={this.saveWidget}
                                editingWidgetId = {this.state.editingWidgetId}
                                editing={this.state.editingWidgetId === widget.id}
                                deleteWidget={this.props.deleteWidget}
                                {...this.props}
                                widget={widget}/>}
                            <span>
                                {   this.state.editingWidgetId !== widget.id &&
                                    <button onClick={
                                        () => this.setState({
                                        editingWidgetId: widget.id,
                                        widget: widget
                                    })}>
                                        Edit
                                    </button>
                                }
                            </span>
                        </div>
                    )
                }
                <div>
                    <i onClick={
                        () =>
                            this.props.createWidget(this.props.topicId)}
                       className="fas fa-plus-circle fa-2x float-right"/>
                    <br/>

                </div>
            </div>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    widgets: state.widgets.widgets
})

const dispatchToPropertyMapper = (dispatcher) => ({
    findWidgetsForTopic: (topicId) =>
        findWidgetsForTopic(topicId)
            .then(widgets => dispatcher({
                type: "WIDGET_FOR_TOPIC",
                widgets: widgets
            })),
    updateWidget: (widgetId, newWidget) =>
        updateWidget(widgetId, newWidget)
            .then(status => dispatcher({
                type: "UPDATE_WIDGET",
                widget: newWidget
            })),
    deleteWidget: (widgetId) =>
        deleteWidget(widgetId)
            .then(status => dispatcher({
                type: 'DELETE_WIDGET',
                widgetId: widgetId
            })),
    createWidget: (topicId) =>
        createWidget(topicId, {
            title: "New Widget",
            type: "HEADING",
            topicId: topicId,
            id: (new Date()).getTime() + ""
        }).then(actualWidget => dispatcher({
                type: "ADD_WIDGET",
                widget: actualWidget
            })),
    findAllWidgets: () =>
        findAllWidgets()
            .then(actualWidgets => dispatcher({
                type: "FIND_ALL_WIDGETS",
                widgets: actualWidgets
            }))
})

export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(WidgetList)
