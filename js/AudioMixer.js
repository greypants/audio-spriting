var AudioMixer = function(name) {
	this.createTracks(name);
};

AudioMixer.prototype = {

	createTracks: function(name) {
		var supportsMultiTrack = !navigator.userAgent.match(/(iPad|iPhone|iPod)/i);

		this.maxTracks = supportsMultiTrack ? 5 : 1;
		var i = 0;

		this.name = name + '-multiTrack';
		this.tracks = [];
		this.availableTracks = [];
		this.trackIndex = 0;

		while (i < this.maxTracks) {
			var track = new AudioTrack(name);
			track.id = i;
			this.tracks.push(track);
			i++;
		}
	},

	selectAvailableTrack: function() {
		var i = 0;
		this.selectedTrack = false;

		while (i < this.maxTracks) {
			var thisTrack = this.tracks[i];

			if(!thisTrack.isPlaying) {
				this.selectedTrack = thisTrack;
				break;
			}
			i++;
		}
	},

	pause: function(audioClip) {
		this.selectedTrack.pause(audioClip);
	},

	resume: function(audioClip) {
		this.selectedTrack.resume(audioClip);
	},

	play: function(audioClip) {
		// Remove track from available tracks array
		this.selectAvailableTrack();
		if(this.selectedTrack){
			this.selectedTrack.play(audioClip);
		} else {
			console.log('use default track')
			this.tracks[0].play(audioClip);
		}
	}
};

