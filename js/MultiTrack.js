var MultiTrack = function(name) {
	this.createTracks(name);
};

MultiTrack.prototype = {

	createTracks: function(name) {

		var maxTracks = 5; // This number is arbitrary
		var i = 0;

		this.name = name + '-multiTrack';
		this.tracks = [];
		this.availableTracks = [];
		this.trackIndex = 0;

		while (i < maxTracks){
			var track = new AudioTrack('name');
			track.setProperties();
			track.loadAudio();
			track.index = i;
			this.tracks.push(track);
			this.availableTracks.push(track);
			i++;
		}
	},

	selectAvailableTrack: function() {
		this.selectedTrack = this.availableTracks[0] || this.tracks[0];
	},

	makeAvailable: function(track) {
		this.selectedTrack.i = this.availableTracks.length;
		this.availableTracks.push(this.selectedTrack);
	},

	makeUnavailable: function() {
		this.availableTracks.slice(this.selectedTrack[this.selectedTrack.i]);
	},

	pause: function() {
	},

	play: function(audioClip) {
		// Remove track from available tracks array
		this.selectAvailableTrack();
		this.removeTrackAvailability();
		this.track.play()
	}

};

