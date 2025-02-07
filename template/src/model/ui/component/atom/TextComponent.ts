import { TextField } from "@next2d/text";

/**
 * @description 指定したテキストフィールドを生成します。
 *              Generates the specified text field.
 *
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

    const textField = new TextField();

    if (props) {

        const keys: string[] = Object.keys(props);
        for (let idx = 0; idx < keys.length; idx++) {

            const name = keys[idx];

            if (!(name in textField)) {
                continue;
            }

            // @ts-ignore
            textField[name] = props[name];
        }
    }

    if (format) {

        const textFormat = textField.defaultTextFormat;

        const keys: string[] = Object.keys(format);
        for (let idx = 0; idx < keys.length; idx++) {

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