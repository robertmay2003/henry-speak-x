function speak() {
	window.requestAnimationFrame(()=>{
		responsiveVoice.speak(document.getElementById('output').innerText, "UK English Male");
	});
}