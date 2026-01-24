import type { TopBtnMolecule } from "@/ui/component/molecule/TopBtnMolecule";
import { Tween, Easing, type Job } from "@next2d/ui";
import { Event } from "@next2d/events";

/**
 * @description Topボタンの登場アニメーション
 *              Top Button Entrance Animation
 *
 * @class
 * @public
 */
export class TopBtnShowAnimation {

    private readonly _job: Job;

    /**
     * @param {TopBtnMolecule} sprite
     * @param {() => void} callback
     * @constructor
     * @public
     */
    constructor(
        sprite: TopBtnMolecule,
        callback: () => void
    ) {

        // アニメーションの初期値に設定
        sprite.alpha = 0;

        this._job = Tween.add(sprite,
            {
                "alpha": 0
            },
            {
                "alpha": 1
            }, 0.5, 1, Easing.inQuad
        );

        // 終了アニメーションが完了したら、完了イベントを発行
        this._job.addEventListener(Event.COMPLETE, (): void =>
        {
            callback();
        });
    }

    /**
     * @description アニメーション開始
     *              Start animation
     *
     * @method
     * @public
     */
    start(): void {
        this._job.start();
    }
}