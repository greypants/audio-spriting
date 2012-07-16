// Create Audio objects
var audioTrack = new AudioTrack('sound-effects');

// Create AudioClip
var audioClips = {
	button: new AudioClip({
		startTime: 3,
		endTime: 3.6
	}),

	jump: new AudioClip({
		startTime: 0,
		endTime: 0.8
	}),

	medal: new AudioClip({
		startTime: 1.5,
		endTime: 2.418
	}),

	swish: new AudioClip({
		startTime: 1,
		endTime: 1.5
	}),

	points: new AudioClip({
		startTime: 4,
		endTime: 5,
		loops: true,
		loopStartTime: 4.2,
		loopEndTime: 4.3
	})
};

// Bind Button Clicks
var buttons = {
	button: document.getElementById('button'),
	jump: document.getElementById('jump'),
	medal: document.getElementById('medal'),
	swish: document.getElementById('swish'),
	points: document.getElementById('points'),
	pointsStop: document.getElementById('points-stop')
};

var touch = document.ontouchstart === undefined ? 'click' : 'touchstart';

buttons.button.addEventListener(touch, function(){
	audioClips.button.play();
}, false);

buttons.jump.addEventListener(touch, function(){
	audioClips.jump.play();
}, false);

buttons.medal.addEventListener(touch, function(){
	audioClips.medal.play();
}, false);

buttons.swish.addEventListener(touch, function(){
	audioClips.swish.play();
}, false);

buttons.points.addEventListener(touch, function(){
	audioClips.points.play();
}, false);

buttons.pointsStop.addEventListener(touch, function(){
	audioClips.points.stop();
}, false);