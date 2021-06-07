"use strict";

var spans = document.querySelectorAll('.word span');
spans.forEach(function (span, idx) {
  span.addEventListener('click', function (e) {
    e.target.classList.add('active');
  });
  span.addEventListener('animationend', function (e) {
    e.target.classList.remove('active');
  }); // Initial animation

  setTimeout(function () {
    span.classList.add('active');
  }, 750 * (idx + 1));
});

(function ($) {
  "use strict"; // LINE PROGRESS BAR

  enableLineProgress(); // RADIAL PROGRESS BAR

  enableRadialProgress(); // ACCORDIAN

  panelAccordian();
  $(window).on('load', function () {
    // ISOTOPE PORTFOLIO WITH FILTER
    if (isExists('.portfolioContainer')) {
      var $container = $('.portfolioContainer');
      $container.isotope({
        filter: '*',
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      $('.portfolioFilter a').click(function () {
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');
        var selector = $(this).attr('data-filter');
        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
          }
        });
        return false;
      });
    }
  });
  $('a[href="#"]').on('click', function (event) {
    return;
  });

  if ($.isFunction($.fn.fluidbox)) {
    $('a').fluidbox();
  }

  var countCounterUp = 0;
  var a = 0;
  countCounterUp = enableCounterUp(countCounterUp);
  $(window).on('scroll', function () {
    countCounterUp = enableCounterUp(countCounterUp);
  });
})(jQuery);

function panelAccordian() {
  var panelTitle = $('.panel-title');
  panelTitle.on('click', function () {
    $('.panel-title').removeClass('active');
    $(this).toggleClass('active');
  });
}

function enableRadialProgress() {
  $(".radial-progress").each(function () {
    var $this = $(this),
        progPercent = $this.data('prog-percent');
    var bar = new ProgressBar.Circle(this, {
      color: '#aaa',
      strokeWidth: 3,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {},
      from: {
        color: '#023502',
        width: 1
      },
      to: {
        color: '#05ef0a',
        width: 3
      },
      // Set default step function for all animate calls
      step: function step(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
        var value = Math.round(circle.value() * 100);

        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value);
        }
      }
    });
    $(this).waypoint(function () {
      bar.animate(progPercent);
    }, {
      offset: "90%"
    });
  });
}

function enableLineProgress() {
  $(".line-progress").each(function () {
    var $this = $(this),
        progPercent = $this.data('prog-percent');
    var bar = new ProgressBar.Line(this, {
      strokeWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      color: '#ff6363',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {
        width: '100%',
        height: '100%'
      },
      text: {
        style: {}
      },
      from: {
        color: '#FFEA82'
      },
      to: {
        color: '#ED6A5A'
      },
      step: function step(state, bar) {
        bar.setText(Math.round(bar.value() * 100) + ' %');
      }
    });
    $(this).waypoint(function () {
      bar.animate(progPercent);
    }, {
      offset: "90%"
    });
  });
}

function enableCounterUp(a) {
  var counterElement;

  if (isExists('#counter')) {
    counterElement = $('#counter');
  } else {
    return;
  }

  var oTop = $('#counter').offset().top - window.innerHeight;

  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.counter-value').each(function () {
      var $this = $(this),
          countDuration = $this.data('duration'),
          countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
        countNum: countTo
      }, {
        duration: countDuration,
        easing: 'swing',
        step: function step() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function complete() {
          $this.text(this.countNum);
        }
      });
    });
    a = 1;
  }

  return a;
}

function isExists(elem) {
  if ($(elem).length > 0) {
    return true;
  }

  return false;
}