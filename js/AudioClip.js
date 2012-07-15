AudioClip = function(properties){
	this.setProperties(properties);
};

AudioClip.prototype = {
	setProperties: function(properties) {

		this.audioTrack = properties.audioTrack || audioTracks.sfx;
		this.startTime = properties.startTime || 0;
		this.endTime = properties.endTime || this.startTime + 1;
		this.clipLength = this.endTime - this.startTime;
		this.pausedTime = this.startTime;
		this.timer = false;

		// Looping (optional)
		this.loops = this.loops || false;
		if(this.loops) {
			this.loopStartTime = this.loopStartTime || this.startTime;
			this.loopEndTime = this.loopEndTime || this.endTime;
			this.loopLength = this.loopEndTime - this.loopStartTime;
		}
	},

	play: function() {
		var audioClip = this;
		var onComplete = audioClip.loops ? audioClip.loop : stop;

		this.audioTrack.audio.currentTime = this.startTime;
		this.audioTrack.play();

		// clear any stop monitoring that was in place already
		clearInterval(audioClip.audioTrack.timer);

		audioClip.audioTrack.timer = setInterval(function () {
			if (audioClip.audioTrack.audio.currentTime >= audioClip.endTime) {
				audioClip.audioTrack.pause();
				clearInterval(audioClip.audioTrack.timer);
				console.log('PAUSE!');
			}
		}, 10);
	},

	loop: function() {
		var audioClip = this;
		this.audioTrack.audio.currentTime = this.loopTime;
		this.audioTrack.play();

		clearTimeout(this.timer);
		this.timer = setTimeout(function(){
			audioClip.loop();
		}, this.clipLength * 1000);
	},

	stop: function() {
		console.log('stop?')
		clearTimeout(this.audioTrack.timer);
		this.audioTrack.stop();
	},

	pause: function() {
		this.audioTrack.pause();
		this.pausedTime = this.audioTrack.audio.currentTime;
	},

	resume: function() {
		var remainingTime = this.pausedTime - this.loopEndTime;
		var audioClip = this;
		this.audioTrack.resume();
		clearTimeout(this.timer);
		this.timer = setTimeout(function(){audioClip.stop();}, remainingTime);
	}
};