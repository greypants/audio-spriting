HTML 5 Audio Spriting
=====================
An attempt to get working cross browser audio spriting with iOS support. Heavily incoprates techniques found in [Remy Sharp's awesome post](http://remysharp.com/2010/12/23/audio-sprites/) on the topic. 

###Notes:
* IE 9 is BROKE. So far, setting the currentTime yields unpredictable and way off results.
* For consistent playback, keep your minimum clip length to 0.5 seconds... maybe longer.
* Looping SUCKS. Use only on longer clips, where your're ok with a slight hiccup.
* Pause/Resume functionality only works in single-track mode, or on the last played audioClip in multi-track mode.