/*

Typo, a more natural web typing thing

https://neatnik.net/typo
https://github.com/neatnik/typo

Copyright (c) 2021 Neatnik LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

function num_between(min, max) {
	return Math.floor(Math.random() * (max- min + 1) + min);
}

function chance(val) {
	if(num_between(0, 100) < val) return true;
	else return false;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

var typos = {
	q:['w','a'],
	w:['q','r','s'],
	e:['w','d','r'],
	r:['e','f','t'],
	t:['r','g','y'],
	y:['t','h','u'],
	u:['y','j','i'],
	i:['u','k','o'],
	o:['i','l','p'],
	p:['o',';','['],
	a:['q','s','z'],
	s:['w','a','x','d'],
	d:['e','s','c','f'],
	f:['r','d','v','g'],
	g:['t','f','b','h'],
	h:['y','g','n','j'],
	j:['u','h','m','k'],
	k:['i','j',',','l'],
	l:['o','k','.',';'],
	z:['a','x'],
	x:['z','s','c'],
	c:['x','d','v'],
	v:['c','f','b'],
	b:['v','g','n'],
	n:['b','h','m'],
	m:['n','j',','],
}

async function typo(element, text) {
	var buffer = '';
	var typo_active = false;
	var tag_active = false;
	var typing_typos = (element.dataset.typoChance) ? element.dataset.typoChance : 10;
	var typing_speed = (element.dataset.typingDelay) ? element.dataset.typingDelay : 50;
	var typing_jitter = (element.dataset.typingJitter) ? element.dataset.typingJitter : 15;
	
	for (var i = 0; i < text.length; i++) {
		
		// Get the letter that we’re supposed to type
		letter = text.charAt(i);
	
		// TODO: actual support for html or markup or whatever
		
		/*
		// Handle elements/markup
		if(letter == '<' && (
			text.charAt(i+1) == 's' || 
			text.charAt(i+1) == 'p' || 
			text.charAt(i+1) == 'a' || 
			text.charAt(i+1) == '/' ||
			text.charAt(i+1) == 'i')
		) {
			tag_active = true;
		}
		
		if(tag_active) {
			
			buffer = buffer + letter;
			element.innerHTML = buffer;
			
			if(letter == '>' && (
				text.charAt(i-1) == 'n' || 
				text.charAt(i-1) == 'a' || 
				text.charAt(i-1) == 'p' || 
				text.charAt(i+1) == '"' || 
				text.charAt(i+1) == '/')
			) {
				tag_active = false;
				await sleep(typing_speed);
			}
			continue;
		}
		*/
		
		// Trigger a typo
		if(chance(typing_typos) && typo_active === false && i > 1) {
			
			if(typeof typos[letter] !== 'undefined') {
				
				// Swap the letter with a random typo
				typo = typos[letter][Math.floor(Math.random() * typos[letter].length)];
				
				// Append the letter to the buffer
				buffer = buffer + typo;
				
				// Write the buffer
				element.innerHTML = buffer;
				
				typo_active = true;
				var seed = num_between(2,5);
				realization_delay = seed;
				realization_delay_counter = seed;
			}
		}
		
		// Append the letter to the buffer
		buffer = buffer + letter;
		
		// Write the buffer
		element.innerHTML = buffer;
		
		// Typical typing speed
		var speed_lower = parseFloat(typing_speed) - parseInt(typing_jitter);
		var speed_upper = parseFloat(typing_speed) + parseInt(typing_jitter);
		
		delay = num_between(speed_lower,speed_upper);
		
		// Chance of longer delay though
		if(chance(5)) delay = num_between(100, 200);
		await sleep(delay);
		
		if(typo_active) {
			
			realization_delay_counter--;
			
			if(realization_delay_counter == 0) {
		
				for (var k = 0; k < seed+1; k++) {
					
					// Pause at realization of typo
					await sleep(typing_jitter);
					
					// Rewind the buffer!
					buffer = buffer.substring(0, buffer.length - 1);
	
					// Write rewound buffer
					element.innerHTML = buffer;
					
					// Brief pause before continuing
					await sleep(30);
				}
				
				typo_active = false;
				
				// Add the letters back
				i = i - seed;
				await sleep(100);
			}
		}
	}
	
	// Whatever you do here will happen when the typing is finished
	//do_something();
	
	return new Promise(resolve => setTimeout(resolve, 1));
}

document.addEventListener('DOMContentLoaded', function() { 
	var element = document.getElementById('typo');
	var text = element.innerHTML;
	typo(element, text);
});
