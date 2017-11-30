import React, { Component } from 'react';

class MapMessages extends Component {
  render() {
    const messagesObj = this.props.messagesObj
    const messageKeys = Object.keys(messagesObj)
    const mappedMessages = messageKeys.map( (id) => {
      const message = messagesObj[id]
      return (
        <div className="event" key={id}>
          <div className="content">
            <div className="content">
              <div className="summary">
                {message["name"]}
                <div className="date">
                  On {message["date"]} At {message["time"]}
                </div>
              </div>
              <div className="extra text">
                {message["message"]}
              </div>

            </div>
          </div>
        </div>
      )
    })

    return mappedMessages
    }
  }


export default MapMessages;
