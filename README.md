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
  type: 'offer',
  sdp: 'v=0\r\no=- 5498186869896684180 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na'
    + '=msid-semantic: WMS\r\nm=application 9 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0'
    + '.0\r\na=mid:data\r\na=sctpmap:5000 webrtc-datachannel 1024\r\na=setup:a'
    + 'ctpass\r\na=ice-ufrag:tCjVOmVGpVZjCem/\r\na=ice-pwd:dOU77RWjJ8qQNb5OTz6'
    + 'D+U7h\r\na=fingerprint:sha-256 C2:AE:C3:9B:C2:BE:7E:C2:9B:17:45:C2:A7:C'
    + '2:A5:54:40:C2:A8:66:19:11:5C:C3:B2:34:C3:88:0A:C2:B9:C2:85:32:70:09:2E:'
    + 'C2:A9:C2:91:C2:A2:C2:82:C3:A8:71\r\na=candidate:0 1 udp 1 0.0.0.0  typ '
    + 'host\r\n'
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
  'O,tCjVOmVGpVZjCem/,dOU77RWjJ8qQNb5OTz6D+U7h,wq7Dm8K+fsKbF0XCp8KlVEDCqGYZEVz'
    + 'DsjTDiArCucKFMnAJLsKpwpHCosKCw6hx'
));
```

output:

```
{ type: 'offer',
  sdp: 'v=0\r\no=- 5498186869896684180 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=msid-semantic: WMS\r\nm=application 9 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0.0\r\na=mid:data\r\na=sctpmap:5000 webrtc-datachannel 1024\r\na=setup:actpass\r\na=ice-ufrag:tCjVOmVGpVZjCem/\r\na=ice-pwd:dOU77RWjJ8qQNb5OTz6D+U7h\r\na=fingerprint:sha-256 C2:AE:C3:9B:C2:BE:7E:C2:9B:17:45:C2:A7:C2:A5:54:40:C2:A8:66:19:11:5C:C3:B2:34:C3:88:0A:C2:B9:C2:85:32:70:09:2E:C2:A9:C2:91:C2:A2:C2:82:C3:A8:71\r\na=candidate:0 1 udp 1 0.0.0.0  typ host\r\n' }
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
