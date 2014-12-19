import PercentEncoder from "./bower_components/percent-encoder/percent-encoder";

const pEncoder = Symbol("encoder"),
    decode = PercentEncoder.decode.bind(PercentEncoder),
    Path = Object.freeze(Object.assign(function(desc) {
            Object.assign(this, desc);
        }, {
            "defaultSeparator": "/",
            "parse": function(path, separator = Path.defaultSeparator) {
                const directories = path.split(separator).map(decode);
                
                var file;
                if(!path.endsWith(separator)) {
                    file = directories.pop();
                }

                const path = new Path({
                    "directories": directories,
                    "file": file,
                    "separator": separator
                });
                path.normalise();

                const encoder = new PercentEncoder([separator]);
                this[pEncode] = encoder.encode.bind(encoder);

                return path;
            },
            "normalise": function(path, separator = Path.defaultSeparator) {
                return path.replace(new RegExp(`(?:${separator})+`, "g"), separator);
            }
        }));

Object.assign(Path.prototype, {
    "normalise": function() {
        this.directories = this.directories.filter(Boolean);
    },
    "toString": function() {
        var parts = this.directories.slice();
        if(this.file) {
            parts.push(this.file);
        }

        return parts.map(this[pEncode]).join(this.separator);
    }
});
