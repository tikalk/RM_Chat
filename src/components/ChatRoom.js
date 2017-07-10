import React, { Component } from 'react';

class ChatRoom extends Component {
	constructor(props){
		super(props);
		this.updateMessage = this.updateMessage.bind(this);
		this.submitMessage = this.submitMessage.bind(this);
		this.state = { message: '',
			messages: []}
	}

	updateMessage(event){
		this.setState({
			message: event.target.value
		})

	}
	submitMessage(event){

		const nextMessage = {
			id: this.state.messages.length,
			text: this.state.message
		}

		var list = Object.assign([], this.state.messages)
		list.push(nextMessage);
		this.setState({ messages: list });

	}
	render() {
		const currentMessage = this.state.messages.map((message, i) => <li key={message.id} >{message.text}</li>)
		return <div><ol>{currentMessage}</ol>
		<input type="text" onChange={this.updateMessage}/>
		<button onClick={this.submitMessage} >submit message</button></div>
	}
}

export default ChatRoom