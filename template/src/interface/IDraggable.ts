/**
 * @description ドラッグ可能なオブジェクトのインターフェース
 *              Interface for draggable objects
 *
 * @interface
 */
export interface IDraggable {
    /**
     * @description ドラッグを開始する
     *              Start dragging
     *
     * @return {void}
     * @method
     */
    startDrag(): void;

    /**
     * @description ドラッグを停止する
     *              Stop dragging
     *
     * @return {void}
     * @method
     */
    stopDrag(): void;
}
