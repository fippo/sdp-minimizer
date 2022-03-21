'use strict';

var b2a = typeof btoa === 'undefined' ? require('./b.js').btoa : btoa;
var a2b = typeof atob === 'undefined' ? require('./b.js').atob : atob;

exports.reduce = function(desc) {
		const lines = desc.sdp.split('\r\n');
		
		return [
			
			// Type
			['A', 'O'][ Number(desc.type === 'offer') ],
			
			// Fingerprint
			btoa(lines
				.find(function(l) { return l.indexOf('a=fingerprint') === 0; })
				.substr(22)
				.split(':')
				.map(function (h) { return String.fromCharCode(parseInt(h, 16)); })
				.join('')),
			
			// ICE Passwd
			lines
				.find(function(l) { return l.indexOf('a=ice-pwd') === 0; })
				.substr(10),
			
			// ICE UFrag
			lines
				.find(function(l) { return l.indexOf('a=ice-ufrag') === 0; })
				.substr(12)				
		]
		.concat(
		
			// Candidate IP + Port
			lines
				.filter(function(l) { return l.indexOf('a=candidate') === 0; })
				.slice(0, 1)
				.map(function(l) {
					return l
						.substr(12)
						.split(' ')
						.slice(4, 6)
						.join(' ');
				})
		)		
		.join(':');

};

exports.expand = function(str) {
		const comp = str.split(':');
		
		const lines = [
										'v=0',
										'o=- 5498186869896684180 2 IN IP4 127.0.0.1',
										's=-', 
										't=0 0', 
										'a=group:BUNDLE 0',	
										'a=msid-semantic: WMS',
										'a=extmap-allow-mixed',
										'm=application 9 UDP/DTLS/SCTP webrtc-datachannel',
										'c=IN IP4 0.0.0.0',			
									]
									.concat(
										comp.slice(4)
											.map(function(c) {
												return 'a=candidate:0 1 udp 1 ' + c + ' typ host generation 0 network-cost 999';
											})									
									)
									.concat(
										[
											
											'a=ice-ufrag:' + comp[3],
											'a=ice-pwd:' + comp[2],			
											'a=ice-options:trickle',
											'a=fingerprint:sha-256 ' + atob(comp[1])
												.split('')
												.map(function (c) { 
													return ('00' + c.charCodeAt(0).toString(16))
														.slice(-2)
														.toUpperCase(); 
												})
												.join(':'),
											'a=setup:' + ['actpass', 'active'][Number(comp[0] === 'A')],
											'a=mid:0',
											'a=sctp-port:5000',
											'a=max-message-size:262144',
											''
										]
									);
			
		return {
			type: ['offer', 'answer'][Number(comp[0] === 'A')],
			sdp: lines.join('\r\n')
		}

};
