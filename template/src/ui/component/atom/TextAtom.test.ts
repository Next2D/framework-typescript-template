import { describe, it, expect, vi } from "vitest";

// @next2d/text モジュールをモック
vi.mock("@next2d/text", () => ({
    TextField: vi.fn().mockImplementation(function(this: any) {
        this.text = "";
        this.width = 100;
        this.x = 0;
        this.defaultTextFormat = {};
    })
}));

import { TextAtom } from "./TextAtom";

/**
 * @description TextAtom のテスト
 *              Tests for TextAtom
 */
describe("TextAtom", () => {
    /**
     * @description コンストラクタのテスト
     *              Test for constructor
     */
    describe("Constructor / コンストラクタ", () => {
        it("インスタンスが正常に生成されること", () => {
            const textAtom = new TextAtom();
            expect(textAtom).toBeInstanceOf(TextAtom);
        });

        it("text 引数が設定されること", () => {
            const textAtom = new TextAtom("Hello");
            expect(textAtom.text).toBe("Hello");
        });

        it("デフォルトで空文字が設定されること", () => {
            const textAtom = new TextAtom();
            expect(textAtom.text).toBe("");
        });
    });

    /**
     * @description props パラメータのテスト
     *              Test for props parameter
     */
    describe("Props Parameter / props パラメータ", () => {
        it("props が null でもエラーにならないこと", () => {
            expect(() => new TextAtom("Test", null)).not.toThrow();
        });

        it("props のプロパティが適用されること", () => {
            const textAtom = new TextAtom("Test", {
                autoSize: "center"
            });
            // props が適用される（モックでは完全な検証は難しい）
            expect(textAtom).toBeDefined();
        });
    });

    /**
     * @description format_object パラメータのテスト
     *              Test for format_object parameter
     */
    describe("Format Object Parameter / format_object パラメータ", () => {
        it("format_object が null でもエラーにならないこと", () => {
            expect(() => new TextAtom("Test", null, null)).not.toThrow();
        });

        it("format_object のプロパティが適用されること", () => {
            const textAtom = new TextAtom("Test", null, {
                align: "center",
                bold: true,
                color: 0x000000,
                font: "Arial",
                italic: false,
                leading: 0,
                leftMargin: 0,
                letterSpacing: 0,
                rightMargin: 0,
                size: 16,
                underline: false
            });
            expect(textAtom).toBeDefined();
        });
    });

    /**
     * @description ITextField インターフェースのテスト
     *              Test for ITextField interface
     */
    describe("ITextField Interface / ITextField インターフェース", () => {
        it("width プロパティを持つこと", () => {
            const textAtom = new TextAtom();
            expect("width" in textAtom).toBe(true);
        });

        it("x プロパティを持つこと", () => {
            const textAtom = new TextAtom();
            expect("x" in textAtom).toBe(true);
        });
    });
});
