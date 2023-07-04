import type {
    TextField,
    TextFormat
} from "@next2d/text";

/**
 * @class
 */
export class TextComponent
{
    /**
     * @param  {string} text
     * @param  {object} [props=null]
     * @param  {object} [format=null]
     * @return {TextField}
     * @method
     * @static
     */
    static factory (
        text: string = "",
        props: any = null,
        format: any = null
    ): TextField {

        const { TextField } = next2d.text;

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
    }
}
