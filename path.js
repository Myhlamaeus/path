import PercentEncoder from "percent-encoder";

const pEncoder = Symbol("encoder"),
    decode = PercentEncoder.decode.bind(PercentEncoder);

class Path {
    constructor(desc) {
        Object.assign(this, desc);
    }

    normalisen() {
            this.directories = this.directories.filter(Boolean);
        }

    toString() {
        var parts = this.directories.slice();
        if(this.file) {
            parts.push(this.file);
        }

        return parts.map(this[pEncode]).join(this.separator);
    }
}

Object.assign(Path, {
    defaultSeparator: "/",
    parse(path, separator = Path.defaultSeparator) {
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
    normalise(path, separator = Path.defaultSeparator) {
        return path.replace(new RegExp(`(?:${separator})+`, "g"), separator);
    }
});

export default Path;
