/**
 * Animated Grid V 0.1
 * jQuery plugin for animate hiding and showing of a grid of several items
 * @author NOE Interactive
 * @website http://noe-interactive.com
 * @licence MIT
 * 
 *  @todo : if you toggle quickly it's could be weird
 */
;(function(namespace, $) {
    "use strict";
    
    var Grid = function($wrapper, options) {

        this.options = $.extend({
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
            //delay between each item
            delay : 100,
            //we animate individualy 5 items, then we group all the others into one animation
            limitToGroup : 5,
            //css transition duration
            transitionDuration : 200,
            //default sorter method if needSorter = true
            sorter : function(a, b) {
                            var at = a.top(),
                            bt = b.top(),
                            al = a.left(),
                            bl = b.left();
                            return at <bt ? -1 : (at === bt && al < bl ? -1 : 1 );
                }
        }, options || {});
        
        this.$items = null;
        this.$wrapper = null;
        this.$$items = [];
        this.visible = true;
        
        if($wrapper && $wrapper.length) {
            this.$wrapper = $wrapper.addClass(this.options.wrapperClass);

            this.$items = this.$wrapper.children();
            this.$$items = [];
            var i = 0, L = this.$items.length;
            for(; i<L; i++)  this.addItem($(this.$items[i]));            
            
            $wrapper.data('animated-grid', this);
        }
    };

    Grid.prototype = {
        addItem : function($item) {
            this.$$items.push({
                $e : $item,  
                top : function() {return Number(this.$e[0].style.top.replace('px', ''));}, 
                left : function() {return Number(this.$e[0].style.left.replace('px', ''));}
            });
        },
       show : function(cb) {
            var scope = this;
            var tmp = this.getActive(),
                    i = 0, L = tmp.length;
            var limit = Math.min(this.options.limitToGroup, L);
            for(; i<limit; i++) {
                
                (function(i) {
                    var delay = i*scope.options.delay;
                    setTimeout(function() {
                        tmp[i].$e.removeClass(scope.options.disappearClass);
                    }, delay);
                })(i);
            }
            setTimeout(function() {
                for(i = limit; i< L; i++) {
                    tmp[i].$e.removeClass(scope.options.disappearClass);
                }
            }, limit * scope.options.delay);
            cb && setTimeout(function() {
                cb();
            }, limit * scope.options.delay + scope.options.transitionDuration);
            this.visible = true;
       },
       hide : function(cb) {
            var scope = this;
            var tmp = this.getActive(),
                  number = tmp.length, i = 0;
            var limit = Math.min(this.options.limitToGroup, number);
            
            for(i = limit; i<number; i++) {
                tmp[i].$e.addClass(scope.options.disappearClass);
            }
            
            for(i =0; i<limit; i++) {
                (function(i) {
                    setTimeout(function() {
                        tmp[i].$e.addClass(scope.options.disappearClass);
                    }, (scope.options.limitToGroup-i) * scope.options.delay);
                })( i );
            }

            cb && setTimeout(function() {
                cb();
            }, limit * scope.options.delay + scope.options.transitionDuration);
            this.visible = false;
       },
       toggle : function(cb) {
            this[this.visible ? 'hide' : 'show'].call(this, cb);
       },
       getActive : function() {
            var tmp = [];
            var scope = this;
            this.each(function() {
                !this.$e.hasClass(scope.options.hiddenClass) && tmp.push(this);
            });
            
            return this.options.needSorter === true ? tmp.sort(this.options.sorter) : tmp;
       },
       each : function(cb) {
            var i = 0, L = this.$$items.length;
            for(; i<L; i++) cb.call(this.$$items[i]);
       }
    };
    
    //you can use OOP' style, or like a jQuery plugin
    namespace.AnimatedGrid = Grid;

    //jQuery plugin
    $.fn.AnimatedGrid = function(opt) {
        var arg = [];
        //copy arguments into an array and remove first entry
        //splice doesn't work because arguments it an object, not an array
        for(var i = 1, L = arguments.length; i<L; i++) {
            arg.push(arguments[i]);
        }
        
        return this.each(function() {
            if(typeof opt === 'object') {
                new Grid($(this), opt);
            } else {
                var instance = $(this).data('animated-grid');
                if(!instance) {
                    throw 'No animated-grid instance found';
                } else {
                    if(typeof instance[opt] === 'function') {
                        instance[opt].apply(instance, arg);
                    } else {
                        instance[opt] = arg[0] || null;
                    }
                }
            }
        });
    };
    
})(window, jQuery);