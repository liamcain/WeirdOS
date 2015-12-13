///<reference path="../globals.ts" />
/* ------------
 MemoryManager.ts

 Requires globals.ts
 ------------ */
var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
        }
        MemoryManager.prototype.init = function () { };
        MemoryManager.clear = function (start, end) {
            for (var i = start; i < end; i++) {
                _Memory.write("00", i);
            }
        };
        MemoryManager.allocate = function (program) {
            // Find free block
            var blockStart = -1;
            for (var i = 0; i < this.SIZE; i += 256) {
                if (_Memory.read(i) === "00") {
                    blockStart = i;
                    break;
                }
            }
            if (blockStart == -1) {
                return -1;
            }
            for (var i = 0; i < program.length / 2; i++) {
                _Memory.write(program.substr(i + i, 2), blockStart + i);
            }
            return blockStart;
        };
        MemoryManager.read = function (location, pcb) {
            return _Memory.read(pcb.base + location);
        };
        MemoryManager.clearAll = function () {
            for (var i = 0; i < this.SIZE; i++) {
                _Memory.clear(i);
            }
        };
        MemoryManager.write = function (bytes, location, pcb) {
            var len = bytes.length;
            for (var i = 0; i < len / 2; i++) {
                _Memory.write(bytes.substr(i * 2, 2), pcb.base + location + i);
            }
        };
        MemoryManager.SIZE = 768;
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
