import type { ITextField } from "@/interface/ITextField";
import type { ITextFieldProps } from "@/interface/ITextFieldProps";
import type { ITextFormatObject } from "@/interface/ITextFormatObject";
import { TextField } from "@next2d/text";

/**
 * @description テキストの基本コンポーネント
 *              Basic component of text
 *
 * @class
 * @extends {TextField}
 * @implements {ITextField}
 * @public
 */
export class TextAtom extends TextField implements ITextField {

    /**
     * @param {string} [text=""]
     * @param {ITextFieldProps | null} [props=null]
     * @param {ITextFormatObject | null} [format_object=null]
     * @constructor
     * @public
     */
    constructor(
        text: string = "",
        props: ITextFieldProps | null = null,
        format_object: ITextFormatObject | null = null
    ) {
        super();

        if (props) {
            const keys = Object.keys(props) as (keyof ITextFieldProps)[];
            for (let idx = 0; idx < keys.length; idx++) {

                const name = keys[idx];
                const value = props[name];

                if (!(name in this) || value === undefined) {
                    continue;
                }

                (this as unknown as Record<keyof ITextFieldProps, unknown>)[name] = value;
            }
        }

        if (format_object) {
            const keys = Object.keys(format_object) as (keyof ITextFormatObject)[];
            if (keys.length) {
                const textFormat = this.defaultTextFormat;
                for (let idx = 0; idx < keys.length; idx++) {

                    const name = keys[idx];
                    const value = format_object[name];

                    if (!(name in textFormat)) {
                        continue;
                    }

                    (textFormat as unknown as Record<keyof ITextFormatObject, unknown>)[name] = value;
                }

                this.defaultTextFormat = textFormat;
            }
        }

        this.text = text;
    }
}