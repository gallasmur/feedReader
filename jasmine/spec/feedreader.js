/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has an url defined and it is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed).toBeDefined();
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name defined and it is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed).toBeDefined();
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('element is hidden by default', function() {
            expect($('body')).toBeDefined();
            //As we see, the visibility of the menu is achieved with the
            //menu-hidden class, so we check for it.
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('changes visibility when the menu icon is clicked', function() {
             //We check if the 'menu-hidden' class is toggled between clicks
             expect($('.menu-icon-link')).toBeDefined();
             $('.menu-icon-link').click();
             expect($('body').hasClass('menu-hidden')).toBe(false);

             $('.menu-icon-link').click();
             expect($('body').hasClass('menu-hidden')).toBe(true);
         })
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        //In the beforeEach funnction we call the loadFeed function and wait to be
        //notified when our callback is called, the called done to let jasmine know.
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('are loaded when loadFeed() is called', function(done) {
            expect($('.feed')).toBeDefined();
            expect($('.feed .entry-link .entry').length > 0).toBe(true);
            done();
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        //To test this assumption we are going to save the previous state in the variable
        //html, then call loadFeed a second time and store it in html2 and compare the 2 of
        //them. The calls are being made asynchronously and the done method is called when
        //the second call is finished.
        let html = '';
        let html2 = '';
        beforeEach(function (done) {
            loadFeed(0, function () {
                html = $('.feed').html();

                loadFeed(1, function() {
                    html2 = $('.feed').html();
                    done();
                });
            });
        });
        
        it('actually change the content', function (done) {
            console.log(html, html2)
            expect(html).not.toEqual(html2);
            done();
        });
    });
}());
