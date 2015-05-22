/*global define*/

define(
    [],
    function () {
        "use strict";

        var BUBBLE_TEMPLATE = "<mct-container key=\"'bubble'\" " +
                "bubble-title=\"{{bubbleTitle}}\" " +
                "bubble-layout=\"{{bubbleLayout}}\" " +
                "<mct-include key=\"'info-table'\" " +
                "ng-model=\"bubbleModel\">" +
                "</mct-include>" +
                "</mct-container>";

        /**
         * Displays informative content ("info bubbles") for the user.
         * @constructor
         */
        function InfoService($compile, $document, $window, $rootScope) {
            var template = $compile(BUBBLE_TEMPLATE);

            function display(templateKey, title, content, position) {
                var body = $document.find('body'),
                    scope = $rootScope.$new(),
                    winDim = [$window.innerWidth, $window.innerHeight],
                    goLeft = position[0] > (window[0] / 2),
                    goUp = position[1] > (window[1] / 2),
                    bubble;

                // Pass model & container parameters into the scope
                scope.bubbleModel = content;
                scope.bubbleLayout = (goUp ? 'arw-btm' : 'arw-top') + ' ' +
                        (goLeft ? 'arw-right' : 'arw-left');
                scope.bubbleTitle = title;

                // Create the context menu
                bubble = template(scope);

                // Position the bubble
                bubble.css('position', 'absolute');
                if (goLeft) {
                    bubble.css('right', (winDim[0] - position[0]) + 'px');
                } else {
                    bubble.css('left', position[0] + 'px');
                }
                if (goUp) {
                    bubble.css('bottom', (winDim[1] - position[1]) + 'px');
                } else {
                    bubble.css('top', position[1] + 'px');
                }

                // Add the menu to the body
                body.append(bubble);

                // Return a function to dismiss the bubble
                return function () { bubble.remove(); };
            }

            return {
                /**
                 * Display an info bubble at the specified location.
                 * @param {string} templateKey template to place in bubble
                 * @param {string} title title for the bubble
                 * @param {*} content content to pass to the template, via
                 *        `ng-model`
                 * @param {number[]} x,y position of the info bubble, in
                 *        pixel coordinates.
                 * @returns {Function} a function that may be invoked to
                 *          dismiss the info bubble
                 */
                display: display
            };
        }

        return InfoService;
    }
);