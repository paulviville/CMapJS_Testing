"use strict";

let statusType = 0;
const ASSERTFAIL = statusType++;
const ASSERTSUCCESS = statusType++;
const EXPECTFAIL = statusType++;
const EXPECTSUCCESS = statusType++;

/**
 * Function for unit tests.
 * Displays a detailed log of results.
 * 
 * @param {String} desc Description of the test to run. 
 * @param {function} func Function containing the tests. The function must use the methods of TestOps preceded by "this.".
 */

 export function test(desc, func) {
	console.group("%cRunning: " + desc, "font-weight:bold");
	let ops = new TestOps;
	try {
		func.apply(ops);
	} catch {
		console.log("%c\u2718 Interrupted ", "color:red");
	}
	ops.showLog();
	console.groupEnd();
}


/**  
 * Factory function containing test operations.
 * Used exclusively by the test function.
*/
function TestOps() {
	let counter = 0;
	let failures = 0;
	const buffer = [];

	/**
	 * Stores log in the buffer for later display
	 * 
	 * @param {number} id Log number id.
	 * @param {number} type Log type: ASSERTFAIL, ASSERTSUCCESS, EXPECTFAIL, or EXPECTSUCCESS
	 * @param {string | Error} result Result of test, confirmation string or Error thrown.
	 */
	function log(id, type, result) {
		buffer.push({id, type, result});
	}

	/**
	 * Verifies that the argument is truthy.
	 * Throws an error if the assertion is false.
	 * 
	 * @param {boolean} isTrue variable to check for truthiness.
	 */
	this.assertTrue = function(isTrue) {
		const str = "asserted true: " + isTrue;
		if(!isTrue){
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			++failures;
			throw error;
		}

		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies that the argument is truthy.
	 * Does not throw an error if the assertion is false.
	 * 
	 * @param {boolean} isTrue variable to check for truthiness.
	 */
	this.expectTrue = function(isTrue) {
		const str = "expected true: " + isTrue;
		if(!isTrue) {
			const error = new Error(str);
			log(++counter, EXPECTFAIL, error);
			++failures;
			return;
		}
		log(++counter, EXPECTSUCCESS, str);
	}
	
	/**
	 * Verifies that the argument is falsy.
	 * Throws an error if the assertion is false.
	 * 
	 * @param {boolean} isFalse variable to check for falsiness.
	 */
	this.assertFalse = function (isFalse) {
		const str = "asserted false: " + isFalse;
		if(isFalse){
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			++failures;
			throw error;
		}

		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies that the argument is falsy.
	 * Does not throw an error if the assertion is false.
	 * 
	 * @param {boolean} isFalse variable to check for falsiness.
	 */
	this.expectFalse = function (isFalse) {
		const str = "expected false: " + isFalse;
		if(isFalse){
			const error = new Error(str);
			log(++counter, EXPECTFAIL, error);
			++failures;
			return;
		}

		log(++counter, EXPECTSUCCESS, str);
	}
	
	/**
	 * Verifies arguments are equal.
	 * Does not check type.
	 * Throws an error if arguments are unequal.
	 * 
	 * @param {*} a First argument of comparison.
	 * @param {*} b Second argument of comparison.
	 */
	this.assertEq = function(a, b) {
		const str = "asserted: " + a + " == " + b;
		if(!(a == b)){
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			++failures;
			throw error;
		}

		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies arguments are equal.
	 * Does not check type.
	 * Does not throw an error if arguments are unequal.
	 * 
	 * @param {*} a First argument of comparison.
	 * @param {*} b Second argument of comparison.
	 */
	this.expectEq = function(a, b) {
		const str = "expected: " + a + " == " + b;
		if(!(a == b)){
			const error = new Error(str);
			log(++counter, EXPECTFAIL, error);
			++failures;
			return;
		}

		log(++counter, EXPECTSUCCESS, str);
	}

	/**
	 * Verifies arguments are unequal.
	 * Does not check type.
	 * Throws an error if arguments are equal.
	 * 
	 * @param {*} a First argument of comparison.
	 * @param {*} b Second argument of comparison.
	 */
	this.assertNE = function(a, b) {
		const str = "asserted: " + a + " != " + b;
		if(!(a != b)){
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			++failures;
			throw error;
		}

		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies arguments are unequal.
	 * Does not check type.
	 * Does not throw an error.
	 * 
	 * @param {*} a First argument of comparison.
	 * @param {*} b Second argument of comparison.
	 */
	this.expectNE = function(a, b) {
		const str = "expected: " + a + " != " + b;
		if(!(a != b)){
			const error = new Error(str);
			log(++counter, EXPECTFAIL, error);
			++failures;
			return;
		}

		log(++counter, EXPECTSUCCESS, str);
	}

	/**
	 * Verifies the first argument is strictly lower than the second.
	 * Throws an error if arguments are equal.
	 * 
	 * @param {*} a First argument of comparison, expected lowest.
	 * @param {*} b Second argument of comparison.
	 */
	this.assertLT = function(a, b) {
		const str = "asserted: " + a + " < " + b;
		if(!(a < b)){
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			++failures;
			throw error;
		}

		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies the first argument is strictly lower than the second.
	 * Does not throw an error.
	 * 
	 * @param {*} a First argument of comparison, expected lowest.
	 * @param {*} b Second argument of comparison.
	 */
	this.expectLT = function(a, b) {
		const str = "expected: " + a + " < " + b;
		if(!(a < b)){
			const error = new Error(str);
			log(++counter, EXPECTFAIL, error);
			++failures;
			return;
		}

		log(++counter, EXPECTSUCCESS, str);
	}

	/**
	 * Verifies the first argument is lower or equal to the second.
	 * Throws an error if arguments are equal.
	 * 
	 * @param {*} a First argument of comparison, expected lowest.
	 * @param {*} b Second argument of comparison.
	 */
	this.assertLE = function(a, b) {
		const str = "asserted: " + a + " <= " + b;
		if(!(a <= b)){
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			++failures;
			throw error;
		}

		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies the first argument is lower or equal to the second.
	 * Does not throw an error.
	 * 
	 * @param {*} a First argument of comparison, expected lowest.
	 * @param {*} b Second argument of comparison.
	 */
	this.expectLE = function(a, b) {
		const str = "expected: " + a + " <= " + b;
		if(!(a <= b)){
			const error = new Error(str);
			log(++counter, EXPECTFAIL, error);
			++failures;
			return;
		}

		log(++counter, EXPECTSUCCESS, str);
	}

	/**
	 * Verifies the first argument is strictly greater than the second.
	 * Throws an error if arguments are equal.
	 * 
	 * @param {*} a First argument of comparison, expected greatest.
	 * @param {*} b Second argument of comparison.
	 */
	this.assertGT = function(a, b) {
		const str = "asserted: " + a + " > " + b;
		if(!(a > b)){
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			++failures;
			throw error;
		}

		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies the first argument is strictly greater than the second.
	 * Does not throw an error.
	 * 
	 * @param {*} a First argument of comparison, expected greatest.
	 * @param {*} b Second argument of comparison.
	 */
	this.expectGT = function(a, b) {
		const str = "expected: " + a + " > " + b;
		if(!(a > b)){
			const error = new Error(str);
			log(++counter, EXPECTFAIL, error);
			++failures;
			return;
		}

		log(++counter, EXPECTSUCCESS, str);
	}

	/**
	 * Verifies the first argument is greater or equal to the second.
	 * Throws an error if arguments are equal.
	 * 
	 * @param {*} a First argument of comparison, expected greatest.
	 * @param {*} b Second argument of comparison.
	 */
	this.assertGE = function(a, b) {
		const str = "asserted: " + a + " >= " + b;
		if(!(a >= b)){
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			++failures;
			throw error;
		}

		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies the first argument is greater or equal to the second.
	 * Does not throw an error.
	 * 
	 * @param {*} a First argument of comparison, expected greatest.
	 * @param {*} b Second argument of comparison.
	 */
	this.expectGE = function(a, b) {
		const str = "expected: " + a + " >= " + b;
		if(!(a >= b)){
			const error = new Error(str);
			log(++counter, EXPECTFAIL, error);
			++failures;
			return;
		}

		log(++counter, EXPECTSUCCESS, str);
	}

	/**
	 * Verifies the first argument is equal to the second within error margin.
	 * Throws an error if arguments are equal.
	 * 
	 * @param {number} a First argument of comparison.
	 * @param {number} b Second argument of comparison.
	 * @param {number} epsilon Margin of error of comparison.
	 */
	this.assertNear = function(a, b, epsilon) {
		const str = "expected: " + a + " == " + b + " \u00B1 " + epsilon;
		if(!(Math.abs(a - b) < epsilon)){
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			++failures;
			throw error;
		}

		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies the first argument is equal to the second within error margin.
	 * Does not throw an error.
	 * 
	 * @param {number} a First argument of comparison.
	 * @param {number} b Second argument of comparison.
	 * @param {number} epsilon Margin of error of comparison.
	 */
	this.expectNear = function(a, b, epsilon) {
		const str = "expected: " + a + " == " + b + " \u00B1 " + epsilon;
		if(!((a > b - epsilon) && (a < b + epsilon))){
			const error = new Error(str);
			log(++counter, EXPECTFAIL, error);
			++failures;
			return;
		}

		log(++counter, EXPECTSUCCESS, str);
	}

	/**
	 * Verifies if type of first argument is second argument.
	 * Throws an error if type is wrong.
	 * 
	 * @param {*} a Object to verify for type.
	 * @param {*} type Expected type.
	 */
	this.assertType = function(a, type) {
		const str = "asserted: typeof " + a + " : " + type;
		if(!(typeof a === type)){
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			++failures;
			throw error;
		}

		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies if type of first argument is second argument.
	 * Does not throw an error.
	 * 
	 * @param {*} a Object to verify for type.
	 * @param {*} type Expected type as string.
	 */
	this.expectType = function(a, type) {
		const str = "expected: type " + (typeof a) + " : " + type;
		if(!(typeof a == type)){
			const error = new Error(str);
			log(++counter, EXPECTFAIL, error);
			++failures;
			return;
		}

		log(++counter, EXPECTSUCCESS, str);
	}

	/**
	 * Verifies that the argument function throws an error.
	 * Throws an error if argument function does not throw an error.
	 * 
	 * @param {function} func Function that should throw an error.
	 */
	this.assertThrow = function(func) {
		const str = "asserted: throw " ;
		try {
			func();
		} catch(e) {
			log(++counter, ASSERTSUCCESS, str);
			return;
		}
		const error = new Error(str);
		log(++counter, ASSERTFAIL, error);
		throw error;
	}

	/**
	 * Verifies that the argument function throws an error.
	 * Does not throw an error.
	 * 
	 * @param {function} func Function that should throw an error.
	 */
	 this.expectThrow = function(func) {
		const str = "expected: throw " ;
		try {
			func();
		} catch(e) {
			log(++counter, ASSERTSUCCESS, str);
			return;
		}
		const error = new Error(str);
		log(++counter, ASSERTFAIL, error);
	}

	/**
	 * Verifies that the argument function does not throw an error.
	 * Throws an error if argument function throws an error.
	 * 
	 * @param {function} func Function that should not throw an error.
	 */
	 this.assertNoThrow = function(func) {
		const str = "asserted: no throw " ;
		try {
			func();
		} catch(e) {
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			throw error;
		}
		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies that the argument function does not throw an error.
	 * Does not throw an error.
	 * 
	 * @param {function} func Function that should not throw an error.
	 */
	 this.expectNoThrow = function(func) {
		const str = "expected: no throw " ;
		try {
			func();
		} catch(e) {
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			return;
		}
		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies all elements of arrays are equal.
	 * Does not check type.
	 * Throws an error if arrays are unequal.
	 * 
	 * @param {*} a First argument of comparison.
	 * @param {*} b Second argument of comparison.
	 */
	this.assertEqArrays = function(a, b) {
		let str = "asserted: arrays equal";
		if(a.length != b.length){
			str += ` - unequal lengths (${a.length} : ${b.length})`;
			const error = new Error(str);
			log(++counter, ASSERTFAIL, error);
			++failures;
			console.dir(buffer)
			throw error;
		}

		for(let i = 0; i < a.length; ++i){
			if(!(a[i] == b[i])){
				str += ` - unequal values :  ${i} - ${a[i]} : ${b[i]}`;
				const error = new Error(str);
				log(++counter, ASSERTFAIL, error);
				++failures;
				throw error;
			}		
		}
		
		log(++counter, ASSERTSUCCESS, str);
	}

	/**
	 * Verifies all elements of arrays are equal.
	 * Does not check type.
	 * Does not throw an error if arrays are unequal.
	 * 
	 * @param {*} a First argument of comparison.
	 * @param {*} b Second argument of comparison.
	 */
	this.expectEqArrays = function(a, b) {
		let str = "expected: arrays equal";
		if(a.length != b.length){
			str += ` - unequal lengths (${a.length} : ${b.length})`;
			const error = new Error(str);
			log(++counter, EXPECTFAIL, error);
			++failures;
			return;
		}

		for(let i = 0; i < a.length; ++i){
			if(!(a[i] == b[i])){
				str += ` - unequal values :  ${i} - ${a.length} : ${b.length}`;
				const error = new Error(str);
				log(++counter, EXPECTFAIL, error);
				++failures;
				return;
			}		
		}

		log(++counter, EXPECTSUCCESS, str);
	}

	/**
	 * Displays formated results log of the test.
	 */
	this.showLog = function() {
		buffer.forEach(b => {
			switch(b.type){
				case ASSERTFAIL:
					console.log("%c\u2718 " + b.id + "/" + counter, "color:red");
					console.error(b.result);
					break;
				case ASSERTSUCCESS:
					console.log("%c\u2714 " + b.id + "/" + counter + " " + b.result, "color:green");
					break;
				case EXPECTFAIL:
					console.log("%c\u2718 " + b.id + "/" + counter, "color:red");
					console.warn(b.result);
					break;
				case EXPECTSUCCESS:
					console.log("%c\u2714 " + b.id + "/" + counter + " " + b.result, "color:green");
					break;
				default:
			}
		});

		console.log("%cSuccess: " + (counter - failures) + "/" + counter, "font-weight:bold; color:" + ((failures == 0) ? "green":"red"));
	}
}