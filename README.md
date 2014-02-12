This little jQuery plugin can be usefull if you want to smoothly animate showing and hidding of a grid of several items.


###Samples 

[Classic](http://noe-interactive.com/demo/animated-grid/examples/classic/)

[Custom animation](http://noe-interactive.com/demo/animated-grid/examples/custom-animation/)

[Filters](http://noe-interactive.com/demo/animated-grid/examples/filter/)

[Packery](http://noe-interactive.com/demo/animated-grid/examples/packery/)

As you can see in these examples, it animates items one after the other, by simply adding a class, so you can do whatever you want with pure css transitions.

###How to use
The first things to do is to load the javascript file, (you need to load jQuery before too)

For example : 
````HTML
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="/Path/To/AnimatedGrid.js"></script>
````
You can also load the default css (for having this [default effect](http://noe-interactive.com/demo/animated-grid/examples/classic/) ) in your head.
````HTML
<link href="/Path/To/default.css" media="all" rel="stylesheet" type="text/css"  />
````
Then, you have to build your html markup, basically a grid is a wrapper div, with several grid item in.
````HTML
<div class="animated-grid">
    <div class="grid-item"></div>
    <div class="grid-item"></div>
    <div class="grid-item"></div>
</div>
````

It's the moment to make some code! In your javascript, simply call the plugin on the div wrapper : 
````javascript
$('.animated-grid').AnimatedGrid();
````
You have some usefull options that you can pass when you instanciate : 

````javascript
$('.animated-grid').AnimatedGrid({
    //is the DOM in the same order than display ?
    //set to true if you use a script like Packery that change order
    //let false in a simple float:left case for example
    needSorter : false,
    //wrapper class
    wrapperClass : 'animated-grid',
    //ignore element having this class
    hiddenClass : 'grid-item-hidden',
    //class for the disappear animation
    disappearClass : 'grid-item-disappear',
    //by default, Animated grid considere each children of the wrapper has an item $wrapper.children()
    //you can pass a selector as a string to look for only this item : $wrapper.find(selector)
    itemsSelector : null,
    //delay between each item
    delay : 100,
    //we animate individualy 5 items, then we group all the others into one animation
    limitToGroup : 5,
    //css transition duration
    transitionDuration : 200,
    //default sorter method if needSorter = true
    sorter : function(a, b) {
        var at = a.top(), bt = b.top(), al = a.left(), bl = b.left();
        return at <bt ? -1 : (at === bt && al < bl ? -1 : 1 );
    }
});
````

And you have some method you can call on the instance, to get the AnimateGrid instance use 
````javascript
var grid = $('.animated-grid').data('animated-grid');
````

so : 
````javascript
//get your grid element
var $grid = $('.animated-grid');

//instanciate the AnimatedGrid on it
$grid.AnimatedGrid({/*some options */ });

//get the instance
var grid = $grid.data('animated-grid');

//do what you want
grid.show();//show
grid.hide(); //hide
grid.toggle(); //if is hide : show, else hide

//these 3 methods can take as first argument a callback to wait the end of the effect : 
grid.show(function() {
    //all items are showed
})

//you can also call the method as string : 
$grid.AnimatedGrid('show', function() {
    //all items are showed
});

//other methods : 
grid.addItem($('#new-item')); //add a new item in the grid

grid.each(function() { //method used internaly to quickly loop on the item
    console.log(this);
    //this.$e is the jQuery object
    this.$e.addClass('hidden');
});

````

Look at the source code of examples to see different usage!
