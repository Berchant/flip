/*!
 * jQuery 3D Flip v1.0
 * https://github.com/nnattawat/flip
 *
 * Copyright 2014, Nattawat Nonsung
 */

(function( $ ) {
  var flip = function(dom, flipedRotate) {
    dom.data("fliped", true);
    dom.css({
      transform: flipedRotate
    });
  };

  var unflip = function(dom) {
    dom.data("fliped", false);
    dom.css({
      transform: "rotatex(0deg)"
    });
  };

  $.fn.flip = function(options) {
    this.each(function(){
      var $dom = $(this);

      if (options !== undefined && typeof(options) == "boolean") { // Force flip the DOM
        if (options) {
          flip($dom, $dom.data("flipedRotate"));
        } else {
          unflip($dom);
        }
      } else { //Init flipable DOM
        var settings = $.extend({
          axis: "y",
          reverse: false,
          trigger: "click"
        }, options );

        var prespective;
        var direction = settings.reverse? "-180deg" : "180deg";
        
        if (settings.axis.toLowerCase() == "x") {
          prespective = $dom.height() * 2;
          // save rotating css to DOM for manual flip
          $dom.data("flipedRotate", "rotatex(" + direction + ")");
        } else {
          prespective = $dom.width() * 2;
          $dom.data("flipedRotate", "rotatey(" + direction + ")");
        }
        var flipedRotate = $dom.data("flipedRotate");
        var height = $dom.height();
        var width = $dom.width();

        $dom.wrap("<div class='flip'></div>");
        $dom.parent().css({
          perspective: prespective,
          position: "relative"
        });

        $dom.css({
          "transform-style": "preserve-3d",
          transition: "all 0.5s ease-out"
        });

        $dom.find(".front").wrap("<div class='front-wrap'></div>");
        $dom.find(".back").wrap("<div class='back-wrap'></div>");

        $dom.find(".front, .back, .front-wrap, .back-wrap").outerHeight(height);
        $dom.find(".front, .back, .front-wrap, .back-wrap").outerWidth(width);

        $dom.find(".front-wrap, .back-wrap").css({
          position: "absolute",
          "backface-visibility": "hidden"
        });

        $dom.find(".back-wrap").css({
          transform: flipedRotate
        });

        if (settings.trigger.toLowerCase() == "click") {
          $dom.click(function() {
            if ($dom.data("fliped")) {
              unflip($dom);
            } else {
              flip($dom, flipedRotate);
            }
          });
        } else if (settings.trigger.toLowerCase() == "hover") {
          $dom.hover(function() {
            flip($dom, flipedRotate);
          }, function() {
            unflip($dom);
          });
        }
      }
    });

    return this;
  };
 
}( jQuery ));