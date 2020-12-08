// 定位canvas元素的方法
            var canvas = document.querySelector("canvas");
            var ctx = canvas.getContext("2d");
            canvas.addEventListener("click", function __handler__(evt) {
                var x = evt.clientX;
                var y = evt.clientY;
                var rect = canvas.getBoundingClientRect();
                x -= rect.left;
                y -= rect.top;
                console.log("x:", x, "; offsetX:", evt.offsetX, "; layerX:", evt.layerX);
                console.log("y:", y, "; offsetY:", evt.offsetY, "; layerY:", evt.layerY);

            });