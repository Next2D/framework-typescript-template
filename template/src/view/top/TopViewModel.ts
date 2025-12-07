import { ViewModel, app } from "@next2d/framework";
import { NavigateToViewUseCase } from "@/model/application/top/usecase/NavigateToViewUseCase";

/**
 * @class
 * @extends {ViewModel}
 */
export class TopViewModel extends ViewModel {

    private readonly navigateToViewUseCase: NavigateToViewUseCase;
    private topText: string = "";

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
        this.navigateToViewUseCase = new NavigateToViewUseCase();
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
        this.topText = response.has("TopText")
            ? (response.get("TopText") as { word: string }).word
            : "";
    }

    /**
     * @description Topテキストを取得
     *              Get top text
     *
     * @return {string}
     * @method
     * @public
     */
    getTopText (): string
    {
        return this.topText;
    }

    /**
     * @description スタートボタンがクリックされたときの処理
     *              Handle when the start button is clicked
     *
     * @return {Promise<void>}
     * @method
     * @public
     */
    async onClickStartButton (): Promise<void>
    {
        await this.navigateToViewUseCase.execute("home");
    }
}