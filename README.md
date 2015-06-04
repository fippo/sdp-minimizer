# How much SDP do you need?
That was the question Max Ogden asked [here](https://twitter.com/maxogden/status/580555197870665728).

It turns out that you don't need much SDP to establish a WebRTC connection.
Basically all you really need to get a P2P connection running is an exchange of
ice-ufrag,ice-pwd, the dtls fingerprint and candidate ip and port.
Which, encoded in not very efficient ways, boils down to a little more than 100 characters.

Timing is critical however. Wait too long to set the answer at the offerer and things will fail.
So this will not be usable for signaling via twitter, but something like CTCP WEBRTC
over IRC would work.

See https://webrtchacks.com/the-minimum-viable-sdp/ for an in-depth explanation of what
happens here and https://github.com/fippo/minimal-webrtc for a fully working sample.

# Usage

See https://github.com/fippo/minimal-webrtc

# LICENSE
MIT
