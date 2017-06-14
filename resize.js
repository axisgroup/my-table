define([], function() {
    return function($element, layout) {
        // Get your existing table
        var table = $element[0].querySelector("table");
        // Create a random color
        table.style.color = "#" + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
    };
});