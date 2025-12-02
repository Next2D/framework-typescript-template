import { HomeContent } from "@/ui/content/HomeContent";
import { ButtonAtom } from "../atom/ButtonAtom";

/**
 * @description Home画面のボタン分子
 *              Home Screen Button Molecule
 *
 * @class
 * @extends {ButtonAtom}
 * @public
 */
export class HomeBtnMolecule extends ButtonAtom
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();

        const homeContent = new HomeContent();
        homeContent.scaleX = 2;
        homeContent.scaleY = 2;

        this.addChild(homeContent);
    }
}