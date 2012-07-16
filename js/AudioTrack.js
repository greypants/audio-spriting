var AudioTrack = function(name) {
	this.createAudioElement(name);
	this.setProperties();
	this.loadAudio();
	console.log('constructor')
};

AudioTrack.prototype = {

	createAudioElement: function(name) {
		this.name = name;

		// Set the path to your audio directory
		var audioPath = 'audio/';

		// List filetypes to load
		var fileTypes = ['.mp3', '.ogg'];

		// Create the audio element
		this.audio = document.createElement("audio");

		// Add sources
		for (var i = fileTypes.length; i--;) {
			var source = document.createElement('source');
			source.src = audioPath + name + fileTypes[i];
			this.audio.appendChild(source);
		}
	},

	setProperties: function() {
		this.audio.preload = true;
		this.audio.autobuffer = true;
		this.playing = false;
		this.timer;
	},

	loadAudio: function() {
		console.log('load audio')
		var audioTrack = this;
		var audio = audioTrack.audio;
		var click = document.ontouchstart === undefined ? 'click' : 'touchstart';

		var userInitiatedPlayback = function(){
			document.documentElement.removeEventListener(click, userInitiatedPlayback, true);
			if(audio.readyState < 1) {
				console.log('userInitiatedPlayback')
				audio.play();
			} else {
				// If the audio is already ready, no user init is needed, and we can cancel this logic
				audio.removeEventListener('play', preventPlayback, false);
				audio.muted = false;
		}
		};

		var preventPlayback = function () {
			console.log('preventPlayback, init complete')
			audio.pause();
			audio.muted = false;
			audio.removeEventListener('play', preventPlayback, false);
		};

		var readyToSeek = function() {
			console.log('progress');
			audio.currentTime = 0.5;
			audioTrack.initComplete = true;
			audio.removeEventListener('progress', readyToSeek, false);
		};

		audio.muted = true;
		audio.addEventListener('play', preventPlayback, false);
		audio.addEventListener('progress', readyToSeek, false);
		document.documentElement.addEventListener(click, userInitiatedPlayback, true);
	},

	play: function(audioClip) {
		var audioTrack = this;
		var audio = this.audio;

		if(audioTrack.initComplete){
			console.log('play audio clip')

			if(audioClip){
				audioTrack.safePlay(audioClip);
				audioClip.pauseTime = false;
				clearInterval(audioTrack.timer);
				audioTrack.monitorCurrentTime(audioClip);
			} else  {
				audioTrack.safePlay();
			}
		}
	},

	loop: function(audioClip) {
		var audioTrack = this;
		var audio = audioTrack.audio;

		audio.pause();
		audio.currentTime = audioClip.loopStartTime;
		audio.play();
		audioTrack.monitorCurrentTime(audioClip);
	},

	pause: function(audioClip) {
		var audioTrack = this;
		var audio = audioTrack.audio;

		clearInterval(audioTrack.timer);
		audio.pause();
		audioTrack.isPlaying = false;
	},

	monitorCurrentTime: function(audioClip) {
		var audioTrack = this;
		var audio = audioTrack.audio;

		var onComplete = audioClip.loops ? audioTrack.loop : audioTrack.pause;
		audioTrack.timer = setInterval(function () {
			if (audio.currentTime >= audioClip.endTime) {
				clearInterval(audioTrack.timer);
				onComplete.call(audioTrack, audioClip);
			}
		}, 10);
	},

	safePlay: function(audioClip) {

		var audioTrack = this;
		var audio = audioTrack.audio;
		var startTime = 0;
		if (audioClip) {
			startTime = audioClip.pauseTime ? audioClip.pauseTime : audioClip.startTime;
		}

		// Play track if file is ready
		if(audioTrack.audio.readyState > 1){
			clearTimeout(audioTrack.playTimeout);
			audio.currentTime = startTime;
			audioTrack.audio.play();
			audioTrack.isPlaying = true;
		} else {
			// Keep trying to play until audio is ready
			audioTrack.playTimeout = setTimeout(function(){
				audioTrack.safePlay();
			}, 20);
		}
	},

	stop: function() {
		this.audio.pause();
		this.audio.currentTime = this.activeSoundClip ? this.activeSoundClip.startTime : 0;
		this.isPlaying = false;
	},

	resume: function(audioClip) {
		audioClip.pauseTime = this.audio.currentTime;
		this.play(audioClip);
	}
};

