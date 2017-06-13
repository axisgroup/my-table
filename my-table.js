define([], function() {
	var myProps = {
		textColor: "black"
	};

	var myDefinition = {
        type: "items",
        component: "accordion",
        items: {
            settings: {
                uses: "settings"
            }
        }
	};

    var myPaint = function($element, layout) {
        // Get the text color value
        var textColor = layout.textColor;

        // Clear the previous contents of the container so we start from scratch each time
        $element.html("");

        // Create a span
        var span = document.createElement("span");

        // Set text color
        span.style.color = textColor;
        
        // Add message
        span.innerHTML = "hello, world";
        
        // Append span to the container
        $element.append(span);
    };

    var mySupport = {
        snapshot: true,
        exportData: true 
    };

	return {
		initialProperties: myProps,
		definition: myDefinition,
        paint: myPaint,
        support: mySupport
	};
});

