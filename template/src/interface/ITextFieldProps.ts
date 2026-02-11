import type { ITextFieldAutoSize } from "./ITextFieldAutoSize";
import type { ITextFieldType } from "./ITextFieldType";

export interface ITextFieldProps {
    selectable?: boolean;
    mouseEnabled?: boolean;
    wordWrap?: boolean;
    multiline?: boolean;
    maxChars?: number;
    background?: boolean;
    backgroundColor?: number;
    border?: boolean;
    borderColor?: number;
    autoSize?: ITextFieldAutoSize;
    type?: ITextFieldType;
}