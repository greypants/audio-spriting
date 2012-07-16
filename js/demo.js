
// Create MultiTrack Mixer
var audioMixer = new AudioMixer('sound-effects');

// Create AudioClip
var audioClips = {
	jump: new AudioClip({
		startTime: 0,
		endTime: 1
	}),

	swish: new AudioClip({
		startTime: 1,
		endTime: 1.5
	}),

	medal: new AudioClip({
		startTime: 1.7,
		endTime: 2.618
	}),

	button: new AudioClip({
		startTime: 3,
		endTime: 3.6
	}),

	pause: new AudioClip({
		startTime: 4,
		endTime: 5.071
	}),

	points: new AudioClip({
		startTime: 5.5,
		endTime: 6.5,
		loops: true,
		loopStartTime: 5.6,
		loopEndTime: 6.3
	})
};

// Bind Button Clicks
var buttons = {
	button: document.getElementById('button'),
	jump: document.getElementById('jump'),
	medal: document.getElementById('medal'),
	swish: document.getElementById('swish'),
	points: document.getElementById('points'),
	pointsPause: document.getElementById('points-pause'),
	pointsResume: document.getElementById('points-resume')
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

buttons.pointsPause.addEventListener(touch, function(){
	audioClips.points.pause();
}, false);

buttons.pointsResume.addEventListener(touch, function(){
	audioClips.points.resume();
}, false);