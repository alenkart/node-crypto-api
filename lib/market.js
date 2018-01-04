'use strict';

const WebSocket = require('ws');
const request = require('request');

function Market(restApi, webSocketApi) {
	this.restApi = restApi;
	this.webSocketApi = webSocketApi;
}

Market.prototype.utlis = {
	jsonToQueryString : (json) => {
		return json 
			? "?" + Object.keys(json).map(key => `${key}=${json[key]}`).join('&')
			: ""
	},
}

Market.prototype.requestGet = function(endpoint, options) {

	const uri = this.buildUri(endpoint);

	console.log('URI: ', uri);

	return new Promise((res, rej) =>  
		request(uri, options, (error, response, body) => {

			if(error) {
				rej({error, message: `Couldn't get ${this.name} data`});
			} else {
				res(JSON.parse(body));
			}
		})
	);
} 

Market.prototype.requestPost = function(endpoint, form, options) {

	const uri = this.buildUri(endpoint);

	console.log('URI: ', uri);

	return new Promise((res, rej) => 

		request.post(uri, options, (error, response, body) => {

			if(error) {
				rej({error, message: `Couldn't get ${this.name} data`});
			} else {
				res(JSON.parse(body));
			}

		}).form(form)

	)
}  

Market.prototype.buildUri = function(endpoint) {
	return `${this.restApi}/${endpoint}`;
}                                 

Market.prototype.socket = function() {

	let open = false;

	let messages = [];

	const ws = new WebSocket(this.webSocketApi);

	return {

		init : function () {
			ws.on('open', this.sendMessages.bind(this));
			ws.on('message', this.onMessage);
			return this;
		},

		onMessage : data => console.log(data),

		send : function (message) {

			const type = typeof message;

			if(type !== 'string' && type !== 'object') {
				throw 'Invalid message type';
			}

			const messageStr = type === 'string' 
				? message 
				: JSON.stringify(message);

			if(!open) {
				messages.push(messageStr);
				console.log(`Added message: ${messageStr}`);
			} else {
				ws.send(messageStr);
			}
		  	
		  	return this;
		},

		sendMessages : function () {
			open = true;
			messages.forEach(this.send);
		},
	}
}

module.exports = Market;