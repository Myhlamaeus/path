import Utf8 from "./bower_components/utf-8/utf-8";

const toEncodedString = function(arr) {
        return arr.map(function(chr) {
            return chr.map(function(byte) {
                return "%" + byte.toString(16);
            }).join("");
        }).join("");
    },
    Path = new StructType({
        "directories": new ArrayType(String),
        "file": String,
        "separator": String
    });


Object.assign(Path.prototype, {
    "normalise": function() {
        this.directories = this.directories.filter(Boolean);
    },
    "toString": function() {
        var path = this.directories.join(this.separator) + this.separator;

        if(this.file) {
            path += this.file;
        }

        return path;
    }
});

Object.assign(Path, {
    "defaultSeparator": "/",
    "parse": function(path, separator = Path.defaultSeparator) {
        const directories = path.split(separator).filter(Boolean);
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
        return part.replace(/%[a-z]/ig, function(matches) {

        });
    }
});
