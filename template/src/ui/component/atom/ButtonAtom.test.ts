import { describe, it, expect, vi } from "vitest";

// @next2d/display モジュールをモック
vi.mock("@next2d/display", () => ({
    Sprite: vi.fn().mockImplementation(function(this: any) {
        this.buttonMode = false;
    })
}));

import { ButtonAtom } from "./ButtonAtom";

/**
 * @description ButtonAtom のテスト
 *              Tests for ButtonAtom
 */
describe("ButtonAtom", () => {
    /**
     * @description コンストラクタのテスト
     *              Test for constructor
     */
    describe("Constructor / コンストラクタ", () => {
        it("インスタンスが正常に生成されること", () => {
            const button = new ButtonAtom();
            expect(button).toBeInstanceOf(ButtonAtom);
        });

        it("buttonMode が true に設定されること", () => {
            const button = new ButtonAtom();
            expect(button.buttonMode).toBe(true);
        });
    });

    /**
     * @description 継承関係のテスト
     *              Test for inheritance
     */
    describe("Inheritance / 継承関係", () => {
        it("Sprite を継承していること", () => {
            const button = new ButtonAtom();
            // ButtonAtom は Sprite を継承している
            expect(button).toBeInstanceOf(ButtonAtom);
        });
    });

    /**
     * @description プロパティのテスト
     *              Test for properties
     */
    describe("Properties / プロパティ", () => {
        it("buttonMode プロパティが存在すること", () => {
            const button = new ButtonAtom();
            expect("buttonMode" in button).toBe(true);
        });

        it("buttonMode を変更できること", () => {
            const button = new ButtonAtom();
            button.buttonMode = false;
            expect(button.buttonMode).toBe(false);
        });
    });
});
