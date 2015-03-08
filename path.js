import PercentEncoder from "percent-encoder";

const pEncoder = Symbol("encoder"),
    decode = PercentEncoder.decode.bind(PercentEncoder);

class Path {
    constructor(desc, encoder = undefined) {
        Object.assign(this, Object.assign({
            directories: [],
            file: undefined,
            separator: Path.defaultSeparator
        }, desc));
        this[pEncoder] = encoder || new PercentEncoder([this.separator]);
    }

    normalise() {
        this.directories = this.directories.filter(Boolean);
    }

    toString() {
        var parts = this.directories.slice();
        if(this.file) {
            parts.push(this.file);
        }

        return parts.map(this[pEncoder]).join(this.separator);
    }
}

Object.assign(Path, {
    defaultSeparator: "/",
    parse(pathStr, separator = Path.defaultSeparator, encoder = undefined) {
        const directories = pathStr.split(separator).map(decode);

        let file;
        if(!pathStr.endsWith(separator)) {
            file = directories.pop();
        }

        const path = new this({
            directories: directories,
            file: file,
            separator: separator
        }, separator, encoder);

        path.normalise();
        return path;
    },
    normalise(pathStr, separator = Path.defaultSeparator) {
        return pathStr.replace(new RegExp(`(?:${separator})+`, "g"), separator);
    }
});

export default Path;
