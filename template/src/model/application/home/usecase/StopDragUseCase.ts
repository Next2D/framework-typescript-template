import type { IDraggable } from "@/interface/IDraggable";

/**
 * @description ドラッグ停止のユースケース
 *              Use case for stopping drag
 *
 * @class
 */
export class StopDragUseCase
{
    /**
     * @description ドラッグ可能なオブジェクトのドラッグを停止する
     *              Stop dragging a draggable object
     *
     * @param  {IDraggable} target
     * @return {void}
     * @method
     * @public
     */
    execute (target: IDraggable): void
    {
        target.stopDrag();
    }
}
