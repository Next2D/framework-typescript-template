import type { IDraggable } from "@/interface/IDraggable";
import { HomeContent } from "@/ui/content/HomeContent";
import { ButtonAtom } from "../atom/ButtonAtom";

/**
 * @description Home画面のボタン分子
 *              Home Screen Button Molecule
 *
 * @class
 * @extends {ButtonAtom}
 * @implements {IDraggable}
 * @public
 */
export class HomeBtnMolecule extends ButtonAtom implements IDraggable
{
    private readonly homeContent: HomeContent;

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();

        this.homeContent = new HomeContent();
        this.homeContent.scaleX = 2;
        this.homeContent.scaleY = 2;

        this.addChild(this.homeContent);
    }

    /**
     * @description ドラッグを開始する
     *              Start dragging
     *
     * @return {void}
     * @method
     * @public
     */
    startDrag (): void
    {
        this.homeContent.startDrag();
    }

    /**
     * @description ドラッグを停止する
     *              Stop dragging
     *
     * @return {void}
     * @method
     * @public
     */
    stopDrag (): void
    {
        this.homeContent.stopDrag();
    }
}