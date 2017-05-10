window.onload = function() {
	var imagePos = 0;
	var soundPos = 0;
	var correctAnswers = 0;
	var totalQuestions = 5;
	var play = 1;
	var audioPlayed = [];
	var container = document.querySelector('.contents');
	var instrucciones = document.querySelector('.instrucciones');
	var overlay = document.querySelector('.overlay');

	var names = [ 'chimpance', 'buho', 'caballo', 'cerdo', 'elefante', 'gallo',
			'oso', 'oveja', 'pato', 'perro', 'tigre', 'vaca' ];
	container.addEventListener('click', playSound);
	document.addEventListener('rotarydetent', rotaryEventHandler);
	document.addEventListener('tizenhwkey', function(e) {
		if (e.keyName == "back")
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (ignore) {
			}
	});

	function rotaryEventHandler(event) {

		var direction = event.detail.direction;

		if (direction === "CW") {
			imagePos++;
			if (imagePos > names.length) {
				imagePos = 0;
			}

		} else if (direction === "CCW") {
			imagePos--;
			if (imagePos < 0) {
				imagePos = 11;
			}
		}
		showImage(imagePos);
	}

	function playSound() {

		if (overlay.style.display === 'block') {
			overlay.style.display = 'none';
			instrucciones.style.display = 'block';
			play = 1;
			correctAnswers = 0;
			return;
		}

		instrucciones.style.display = 'none';
		if (play == 1) {
			soundPos = Math.round(Math.random() * names.length);
			audioPlayed.forEach(function(item, index, array) {
				if (item == soundPos) {
					soundPos = Math.round(Math.random() * names.length);
				}
			});
			audioPlayed.push(soundPos);

			var audio = document.getElementById(names[soundPos]);

			audio.play();
			play = 0;
			imagePos = Math.round(Math.random() * names.length);
			showImage();
		} else {
			checkImage();
		}
	}

	function showImage() {
		document.getElementById(names[imagePos] + 'Img').style.display = "block";
	}

	function checkImage() {
		if (imagePos === soundPos) {
			document.getElementById(names[imagePos] + 'Img').style.display = "none";
			correctAnswers++;
			if (correctAnswers === totalQuestions) {
				overlay.style.display = 'block';
			} else {
				play = 1;
				playSound();
			}
		}

	}

};