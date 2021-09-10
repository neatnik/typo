![Typo typing demo](https://raw.githubusercontent.com/neatnik/typo/main/typo-demo.gif)

Typo attempts to improve upon the sterile, flawless animated web typing effect by offering something a little more relatable. Text is typed as if a real person is there. There are variations in the speed between keystrokes, pauses, and of course typos — which sometimes take a moment to be noticed and corrected (but are always corrected). The overall effect just feels more natural — more like a person typing, and less like a computer typing.

## Usage

Add an element to be typed, like this:

```
<div id="typo" data-typo-chance="5" data-typing-delay="60" data-typing-jitter="20">Typo types the way a real person types. There are subtle variations in speed, occasional errors that are corrected, and a general feeling of humanity.</div>
```

<p>Then just point Typo at it:</p>

```
document.addEventListener('DOMContentLoaded', function() { 
  var element = document.getElementById('typo');
  var text = element.innerHTML;
  typo(element, text);
});
```

## Configuration

You can adjust these three configuration attributes:

- **data-typo-chance**, the percentage chance that any given typed character will be typed incorrectly
- **data-typing-delay**, the delay between keystrokes
- **data-typing-jitter**, the +/- jitter for delays

That’s it. I hope you enjoy it.