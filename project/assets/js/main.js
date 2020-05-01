$( document ).ready(function() {

	activeSkiers();
	injuryRate();
	legInjury();

	// Get all the paths
	var pathStrings = Array.from( document.querySelectorAll( ".boots" ) )
	.map( path => path.getAttribute( "d" ) );

	// Remove all the paths except the first
	d3.selectAll( ".boots" )
	.filter( function( d, i ) {
		return i;
	} )
	.remove();

	let path = d3.select( ".boots" )
	.style( "display", "block" );

	let outlines = [ "assets/images/1840.png", "assets/images/1928.png", "assets/images/1940.png", "assets/images/1962.png","assets/images/1971.png" ];
	// let outline = d3.select( "#outline" );

	let current = 0;
	let next;

	let zero = d3.select( "#zero" );
	let one = d3.select( "#one" );
	let two = d3.select( "#two" );
	let three = d3.select( "#three" );
	let four = d3.select("#four");



	zero.on( "click", function() {
	setNext( 0 );
	console.log( current, next );
	path.call( animate )
		.attr('class', 'boots');;
	} )

	one.on( "click", function() {
		setNext( 1 );
		console.log( current, next );
		path.attr('class', 'boots scale-down')
			.call( animate );
	} )

	two.on( "click", function() {
	setNext( 2 );
	console.log( current, next );
	path.call( animate )
		.attr('class', 'boots');
	} )

	three.on( "click", function() {
	setNext( 3 );
	console.log( current, next );
	path.call( animate )
		.attr('class', 'boots');;
	} )

	four.on( "click", function() {
	setNext( 4 );
	console.log( current, next );
	path.call( animate )
		.attr('class', 'boots');;
	} )


	function setNext( number ) {
	next = number;
	}

	function findNext( direction ) {
	if ( direction == 1 ) {
		// find the next one
		next = current + 1;
	} else if ( direction == -1 ) {
		// find the last one
		next = current - 1;
	}

	if ( next < 0 ) {
		return 0;
	} else if ( next > pathStrings.length ) {
		return pathStrings.length;
	} else {
		return next;
	}
	}

	function animate( sel ) {
	let start = pathStrings[ current ];
	let end = pathStrings[ next ];

	sel.datum( {
			start,
			end
		} )
		.transition()
		.duration( 1800 )
		.attrTween( "d", ( d ) => flubber.interpolate( d.start, d.end, {
			maxSegmentLength: 8
		} ) )
		.on( "end", function() {
			current = next;
		} )
	}

	$('#zero').click( function(e){
		$('.vh-caption span#vh-yr').text('1840');
		$('#vh-desc').text('Saami boots were designed with the curled up tip to keep the leather strap (aka binding) from coming off the skis.');
		$('#outline_1928').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1840').removeClass('fadeOut faster hide').addClass('fadeIn delay-2s show');
		$('#outline_1940').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1962').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1971').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
	});

	$('#one').click( function(e) {
		$('.vh-caption span#vh-yr').text('1928');
		$('#vh-desc').text('Leather boots with instep straps and cable bindings were invented to hold the alpine skier’s feet down onto the skis.');
		$('#outline_1840').removeClass('show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1928').removeClass('fadeOut faster hide').addClass('fadeIn delay-2s show');
		$('#outline_1940').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1962').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1971').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
	});

	$('#two').click( function(e) {
		$('.vh-caption span#vh-yr').text('1940');
		$('#vh-desc').text('Designed for the 10th Mountain Division Ski Trooper in WWII. These boots did not work well in ice and snow because of the smooth sole.');
		$('#outline_1840').removeClass('show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1928').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1940').removeClass('fadeOut faster hide').addClass('fadeIn delay-2s show');
		$('#outline_1962').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1971').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
	});

	$('#three').click( function(e) {
		$('.vh-caption span#vh-yr').text('1962');
		$('#vh-desc').text('Lange introduced the world’s first plastic boot with metal buckles.');
		$('#outline_1840').removeClass('show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1928').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1940').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1962').removeClass('fadeOut faster hide').addClass('fadeIn delay-2s show');
		$('#outline_1971').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
	});

	$('#four').click( function(e) {
		$('.vh-caption span#vh-yr').text('1971');
		$('#vh-desc').text('Lange introduced the first overlap shell and cuff design with easy-to-use buckles.');
		$('#outline_1840').removeClass('show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1928').removeClass('fadeIn show delay2s').addClass('fadeOut faster hide');
		$('#outline_1940').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1962').removeClass('fadeIn show delay-2s').addClass('fadeOut faster hide');
		$('#outline_1971').removeClass('fadeOut faster hide').addClass('fadeIn delay-2s show');

	});

	$('.pagination span').click(function() {
		$('span').removeClass("active");
		$(this).addClass('active');
	});
});

