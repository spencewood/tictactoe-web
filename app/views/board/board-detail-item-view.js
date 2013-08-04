define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var DisposableView = require('views/_disposable-view');
    var BoardDetailItemSpotView = require('views/board/board-detail-item-spot-view');
    var boardDetailItem = require('hbs!templates/board-detail-item');

    var View = DisposableView.extend({
        events: {
            'click .join': 'join'
        },

        initialize: function(){
            DisposableView.prototype.initialize.call(this);

            this.setElement(boardDetailItem(this.model.toJSON()));
            
            this.model.on('change:spots', this.rerender.bind(this));
            this.model.on('change:players', this.updateJoinable.bind(this));
            this.model.on('change:status', this.rerender.bind(this));
        },

        dispose: function(){
            this.model.off('change:spots');
            this.model.off('change:players');
            this.model.off('change:status');
        },

        join: function(e){
            e.preventDefault();
            this.model.join(Player.get('id'));
        },

        render: function(){
            var $board = this.$el.find('.board');

            this.model.get('spots').forEach(function(spot, idx){
                $board.append(
                    this.addSubview(
                        new BoardDetailItemSpotView({
                            idx: idx,
                            spot: spot,
                            model: this.model
                        })
                    ).render().el
                );
            }.bind(this));

            this.updateJoinable();

            return this;
        },

        rerender: function(){
            //this.$el.find('.board').empty();
            this.destroySubviews();
            this.render();
        },

        updateJoinable: function(){
            if(this.model.canJoin(Player.get('id'))){
                this.$el.addClass('joinable');
            }
            else{
                this.$el.removeClass('joinable');
            }
        }
    });

    return View;
});