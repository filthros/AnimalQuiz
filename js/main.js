window.onload = function() {
	var imagePos = 0;
	var soundPos = 0;
	var correctAnswers = 0;
	var totalQuestions = 5;
	var play = 1;
	var audioPlayed = [];
	var audio;
	var img = document.getElementById("animalImg");
	var container = document.querySelector('.contents');
	var instrucciones = document.querySelector('.instrucciones');
	var overlay = document.querySelector('.overlay');

	var names = [ 'buho', 'caballo', 'cerdo', 'chimpance', 'elefante', 'gallo',
			'oso', 'oveja', 'pato', 'perro', 'tigre', 'vaca' ];
	container.addEventListener('click', playSound);
	document.addEventListener('rotarydetent', rotaryEventHandler);
	document.addEventListener('tizenhwkey', function(e) {
		if (e.keyName == "back") {
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (ignore) {
			}
		}
	});

	function rotaryEventHandler(event) {

		var direction = event.detail.direction;

		if (direction === "CW") {
			imagePos++;
			if (imagePos >= names.length) {
				imagePos = 0;
			}

		} else if (direction === "CCW") {
			imagePos--;
			if (imagePos < 0) {
				imagePos = 11;
			}
		}
		showImage("images/" + names[imagePos] + ".png");
	}

	function playSound() {

		if (overlay.style.display === 'block') {
			overlay.style.display = 'none';
			instrucciones.style.display = 'block';
			play = 1;
			correctAnswers = 0;
			audioPlayed = [];
			return;
		}

		instrucciones.style.display = 'none';

		if (play == 1) {
			soundPos = Math.round(Math.random() * names.length - 1);

			audioPlayed.forEach(function(item, index, array) {
				while (item == soundPos) {
					soundPos = Math.round(Math.random() * names.length - 1);
				}
			});
			audioPlayed.push(soundPos);

			audio = document.getElementById(names[soundPos]);

			if (audio != null) {
				audio.play();
			} else {
				audio = document.getElementById(names[soundPos]);
				audio.play();
			}
			imagePos = Math.round(Math.random() * names.length - 1);
			img.style.display = "block";
			if (names[imagePos] != null) {
				showImage("images/" + names[imagePos] + ".png");
			} else {
				showImage("images/" + names[0] + ".png");
			}

			play = 0;
		} else {
			checkImage();
		}
	}

	function showImage(a) {
		img.src = a;
	}

	function checkImage() {
		if (imagePos === soundPos) {
			correctAnswers++;
			showImage("images/correcto.png");
			sleep(2000);
			if (correctAnswers === totalQuestions) {
				if (img != null && img.style != null) {
					img.style.display = "none";
				}
				overlay.style.display = 'block';
			} else {
				play = 1;
				playSound();
			}
		} else {
			showImage("images/incorrecto.png");
			sleep(2000);
			showImage("images/" + names[imagePos] + ".png");

		}

	}

	function sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds) {
				break;
			}
		}
	}

};