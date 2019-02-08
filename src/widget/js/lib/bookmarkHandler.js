"use strict";

module.exports = {
    add: function add(state, place, index, cb) {
        var options = {
            id: place.id,
            title: place.title,
            payload: {link: encodeURIComponent(place.id)},
            icon: place.image
        };
        var callback = function callback(err) {
            if (err) throw err;
            state.places[index].bookmarked = true;
            cb();
        };
        buildfire.bookmarks ? buildfire.bookmarks.add(options, callback) : null;
    },
    delete: function _delete(state, place, index, cb) {
        var callback = function callback(err) {
            if (err) throw err;
            state.places[index].bookmarked = false;
            cb();
        };
        buildfire.bookmarks ? buildfire.bookmarks.delete(place.id, callback) : null;
    },
    _getAll: function _getAll(callback) {
        var cb = function cb(err, bookmarks) {
            if (err) throw err;
            callback(bookmarks);
        };
        buildfire.bookmarks ? buildfire.bookmarks.getAll(cb) : cb(null, []);
    },
    sync: function sync(state, callback) {
        this._getAll(function (bookmarks) {
            console.log(bookmarks);

            var bookmarkIds = [];
            bookmarks.forEach(function (bookmark) {
                bookmarkIds.push(bookmark.id);
            });

            
            state.places.map(function (place) {
                var isBookmarked = bookmarkIds.includes(place.id);
                if (isBookmarked) {
                    place.bookmarked = true;
                } else {
                    place.bookmarked = false;
                }
            });

            callback()
            
        });
    }
};