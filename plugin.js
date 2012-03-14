/* using the twitter bootstrap pattern */
/* concepts from: http://twitter.github.com/bootstrap/assets/js/bootstrap-modal.js
                  http://twitter.github.com/bootstrap/assets/js/bootstrap-scrollspy.js
                  http://twitter.github.com/bootstrap/assets/js/bootstrap-alert.js     */

/* ctrl-f replace 'PLUGIN' 'Plugin' 'plugin' with your plugin name */

!function( $ ){

  "use strict"

 /* PLUGIN CLASS DEFINITION
  * ====================== */

  var Plugin = function ( element, options ) {
    this.options = options
    this.$element = $(element)
        .delegate('[data-dismiss="plugin"]', 'click.dismiss.plugin', $.proxy(this.hide, this))
  }

  Plugin.prototype = {

      constructor: Plugin

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        if (this.isShown) return

        var that = this
        this.isShown = true
        this.$element.trigger('show')

        privateFn.call(this, function() {
          // this is your callback
        })

      }

    , hide: function ( e ) {
        e && e.preventDefault()

        if (!this.isShown) return

        var that = this
        this.isShown = false

        this.$element.trigger('show')
        
      }
  }


 /* PLUGIN PRIVATE METHODS
  * ===================== */

  function privateFn( callback ) {
    var that = this;

    // do things that private fns do

    callback()
  }


 /* PLUGIN PLUGIN DEFINITION
  * ======================= */

  $.fn.plugin = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('plugin')
        , options = $.extend({}, $.fn.plugin.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('plugin', (data = new Plugin(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.plugin.defaults = {

  }

  $.fn.plugin.Constructor = Plugin


 /* PLUGIN DATA-API
  * ============== */

  $(function () {
    $('body').on('click.plugin.data-api', '[data-toggle="plugin"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('plugin') ? 'toggle' : $.extend({}, $target.data(), $this.data())

      e.preventDefault()
      $target.plugin(option)
    })
  })

}( window.jQuery );