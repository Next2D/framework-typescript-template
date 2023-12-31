import { TextField } from "@next2d/display";
import type { TextFormat } from "@next2d/text";

/**
 * @param  {string} text
 * @param  {object} [props=null]
 * @param  {object} [format=null]
 * @return {TextField}
 * @method
 * @public
 */
export const execute = (
    text: string = "",
    props: any = null,
    format: any = null
): TextField => {

    const textField: TextField = new TextField();

    if (props) {

        const keys: string[] = Object.keys(props);
        for (let idx: number = 0; idx < keys.length; idx++) {

            const name: string = keys[idx];

            if (!(name in textField)) {
                continue;
            }

            // @ts-ignore
            textField[name] = props[name];
        }
    }

    if (format) {

        const textFormat: TextFormat = textField.defaultTextFormat;

        const keys: string[] = Object.keys(format);
        for (let idx: number = 0; idx < keys.length; idx++) {

            const name = keys[idx];

            if (!(name in textFormat)) {
                continue;
            }

            // @ts-ignore
            textFormat[name] = format[name];
        }

        textField.defaultTextFormat = textFormat;
    }

    textField.text = text;

    return textField;
};
