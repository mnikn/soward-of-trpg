export class ToolButton {
  private _icon: string;
  private _size: string;
  private _tip: string;
  private _onClick: (...args) => void;

  constructor(icon?: string, tip?: string, onClick?: (...args) => void) {
    this._icon = icon;
    this._tip = tip;
    this._onClick = onClick;
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

  get tip(): string {
    return this._tip;
  }

  set tip(value: string) {
    this._tip = value;
  }

  get onClick(): (...args) => void {
    return this._onClick;
  }

  set onClick(value: (...args) => void) {
    this._onClick = value;
  }
}
