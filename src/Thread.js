/**
 * @module whynot
 */
define(
	[
		'./Trace'
	],
	function(
		Trace
		) {
		'use strict';

		/**
		 * A Thread represents scheduled execution of a specific instruction.
		 *
		 * @class Thread
		 * @constructor
		 *
		 * @param {Number} pc               Program counter for the scheduled instruction
		 * @param {Thread} [parentThread]   The thread that spawned this thread
		 * @param {Number} [badness]        Increasing badness decreases thread priority
		 * @param {Number} generationNumber The index of the genaration this Thread is running in
		 */
		function Thread(pc, programLength, parentThread, badness, generationNumber) {
			this.pc = pc;

			var prefixTrace = parentThread ? parentThread.trace : null;
			this.trace = new Trace(pc, programLength, prefixTrace, generationNumber);

			this.badness = badness || 0;

			this._generationNumber = generationNumber;
		}

		/**
		 * Another thread joins the current, combine traces and badness.
		 *
		 * @method join
		 *
		 * @param  {Thread} [otherParentThread] Parent thread of the other thread
		 * @param  {Number} [badness]           Badness of the other thread
		 */
		Thread.prototype.join = function(otherParentThread, badness) {
			this.trace.join(otherParentThread.trace);
			this.badness = Math.max(this.badness, badness);
		};

		/**
		 * Compacts the Thread's footprint when its Generation ends.
		 *
		 * @method compact
		 */
		Thread.prototype.compact = function() {
			this.trace.compact();
		};

		return Thread;
	}
);
