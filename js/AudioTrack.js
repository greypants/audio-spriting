var AudioTrack = function(name) {
	this.createAudioElement(name);
	this.setProperties();
	this.loadAudio();
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
		this.timer;
	},

	loadAudio: function(){

		var audioTrack = this;
		var click = document.ontouchstart === undefined ? 'click' : 'touchstart';

		var userInitiatedPlayback = function(){
			document.documentElement.removeEventListener(click, userInitiatedPlayback, true);
			if(audioTrack.audio.readyState < 1) {
				audioTrack.audio.play();
			} else {
				// If the audio is already ready, no user init is needed, and we can cancel this logic
				audioTrack.audio.removeEventListener('play', preventPlayback, false);
				audioTrack.audio.muted = false;
			}
		};

		var preventPlayback = function () {
			audioTrack.pause();
			audioTrack.audio.muted = false;
			audioTrack.audio.removeEventListener('play', preventPlayback, false);
		};

		audioTrack.audio.muted = true;
		audioTrack.audio.addEventListener('play', preventPlayback, false);
		document.documentElement.addEventListener(click, userInitiatedPlayback, true);
	},

	pause: function() {
		this.audio.pause();
		this.isPlaying = false;
	},

	play: function(audioClip) {
		var audioTrack = this;

		// Play track if file is ready
		if(audioTrack.audio.readyState > 1){
			clearTimeout(audioTrack.playTimeout);
			audioTrack.audio.play();
			audioTrack.isPlaying = true;

		} else {
			// Keep trying to play until audio is ready
			audioTrack.playTimeout = setTimeout(function(){
				audioTrack.play();
			}, 20);
		}
	},

	stop: function() {
		this.audio.pause();
		this.audio.currentTime = this.activeSoundClip ? this.activeSoundClip.startTime : 0;
		this.isPlaying = false;
	}
};

