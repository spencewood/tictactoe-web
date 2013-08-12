/*jshint expr: true*/
/*global define:true*/
/*global describe:true*/
/*global it:true*/
/*global after:true*/

define(function(require){
    var storageController = require('../../../app/controllers/storage-controller');
    var settings = require('settings');
    var chai = require('chai');
    chai.should();

    describe('Storage Controller', function(){
        after(function(){
            localStorage.removeItem('foo');
        });

        describe('#store', function(){
            it('should store a value in local storage', function(){
                storageController.store('foo', 'bar');
                localStorage.getItem('foo').should.equal('bar');
            });
        });

        describe('#get', function(){
            it('should get the value from local storage', function(){
                localStorage.setItem('foo', 'baz');
                storageController.get('foo').should.equal('baz');
            });
        });
    });
});