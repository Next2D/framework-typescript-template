import { ViewModel } from "@next2d/framework";
import { NavigateToViewUseCase } from "@/model/application/top/usecase/NavigateToViewUseCase";

/**
 * @class
 * @extends {ViewModel}
 */
export class TopViewModel extends ViewModel
{
    private readonly navigateToViewUseCase: NavigateToViewUseCase;

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
        return void 0;
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