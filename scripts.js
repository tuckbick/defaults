var util = {

	fns : {
		forceRepaint: function(el) {
			el = $(el)
			var n = document.createTextNode(' ')
			el.appendChild(n)
			(function(){n.parentNode.removeChild(n)}).defer()
		},
		forceReflow: function(el) {
			el.offsetWidth
		}
	},

	common : function() {
		// init modal alerts?
	},

	home : function() {
		// cats.fluff()
	}

}

$(document).ready(function() {
	var $body = $('body'),
		id = $body.attr('id')
	util.page = $body.find('.wrapper')
	util.common.call(util)
	util.hasOwnProperty(id) && util[id].call(util)
})