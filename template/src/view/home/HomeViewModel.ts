import type { IDraggable } from "@/interface/IDraggable";
import type { ITextField } from "@/interface/ITextField";
import { ViewModel, app } from "@next2d/framework";
import type { PointerEvent, Event } from "@next2d/events";
import { StartDragUseCase } from "@/model/application/home/usecase/StartDragUseCase";
import { StopDragUseCase } from "@/model/application/home/usecase/StopDragUseCase";
import { CenterTextFieldUseCase } from "@/model/application/home/usecase/CenterTextFieldUseCase";
import { config } from "@/config/Config";

/**
 * @class
 * @extends {ViewModel}
 */
export class HomeViewModel extends ViewModel
{
    private readonly startDragUseCase: StartDragUseCase;
    private readonly stopDragUseCase: StopDragUseCase;
    private readonly centerTextFieldUseCase: CenterTextFieldUseCase;
    private homeText: string = "";

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
        this.startDragUseCase = new StartDragUseCase();
        this.stopDragUseCase = new StopDragUseCase();
        this.centerTextFieldUseCase = new CenterTextFieldUseCase();
    }

    /**
     * @return {Promise<void>}
     * @method
     * @override
     * @public
     */
    async initialize (): Promise<void>
    {
        const response = app.getResponse();
        this.homeText = response.has("HomeText") ? response.get("HomeText").word : "";
    }

    /**
     * @description ホームテキストを取得
     *              Get home text
     *
     * @return {string}
     * @method
     * @public
     */
    getHomeText (): string
    {
        return this.homeText;
    }

    /**
     * @description ホームコンテンツのポインターダウン時の処理
     *              Handle when home content is pointer down
     *
     * @param  {PointerEvent} event
     * @return {void}
     * @method
     * @public
     */
    homeContentPointerDownEvent (event: PointerEvent): void
    {
        const target = event.currentTarget as unknown as IDraggable;
        this.startDragUseCase.execute(target);
    }

    /**
     * @description ホームコンテンツのポインターアップ時の処理
     *              Handle when home content is pointer up
     *
     * @param  {PointerEvent} event
     * @return {void}
     * @method
     * @public
     */
    homeContentPointerUpEvent (event: PointerEvent): void
    {
        const target = event.currentTarget as unknown as IDraggable;
        this.stopDragUseCase.execute(target);
    }

    /**
     * @description ホームテキストの変更時の処理
     *              Handle when home text is changed
     *
     * @param  {Event} event
     * @return {void}
     * @method
     * @public
     */
    homeTextChangeEvent (event: Event): void
    {
        const textField = event.currentTarget as unknown as ITextField;
        this.centerTextFieldUseCase.execute(textField, config.stage.width);
    }
}