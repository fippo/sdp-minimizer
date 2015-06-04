var test = require('tape');
var min = require('../');
var expanded = {
  type: 'offer',
  sdp: 'v=0\r\no=- 5498186869896684180 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na'
    + '=msid-semantic: WMS\r\nm=application 9 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0'
    + '.0\r\na=mid:data\r\na=sctpmap:5000 webrtc-datachannel 1024\r\na=setup:a'
    + 'ctpass\r\na=ice-ufrag:tCjVOmVGpVZjCem/\r\na=ice-pwd:dOU77RWjJ8qQNb5OTz6'
    + 'D+U7h\r\na=fingerprint:sha-256 C2:AE:C3:9B:C2:BE:7E:C2:9B:17:45:C2:A7:C'
    + '2:A5:54:40:C2:A8:66:19:11:5C:C3:B2:34:C3:88:0A:C2:B9:C2:85:32:70:09:2E:'
    + 'C2:A9:C2:91:C2:A2:C2:82:C3:A8:71\r\na=candidate:0 1 udp 1 0.0.0.0  typ '
    + 'host\r\n'
};
var compact = 'O,tCjVOmVGpVZjCem/,dOU77RWjJ8qQNb5OTz6D+U7h,wq7Dm8K+fsKbF0XCp8K'
  + 'lVEDCqGYZEVzDsjTDiArCucKFMnAJLsKpwpHCosKCw6hx';

test('minimize', function (t) {
  t.plan(2);
  t.deepEqual(min.expand(compact), expanded, 'expand');
  t.deepEqual(min.reduce(expanded), compact, 'reduce');
});
