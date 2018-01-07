'use strict';

const url = require('url');
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

	parseTableRow : $row => [$row.text().trim().split(/\s\s+/g)]
}

Market.prototype.buildUri = function(endpoint, key) {

	if (!this.apis['default']) {
		throw 'Not default api'
	}

	const api = this.apis[key] || this.apis['default'];

	return url.resolve(api, endpoint);
}   

Market.prototype.table = function(uri, selector, jsonQs) {

	uri = uri + this.utlis.jsonToQueryString(jsonQs);

	if(this.log) {
		console.log('SCRAPPING', 'TABLE', uri); 
	}

	return new Promise((res, rej) => 

		request(uri, (error, response, body) => {

			if(error) {

				rej(error);
				
			} else {

				const $ = cheerio.load(body, { ignoreWhitespace: true });
				
				const $rows = $(`table${selector} tbody tr`);

				const table = $rows.map((i, e) => this.utlis.parseTableRow).get();

				res(table);
			}
		})
	);
}

Market.prototype.request = function(method, uri, options) {

	options.uri = uri;

	options.method = method;

	if(this.log) {
		console.log('REST', method, uri); 
   	}

	return new Promise((res, rej) =>  

		request(uri, options, (error, response, body) => {

			if(error) {
				console.log(error);
				rej({error, message: `Couldn't get ${this.name} data`});
			} else {
				res(JSON.parse(body));
			}
		})

	);

}                          

Market.prototype.requestGet = function(uri, jsonQs, options) {

	options = options || {};

	const queryString = this.utlis.jsonToQueryString(jsonQs);

	return this.request('GET', `${uri}${queryString}`, options);
} 

Market.prototype.requestPost = function(uri, form, options) {

	options = options || {};

	options.form = form;

	return this.request('POST', uri, options);
}  

Market.prototype.socket = function() {

	let open = false;

	let messages = [];

	const that = this;

	const ws = this.apis.ws ? new WebSocket(this.apis.ws) : this.apis.ws;

	return {

		init : function () {
			ws.on('open', this.sendMessages.bind(this));
			ws.on('message', this.onMessage);
			ws.on('onclose', this.onClose)
			return this;
		},

		onClose : data => console.log(),

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

				if(that.log) {
					console.log(`Added message: ${messageStr}`);
				} 
				
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