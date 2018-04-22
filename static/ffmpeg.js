// this.loadVideo()
let canvas = document.getElementById('video-canvas')
let url = 'ws://' + '47.97.25.165' + ':8084/'
// var url = 'ws://'+document.location.hostname+':8084/';
// eslint-disable-next-line
let player = new JSMpeg.Player(url, {canvas: canvas})
console.log('ffmpeg success')

