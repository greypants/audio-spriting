AudioClip = function(properties){
	this.setProperties(properties);
};

AudioClip.prototype = {
	setProperties: function(properties) {
		// Set a default source sprite file here, or specify one on object creation
		this.source = properties.source || audioMixer;
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
		this.source.play(this);
	},

	pause: function() {
		this.source.pause(this);
	},

	resume: function() {
		this.source.resume(this);
	}
};