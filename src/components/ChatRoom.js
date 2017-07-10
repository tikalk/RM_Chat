import React, { Component } from 'react';

const getParameterByName = (name, url) => {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

class ChatRoom extends Component {
	constructor(props){
		super(props);
		this.participants = [getParameterByName('par1'), getParameterByName('par2')]
		this.updateMessage = this.updateMessage.bind(this);
		this.submitMessage = this.submitMessage.bind(this);
		this.state = { message: '',
			messages: []}
		const db = firebase.database();

		const reviewsRef = db.ref('/chats');

		reviewsRef.on('child_added', (data) => {
			this.updateMessage({ target: {value: data.val()}});
			this.submitMessage();
			console.log("Chat data:", data.val());
		});
	}

	updateMessage(event){
		this.setState({
			message: event.target.value
		})

	}
	submitMessage(){

		const nextMessage = {
			id: this.state.messages.length,
			text: this.state.message
		}

		var list = Object.assign([], this.state.messages)
		list.push(nextMessage);
		this.setState({ messages: list });

	}
	render() {
		const currentMessage = this.state.messages.map((message) => <li key={message.id} >{message.text.message}</li>)
		return <div><ol>{currentMessage}</ol>
		<input type="text" onChange={this.updateMessage}/>
		<button onClick={this.submitMessage}>submit message</button></div>
	}
}

export default ChatRoom