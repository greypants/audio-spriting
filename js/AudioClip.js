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
		this.audioTrack.play(this);
	},

	pause: function() {
		this.audioTrack.pause(this);
	},

	resume: function() {
		this.audioTrack.resume(this);
	}
};