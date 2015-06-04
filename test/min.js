var test = require('tape');
var min = require('../');
var expanded = {
  type: 'offer',
  sdp: 'v=0\r\no=- 5498186869896684180 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na'
    + '=msid-semantic: WMS\r\nm=application 9 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0'
    + '.0\r\na=mid:data\r\na=sctpmap:5000 webrtc-datachannel 1024\r\na=setup:a'
    + 'ctpass\r\na=ice-ufrag:tCjVOmVGpVZjCem/\r\na=ice-pwd:dOU77RWjJ8qQNb5OTz6'
    + 'D+U7h\r\na=fingerprint:sha-256 AE:DB:BE:7E:9B:17:45:A7:A5:54:40:A8:66:1'
    + '9:11:5C:F2:34:C8:0A:B9:85:32:70:09:2E:A9:91:A2:82:E8:71\r\na=candidate:'
    + '0 1 udp 1 0.0.0.0  typ host\r\n'
};
var compact = 'O,tCjVOmVGpVZjCem/,dOU77RWjJ8qQNb5OTz6D+U7h,wq7Dm8K+fsKbF0XCp8K'
  + 'lVEDCqGYZEVzDsjTDiArCucKFMnAJLsKpwpHCosKCw6hx';

test('minimize', function (t) {
  t.plan(2);
  t.deepEqual(min.expand(compact), expanded, 'expand');
  t.deepEqual(min.reduce(expanded), compact, 'reduce');
});
