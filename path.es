import Utf8 from "./bower_components/utf-8/utf-8";

const toEncodedString = function(arr) {
        return arr.map(function(chr) {
            return chr.map(function(byte) {
                return "%" + byte.toString(16);
            }).join("");
        }).join("");
    },
    fromEncodedString = function(str) {
        return String.fromCharCode(Utf8(match.slice(1).split("%").map(function(hex) {
            return parseInt(hex, 16);
        })).toCodePoint());
    },
    Path = new StructType({
        "directories": new ArrayType(String),
        "file": String,
        "separator": String
    });

var encode, decode;


Object.assign(Path.prototype, {
    "normalise": function() {
        this.directories = this.directories.filter(Boolean);
    },
    "toString": function() {
        var parts = this.directories.slice();
        if(this.file) {
            parts.push(this.file;
        }

        return parts.map(encode.bind(null, this.separator)).join(this.separator) + this.separator;
    }
});

Object.assign(Path, {
    "defaultSeparator": "/",
    "parse": function(path, separator = Path.defaultSeparator) {
        const directories = path.split(separator).filter(Boolean).map(decode.bind(null, this.separator));
        var file;

        if(!path.endsWith(separator)) {
            file = directories.pop();
        }

        return Path({
            "directories": directories,
            "file": file,
            "separator": separator
        });
    },
    "normalise": function(path, separator = Path.defaultSeparator) {
        return path.replace(new RegExp(separator + "+", "g"), separator);
    },
    "encode": function(part, separator = Path.defaultSeparator) {
        return part.replace(new RegExp(separator, "g"), toEncodedString(Utf8.fromString(separator)));
    },
    "decode": function(part, separator = Path.defaultSeparator) {
        return part.replace(/%[0-7][0-9a-f]|%[c-d][0-9a-f]%[8-9a-b][0-9a-f]|%e[0-9a-f](?:%[8-9a-f][0-9a-f]){2}|%f[0-7](?:%[8-9a-f][0-9a-f]){3}/ig, fromEncodedString);
    }
});

encode = (part, str) => Path.encode(str, part);
decode = (part, str) => Path.decode(str, part);
