/*
 donutChart
 This lib will use pure canvas to draw donut chart.
 V1.0
 */
var donutChart = function () {

    var defaultColors = ["#4bb2c5", "#EAA228", "#c5b47f", "#579575", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc", "#c747a3", "#cddf54", "#FBD178", "#26B4E3", "#bd70c7", 'red', 'orange', 'lightgreen', 'green', 'blue', 'lightblue'];

    function draw(elementId, donutValues) {

        canvas = document.getElementById(elementId);
        ctx = canvas.getContext("2d");
        // define the donut
        cX = Math.floor(canvas.width / 2);
        cY = Math.floor(canvas.height / 2);
        radius = Math.min(cX, cY);
        totalArc = -Math.PI; // start at 9:00 O'clock
        var total = 0;
        donutValues.forEach(function (item) {
            total += item;
        });
        total = total / 100;
        var percentages = [];
        var colors = [];
        var separator = 0.8;
        for (var i = 0; i < donutValues.length; i++) {
            if (donutValues[i]) {
                var p = donutValues[i] / total - separator;
                percentages.push(p, separator);
                colors.push(defaultColors[i], 'white');
            }
        }
        // remove the white separator if only one status
        if (percentages.length == 2) {
            percentages = [100];
            colors.pop();
        }

        // draw the background gradient
        gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "white");
        ctx.fillStyle = gradient;
        drawDonut(percentages, colors);
    }

    var canvas, cX, cY, ctx, radius, totalArc, gradient;

    // draw a wedge
    function drawWedge2(percent, color) {
        // calc size of our wedge in radians
        var WedgeInRadians = percent / 100 * 360 * Math.PI / 180;
        // draw the wedge
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cX, cY);
        ctx.arc(cX, cY, radius, totalArc, totalArc + WedgeInRadians, false);

        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
        // sum the size of all wedges so far
        // We will begin our next wedge at this sum
        totalArc += WedgeInRadians;
    }

    // draw the donut one wedge at a time
    function drawDonut(data, colors) {

        for (var i = 0; i < data.length; i++) {
            drawWedge2(data[i], colors[i]);
        }
        // cut out an inner-circle == donut
        ctx.beginPath();
        ctx.moveTo(cX, cY);
        ctx.fillStyle = gradient;
        ctx.arc(cX, cY, radius * .60, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    return {
        draw: draw
    }
}();

