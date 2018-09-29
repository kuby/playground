function isSorted(arr) {
	return !!arr.reduce((acc, item) => acc && item >= acc && item)
}

function isLargestFirst(largest, arr) {
	return arr[0] == largest
}

function isLargestLast(largest, arr) {
	return arr[arr.length-1] == largest
}

function getReversalsToSort(arrayOfNumbers) {
	const reversals = [];
	let largestNumInArray = Math.max(...arrayOfNumbers);
	let numbers = [...arrayOfNumbers];
	
	let revNum = 2;
	let threshold = 0;
	while (!isSorted(numbers)) {
		if (isLargestLast(largestNumInArray, numbers)) {
			numbers.pop(); // Remove the largest last from array
			largestNumInArray = Math.max(...numbers); // Assign a new largest number in array
		} else {
			tempNumbers = [
				...numbers.slice(0, revNum).reverse(),
				...numbers.slice(revNum, numbers.length)
			];
			
			if (isSorted(tempNumbers)) {
				reversals.push(revNum);
				numbers = tempNumbers;
				break;
			}
			
			// Start reversing until the first value is the biggest one in the array
			if (isLargestFirst(largestNumInArray, tempNumbers) || isLargestFirst(largestNumInArray, numbers)) {
				// We know, that if we reverse the array, we get the biggest number to the end
				if (isLargestFirst(largestNumInArray, numbers)) {
					numbers.reverse(); // We store this move later
				} else {
					reversals.push(revNum); // We know that partial sort was a good move, store it
					numbers = tempNumbers.reverse(); // We store this move later
				}
				reversals.push(numbers.length); // Store the reverse move
				numbers.pop(); // Remove the last (biggest) number from the array, so we can repeat this loop
				largestNumInArray = Math.max(...numbers); // Assign a new largest number in array
			}
			
			if (revNum >= numbers.length) {
				revNum = 2;
			} else {
				revNum++;
			}
		}
		
		// Only for debug purposes, if the alorithm goes wild, break it after 2000 iterations.
		threshold++;
		if (threshold >= 2000) {
			break;
		}
	}

	return reversals;
}