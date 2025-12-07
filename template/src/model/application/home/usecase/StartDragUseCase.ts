import type { IDraggable } from "@/interface/IDraggable";

/**
 * @description ドラッグ開始のユースケース
 *              Use case for starting drag
 *
 * @class
 */
export class StartDragUseCase {
    /**
     * @description ドラッグ可能なオブジェクトのドラッグを開始する
     *              Start dragging a draggable object
     *
     * @param  {IDraggable} target
     * @return {void}
     * @method
     * @public
     */
    execute (target: IDraggable): void
    {
        target.startDrag();
    }
}
