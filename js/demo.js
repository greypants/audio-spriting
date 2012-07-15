// Create Audio objects
var audioTracks = {
	sfx: new AudioTrack('sound-effects')
};

// Create AudioClip

var audioClips = {
	button: new AudioClip({
		startTime: 0.5,
		endTime: 0.95
	}),

	jump: new AudioClip({
		startTime: 1.5,
		endTime: 2.2
	}),

	medal: new AudioClip({
		startTime: 2.25,
		endTime: 3.2
	}),

	points: new AudioClip({
		startTime: 11,
		endTime: 12.98,
		loops: true
	})
};




/*
	music: new AudioClip({
		startTime: 0,
		endTime: 'end',
		loopStart: '13.675',
		source: _8bit.sounds.music
	})

*/