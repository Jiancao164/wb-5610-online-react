import React from "react";

class ParagraphWidget extends React.Component {
    state = {
        editing: this.props.editing,
        widget: this.props.widget,
        value: this.props.widget.type,
        preview: false,
        text: this.props.widget.text,
        textItems: []
    };

    changePreview = () => {
        this.setState({
            preview: this.state.preview === false
        })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.editing !== this.props.editing) {
            this.setState({
                editing: this.props.editing
            })
        }
    }

    render () {
        return(
            <div>
                {
                    !this.state.editing &&
                    <div>
                        {console.log(this.props.editingWidgetId)}
                        {<h4>{this.props.widget.title}</h4>}
                    </div>
                }
                {
                    this.state.editing &&
                    <div>
                        <div>
                            {this.state.preview && <i
                                onClick={this.changePreview}
                                className="fas fa-toggle-on float-right fa-2x">Preview</i>}
                            {!this.state.preview && <i
                                onClick={() => {this.changePreview();
                                    this.setState({
                                        textItems: this.state.text.split("\n")
                                    })}}
                                className="fas fa-toggle-off float-right fa-2x">Preview</i>}
                            <button onClick={() =>
                            {
                                console.log(this.props.editingWidgetId)
                                this.props.saveWidget(this.state.widget.id, this.state.widget)
                                console.log(this.props.editingWidgetId)
                            }}
                                    className={"float-right"}>save</button>
                            <br/>
                        </div>
                        <br/>

                        {!this.state.preview &&
                            <div>
                                <div className={"row"}>
                                    <div className={"col-9"}>
                                        <h3>Paragraph widget</h3>
                                    </div>
                                    <div className={"col-3 row float-right"}>
                                        <button><i className="fas fa-arrow-up"/></button>
                                        <button><i className="fas fa-arrow-down"/></button>
                                        <select id={"type"}
                                                onChange={(e) => {
                                                    const newType = e.target.value;
                                                    this.setState(prevState => {
                                                        prevState.widget.type = newType
                                                        return prevState
                                                    })
                                                    this.props.updateWidget(this.state.widget.id, this.state.widget);
                                                }}
                                                value={this.props.widget.type}
                                        >
                                            <option value="HEADING">Heading</option>
                                            <option value="PARAGRAPH">Paragraph</option>
                                            <option value="LIST">List</option>
                                            <option value="IMAGE">Image</option>
                                        </select>
                                        <i onClick={() => this.props.deleteWidget(this.props.widget.id)} className="fas fa-window-close fa-3x"/>
                                        <br/>
                                    </div>
                                </div>

                                <div>
                            <textarea className="form-control"
                                      placeholder={"Paragraph text"}
                                      onChange={(e) => {
                                          this.setState({
                                              text: e.target.value
                                          })
                                      }
                                      }
                                      value={this.state.text}
                                      aria-label="Text input with segmented dropdown button"/>
                                    <br/>


                                    <input
                                        type="text" className="form-control"
                                        placeholder={"Widget name"}
                                        aria-label="Text input with segmented dropdown button"

                                        onChange={(e) => {
                                            const newTitle = e.target.value;
                                            this.setState(prevState => {
                                                prevState.widget.title = newTitle;
                                                return prevState
                                            })
                                        }}
                                        value={this.state.widget.title}/>
                                </div>
                            </div>
                        }
                        {this.state.preview &&
                        <div>
                            {<h3>{this.state.widget.title}</h3>}
                            {
                                <ul>
                                    {this.state.textItems.map(item => (
                                        <li key={new Date().getTime() + item}>{item}</li>
                                    ))}
                                </ul>
                            }
                        </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default ParagraphWidget
