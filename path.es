import utf8 from "./bower_components/utf-8/utf-8";

const Path = Object.freeze(Object.assign(function(desc) {
            Object.assign(this, desc);
        }, {
            "defaultSeparator": "/",
            "parse": function(path, separator = Path.defaultSeparator) {
                const directories = path.split(separator);
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
            parts.push(this.file;
        }

        return parts.join(this.separator) + this.separator;
    }
});
