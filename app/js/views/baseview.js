
define(function() {

    var BaseView = Backbone.View.extend({
        initialize: function() {
            this.__initialize();
        },

        __initialize: function() {
            var self = this;
            if ( this.socketEvents && _.size(this.socketEvents) > 0 ) {
                setTimeout(function() {
                    self.delegateSocketEvents( self.socketEvents );
                }, 1);       
            };
        },

        delegateSocketEvents: function( events ) {
            var self = this;
            var method;

            _.each(events, function(value, key) {
                method = value;

                if ( !_.isFunction(method) ) {
                    method = self[value];
                };

                if ( !method ) {
                    throw new Error('Method "' + events[key] + '" does not exist');
                };

                method = _.bind(method, self);
                Howdy.socket.on(key, method);
            });
        }
    });

    return BaseView;
});