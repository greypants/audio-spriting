AudioClip = function(properties){
	this.setProperties(properties);
};

AudioClip.prototype = {
	setProperties: function(properties) {
		// Set a default source sprite file here, or specify one on object creation
		this.audioTrack = properties.audioTrack || audioTrack;
		this.startTime = properties.startTime || 0;
		this.endTime = properties.endTime || this.startTime + 1;
		this.pausedTime = this.startTime;
		this.timer = false;

		// Looping (optional)
		this.loops = properties.loops || false;
		this.loopStartTime = properties.loopStartTime || this.startTime;
		this.loopEndTime = properties.loopEndTime || this.endTime;
	},

	play: function() {
		var audioClip = this;
		var onComplete = audioClip.loops ? audioClip.loop : audioClip.pause;

		this.audioTrack.audio.currentTime = this.startTime;
		this.audioTrack.play();

		// clear any stop monitoring that was in place already
		clearInterval(audioClip.audioTrack.timer);
		audioClip.audioTrack.timer = setInterval(function () {
			if (audioClip.audioTrack.audio.currentTime >= audioClip.endTime) {
				clearInterval(audioClip.audioTrack.timer);
				onComplete.call(audioClip);
			}
		}, 10);
	},

	loop: function() {
		var audioClip = this;
		audioClip.audioTrack.audio.pause();
		audioClip.audioTrack.audio.currentTime = audioClip.loopStartTime;
		audioClip.audioTrack.audio.play();

		audioClip.audioTrack.timer = setInterval(function () {
			if (audioClip.audioTrack.audio.currentTime >= audioClip.loopEndTime) {
				clearInterval(audioClip.audioTrack.timer);
				audioClip.loop();
			}
		}, 10);
	},

	stop: function() {
		clearInterval(this.audioTrack.timer);
		this.audioTrack.stop();
	},

	pause: function() {
		clearInterval(this.audioTrack.timer);
		this.audioTrack.pause();
		this.pausedTime = this.audioTrack.audio.currentTime;
	},

	resume: function() {
		var remainingTime = this.pausedTime - this.loopEndTime;
		var audioClip = this;
		this.audioTrack.resume();
		clearInterval(this.audioTrack.timer);
	}
};