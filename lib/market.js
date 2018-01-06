'use strict';

const WebSocket = require('ws');
const request = require('request');
const cheerio = require('cheerio');

function Market(apis) {
	this.apis = apis;
	this.log = false;
}

Market.prototype.utlis = {

	jsonToQueryString : json => {

		if(!json) {
			return '';
		}

		return '?' + Object.keys(json)
			.map(key => json[key] ? `${key}=${json[key]}` : '')
			.filter(v => v).join('&');
		
	},
}

Market.prototype.buildUri = function(endpoint, key) {

	if (!this.apis['default']) {
		throw 'Not default api'
	}

	const api = this.apis[key] || this.apis['default'];

	return `${api}/${endpoint}`;
}   

Market.prototype.table = function(uri, selector, jsonQs) {

	uri = uri + this.utlis.jsonToQueryString(jsonQs);

	if(this.log) {
		 console.log(uri); 
	}

	return new Promise((res, rej) => 

		request(uri, (error, response, body) => {

			if(error) {

				rej(error);
				
			} else {

				const $ = cheerio.load(body, { ignoreWhitespace: true });
				
				const $rows = $(`table${selector} tbody tr`);

				const table = $rows.map((i, e) => [$(e).text().trim().split(/\s\s+/g)]).get();

				res(table);
			}
		})
	);
}                          

Market.prototype.requestGet = function(endpoint, options) {

	const uri = this.buildUri(endpoint);

	if(this.log) {
		console.log(uri); 
   	}

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

	if(this.log) {
		console.log(uri); 
   	}

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

Market.prototype.socket = function() {

	let open = false;

	let messages = [];

	const ws = this.apis.ws ? new WebSocket(this.apis.ws) : this.apis.ws;

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