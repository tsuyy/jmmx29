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

one.on( "click", function() {
	setNext( 1 );
	console.log( current, next );
	path.call( animate );
} )

zero.on( "click", function() {
	setNext( 0 );
	console.log( current, next );
	path.call( animate );
} )

two.on( "click", function() {
	setNext( 2 );
	console.log( current, next );
	path.call( animate );
} )

three.on( "click", function() {
	setNext( 3 );
	console.log( current, next );
	path.call( animate );
} )

four.on( "click", function() {
	setNext( 4 );
	console.log( current, next );
	path.call( animate );
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