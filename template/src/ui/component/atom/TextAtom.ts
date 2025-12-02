import type { ITextFormatObject } from "@/interface/ITextFormatObject";
import { TextField } from "@next2d/text";

/**
 * @description テキストの基本コンポーネント
 *              Basic component of text
 *
 * @class
 * @extends {TextField}
 * @public
 */
export class TextAtom extends TextField {

    /**
     * @param {string} [text=""]
     * @param {ITextFieldProps | null} [props=null]
     * @param {ITextFormatObject | null} [format_object=null]
     * @constructor
     * @public
     */
    constructor(
        text: string = "",
        props: any | null = null,
        format_object: ITextFormatObject | null = null
    ) {
        super();

        if (props) {
            const keys: string[] = Object.keys(props);
            for (let idx = 0; idx < keys.length; idx++) {

                const name = keys[idx];

                if (!(name in this)) {
                    continue;
                }

                // @ts-ignore
                this[name] = props[name];
            }
        }

        if (format_object) {
            const keys: string[] = Object.keys(format_object);
            if (keys.length) {
                const textFormat = this.defaultTextFormat;
                for (let idx = 0; idx < keys.length; idx++) {

                    const name = keys[idx];

                    if (!(name in textFormat)) {
                        continue;
                    }

                    // @ts-ignore
                    textFormat[name] = format_object[name];
                }

                this.defaultTextFormat = textFormat;
            }
        }

        this.text = text;
    }
}