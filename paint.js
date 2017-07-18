define([], function() {
    return function($element, layout) {
        // Backend API
        var backendApi = this.backendApi;

        // Get the text color value
        var textColor = layout.textColor;

        // Clear the previous contents of the container so we start from scratch each time
        $element.html("");

        // Create a table
        var table = document.createElement("table");
        
        // Create a header row
        var hRow = document.createElement("tr");

        // Add dimension labels
        var dimensionInfo = layout.qHyperCube.qDimensionInfo;
        for(var i = 0; i < dimensionInfo.length; i++) {
            // Create a header cell
            var hCell = document.createElement("th");
            // Set the cell contents to the dimension label
            hCell.innerHTML = dimensionInfo[i].qFallbackTitle;
            // Add the cell to the header row
            hRow.appendChild(hCell);
        }

        // Add measure labels
        var measureInfo = layout.qHyperCube.qMeasureInfo;
        for(var i = 0; i < measureInfo.length; i++) {
            // Create a header cell
            var hCell = document.createElement("th");
            // Set the cell contents to the measure label
            hCell.innerHTML = measureInfo[i].qFallbackTitle;
            // Set the class as a measure cell
            hCell.className = "measureCell";
            // Add the cell to the header row
            hRow.appendChild(hCell);
        }

        // Add the header row to the table
        table.appendChild(hRow);

        var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;

        // Iterate through each row of the qMatrix
		for(var row = 0; row < qMatrix.length; row++) {
			// Get current row data
			var currentRow = qMatrix[row];
			// Create a row
			var tr = document.createElement("tr");
            // Iterate through each column of the row
            for(var col = 0; col < currentRow.length; col++) {
                // Get current cell data
                var currentCell = currentRow[col];
                // Create a cell
                var td = document.createElement("td");
                // Add text value to the cell
                td.innerHTML = currentCell.qText;
				
				// Check if dimension, then add metadata
				if(col < dimensionInfo.length) {
                    // Add a selectable class
					td.className = "selectable";
					// Add metadata for the selection
					td.setAttribute("dim-col",col);
					td.setAttribute("dim-index", currentCell.qElemNumber);
				}
                // If a measure cell, set the style
                else {
                    td.className = "measureCell";
                }
				// Append the cell to the row
				tr.appendChild(td);
			}
			// append the row to the table
			table.appendChild(tr);
		}

        // Append the table to the $element
        $element.append(table);

        // Add click functions to ".selectable" items
		$element.find(".selectable").on("click", function() {
			// Get the dimension column number
			var dimCol = parseInt(this.getAttribute("dim-col"));
			
			// Get the dimension value index
			var dimInd = parseInt(this.getAttribute("dim-index"));

			// Call selectValues with these values
			backendApi.selectValues(dimCol, [dimInd],true);
		});

        // Color the table
        table.style.color = textColor;
    };
});