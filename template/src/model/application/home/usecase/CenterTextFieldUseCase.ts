import type { ITextField } from "@/interface/ITextField";
import { config } from "@/config/Config";

/**
 * @description テキストフィールド中央揃えのユースケース
 *              Use case for centering text field
 *
 * @class
 */
export class CenterTextFieldUseCase
{
    /**
     * @description テキストフィールドを画面中央に配置する
     *              Center the text field on the screen
     *
     * @param  {ITextField} textField
     * @return {void}
     * @method
     * @public
     */
    execute (textField: ITextField): void
    {
        textField.x = (config.stage.width - textField.width) / 2;
    }
}
