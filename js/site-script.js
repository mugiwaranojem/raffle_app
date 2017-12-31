var randomize = {
	entries: [],
	result: null,
	od: null,
	defaultMax: 1000,

	init: function() {
		const self = this;

		self.result = document.querySelector('.result');
		$('#add-entry').on('click', self.addEntry);
		$('#randomize').on('click', self.getRandom);
		$('#input-num').keypress(self.inputKeyPress);
		$('#reset').on('click', self.reset);
		$('table.entries-table').on('click', 'a.remove-entry', self.removeEntry);

	},

	getRandom: function() {
		const self = randomize,
			numLength = parseInt(self.entries.length);

		let randomIndex = null;

		if( numLength <= 0 ) return false;

		$('#result-name').css('display', 'none');

		randomIndex = Math.floor(Math.random() * numLength);

		od = new Odometer({
			el: self.result,
			value: self.defaultMax,
			format: 'd'
		});

		let splitResult = self.entries[randomIndex].split('|'),
			resultNum = splitResult[1];

		od.update( resultNum );

		setTimeout(function(){

			$('td.entry-val').removeClass('active');
			$('#'+resultNum).find('td.entry-val')
				.addClass('active');

			
			$('#result-name').text(splitResult[0])
				.fadeIn();

		}, 2000);

		console.log(randomIndex);

	},

	addEntry: function() {
		const self = randomize,
			inputVal = $('#input-num').val(),
			inputName = $('#input-name').val();

		if( !inputVal || !inputName) return;

		if( self.entries.indexOf(inputVal) == 1 ) {
			alert("Entry exist");
			return;
		}

		self.entries.push( inputName + '|' + inputVal);

		$('.entries-table tbody').append(
			'<tr id="'+ inputVal +'">' +
				'<td class="entry-val">'+ inputVal + ' - ' + inputName +'</td>' +
				'<td><a href="#" class="remove-entry" title="remove">x</a></td>' +
			'</tr>'
		);

		self.clearText();

		console.log(self.entries);

	},

	removeEntry: function(e) {
		e.preventDefault();

		const self = randomize,
			entryVal = $(this).closest('tr').attr('id'),
			index = self.entries.indexOf(entryVal);


		$('#'+entryVal).fadeOut(function(){
			$('#'+entryVal).remove();
		});

		self.entries.splice(index, 1);

		self.clearText();

		console.log( self.entries );

	},

	inputKeyPress: function(e) {
		const self = randomize;
		if (e.which == 13 || e.keyCode == 13) {
			self.addEntry();
		}
	},

	clearText: function() {
		$('#input-num').val('');
		$('#input-name').val('');
	},

	reset: function() {
		const self = randomize;

		let y = confirm('Reset entries?');

		if( !y ) return;

		self.entries = [];
		self.result.innerText = '';

		$('.entries-table tbody').find('tr').remove();
		$('#result-name').css('display', 'none')

	}
}

randomize.init();