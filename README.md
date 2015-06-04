# How much SDP do you need?
That was the question Max Ogden asked [here](https://twitter.com/maxogden/status/580555197870665728).

It turns out that you don't need much SDP to establish a WebRTC connection.
Basically all you really need to get a P2P connection running is an exchange of
ice-ufrag,ice-pwd, the dtls fingerprint and candidate ip and port.
Which, encoded in not very efficient ways, boils down to a little more than 100 characters.

Timing is critical however. Wait too long to set the answer at the offerer and things will fail.
So this will not be usable for signaling via twitter, but something like CTCP WEBRTC
over IRC would work.

See [webrtchacks](https://webrtchacks.com/the-minimum-viable-sdp/) for an in-depth explanation of what
happens here.

# Reduce Example

``` js
var min = require('sdp-minimizer');
console.log(min.reduce({
  'sdp':'v=0\r\no=- 5569982971256804497 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na'
    + '=msid-semantic: WMS\r\nm=application 53110 DTLS/SCTP 5000\r\nc=IN IP4 14'
    + '2.254.26.9\r\na=candidate:3338612916 1 udp 2122194687 192.168.186.18 531'
    + '10 typ host generation 0\r\na=candidate:2289880132 1 tcp 1518214911 192.'
    + '168.186.18 0 typ host tcptype active generation 0\r\na=candidate:1752471'
    + '43 1 udp 1685987071 142.254.26.9 53110 typ srflx raddr 192.168.186.18 rp'
    + 'ort 53110 generation 0\r\na=ice-ufrag:tCjVOmVGpVZjCem/\r\na=ice-pwd:dOU7'
    + '7RWjJ8qQNb5OTz6D+U7h\r\na=ice-options:google-ice\r\na=fingerprint:sha-25'
    + '6 AE:DB:BE:7E:9B:17:45:A7:A5:54:40:A8:66:19:11:5C:F2:34:C8:0A:B9:85:32:7'
    + '0:09:2E:A9:91:A2:82:E8:71\r\na=setup:actpass\r\na=mid:data\r\na=sctpmap:'
    + '5000 webrtc-datachannel 1024\r\n',
  'type':'offer'
}));
```

output:

```
O,tCjVOmVGpVZjCem/,dOU77RWjJ8qQNb5OTz6D+U7h,wq7Dm8K+fsKbF0XCp8KlVEDCqGYZEVzDsjTDiArCucKFMnAJLsKpwpHCosKCw6hx
```

# Expand Example

``` js
var min = require('sdp-minimizer');
console.log(min.expand(
  'O,tCjVOmVGpVZjCem/,dOU77RWjJ8qQNb5OTz6D+U7h,wq7Dm8K+fsKbF0XCp8KlVEDCqGYZEVzD'
    + 'sjTDiArCucKFMnAJLsKpwpHCosKCw6hx'
));
```

output:

```
{ type: 'offer',
  sdp: 'v=0\r\no=- 5498186869896684180 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=msid-semantic: WMS\r\nm=application 9 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0.0\r\na=mid:data\r\na=sctpmap:5000 webrtc-datachannel 1024\r\na=setup:actpass\r\na=ice-ufrag:tCjVOmVGpVZjCem/\r\na=ice-pwd:dOU77RWjJ8qQNb5OTz6D+U7h\r\na=fingerprint:sha-256 AE:DB:BE:7E:9B:17:45:A7:A5:54:40:A8:66:19:11:5C:F2:34:C8:0A:B9:85:32:70:09:2E:A9:91:A2:82:E8:71\r\na=candidate:0 1 udp 1 0.0.0.0  typ host\r\n' }
```

# Usage

See [the full sample](https://github.com/fippo/minimal-webrtc).

``` js
var min = require('sdp-minimizer')
```

## var compact = min.reduce(sdp)

Return a `compact` string representation of an `sdp` object.

## var sdp = min.expand(compact)

Return an expanded `sdp` object from a `compact` string.

# LICENSE
MIT
