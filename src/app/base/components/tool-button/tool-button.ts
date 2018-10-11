export class ToolButton {
    private _icon: string;
    private _size: string;

    constructor(icon?: string) {
        this._icon = icon;
    }

    get icon() {
        return this._icon;
    }
    set icon(value) {
        this._icon = value;
    }

    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
    }
}
