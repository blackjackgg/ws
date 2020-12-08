var egret =require("./egret.min")

var e = function(e) {
    function r(r) {
        var i = e.call(this) || this;
        i._addikey = [],
            i._index = 0,
            i._addikey = [],
            i._buffer = new t.ByteArrayLittle,
            i._addikey[0] = new AddiKey,
            i._addikey[0].sd = i.linearity(r),
            i._addikey[0].dis1 = 55,
            i._addikey[0].dis2 = 24,
            i._addikey[1] = new AddiKey,
            i._addikey[1].sd = i.linearity((2863311530 & r) >>> 1 | (1431655765 & r) << 1),
            i._addikey[1].dis1 = 57,
            i._addikey[1].dis2 = 7,
            i._addikey[2] = new AddiKey,
            i._addikey[2].sd = i.linearity(~((4042322160 & r) >>> 4 | (252645135 & r) << 4)),
            i._addikey[2].dis1 = 58,
            i._addikey[2].dis2 = 19;
        for (var n = 0; 3 > n; ++n) {
            for (var a = i._addikey[n].sd, s = 0; 64 > s; ++s) {
                for (var o = 0; 32 > o; ++o)
                    a = i.linearity(a);
                i._addikey[n].buffer[s] = a
            }
            i._addikey[n].carry = 0,
                i._addikey[n].index = 63
        }
        return i._index = 4096,
            i._buffer.length = 4096,
            i._bufferBytes = t.ByteArrayUtils.getBytes(i._buffer),
            i
    }
    return __extends(r, e),
        r.prototype.linearity = function(t) {
            var e = (1 & (t >>> 31 ^ t >>> 6 ^ t >>> 4 ^ t >>> 2 ^ t >>> 1 ^ t)) << 31 | t >>> 1;
            return 0 > e ? 4294967296 + e : e
        }
        ,
        r.prototype.addikeyNext = function(t) {
            t.index++,
                t.index &= 63;
            var e = (64 | t.index) - t.dis1 & 63
                , r = (64 | t.index) - t.dis2 & 63;
            t.buffer[t.index] = (t.buffer[e] + t.buffer[r]) % 4294967296,
                t.carry = t.buffer[t.index] < t.buffer[e] || t.buffer[t.index] < t.buffer[r] ? 1 : 0
        }
        ,
        r.prototype.generate = function() {
            this._buffer.position = 0,
                this._index = 0;
            for (var t = 0; 1024 > t; ++t) {
                var e = this._addikey[0].carry + this._addikey[1].carry + this._addikey[2].carry;
                if (0 == e || 3 == e)
                    this.addikeyNext(this._addikey[0]),
                        this.addikeyNext(this._addikey[1]),
                        this.addikeyNext(this._addikey[2]);
                else
                    for (var r = 2 == e ? 1 : 0, i = 0; 3 > i; ++i)
                        this._addikey[i].carry == r && this.addikeyNext(this._addikey[i]);
                this._buffer.writeUnsignedInt(this._addikey[0].buffer[this._addikey[0].index] ^ this._addikey[1].buffer[this._addikey[1].index] ^ this._addikey[2].buffer[this._addikey[2].index])
            }
        }
        ,
        r.prototype.encode = function(e, r, i) {
            if (void 0 === i && (i = 0),
            e && !(0 >= r)) {
                var n = t.ByteArrayUtils.getBytes(e);
                do {
                    var a = 4096 - this._index;
                    0 >= a && this.generate(),
                    a > r && (a = r),
                        r -= a;
                    for (var s = 0; a > s; s++,
                        i++,
                        this._index++)
                        n[i] ^= this._bufferBytes[this._index]
                } while (r > 0)
            }
        }
        ,
        r
}(egret.HashObject);

var decrypter = new e(4026531843 ^ 84048153)



