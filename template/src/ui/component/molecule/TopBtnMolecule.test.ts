import { describe, it, expect, vi } from "vitest";

// 依存モジュールをモック
vi.mock("@/ui/animation/top/TopBtnEntranceAnimation", () => ({
    TopBtnEntranceAnimation: vi.fn().mockImplementation(function(this: any) {
        this.start = vi.fn();
    })
}));

vi.mock("@/ui/component/atom/TextAtom", () => ({
    TextAtom: vi.fn().mockImplementation(function(this: any, text: string) {
        this.text = text;
        this.width = 100;
        this.height = 20;
        this.x = 0;
        this.y = 0;
    })
}));

vi.mock("@next2d/display", () => ({
    Sprite: vi.fn().mockImplementation(function(this: any) {
        this.buttonMode = false;
        this.addChild = vi.fn();
    })
}));

import { TopBtnMolecule } from "./TopBtnMolecule";

/**
 * @description TopBtnMolecule のテスト
 *              Tests for TopBtnMolecule
 */
describe("TopBtnMolecule", () => {
    /**
     * @description コンストラクタのテスト
     *              Test for constructor
     */
    describe("Constructor / コンストラクタ", () => {
        it("インスタンスが正常に生成されること", () => {
            const molecule = new TopBtnMolecule("Test");
            expect(molecule).toBeInstanceOf(TopBtnMolecule);
        });

        it("text 引数を受け取ること", () => {
            const molecule = new TopBtnMolecule("Hello");
            expect(molecule).toBeDefined();
        });

        it("buttonMode が true に設定されること", () => {
            const molecule = new TopBtnMolecule("Test");
            expect(molecule.buttonMode).toBe(true);
        });
    });

    /**
     * @description playEntrance メソッドのテスト
     *              Test for playEntrance method
     */
    describe("playEntrance Method / playEntrance メソッド", () => {
        it("playEntrance メソッドを持つこと", () => {
            const molecule = new TopBtnMolecule("Test");
            expect(typeof molecule.playEntrance).toBe("function");
        });

        it("playEntrance がコールバックを受け取ること", () => {
            const molecule = new TopBtnMolecule("Test");
            const callback = vi.fn();

            expect(() => molecule.playEntrance(callback)).not.toThrow();
        });
    });

    /**
     * @description ButtonAtom 継承のテスト
     *              Test for ButtonAtom inheritance
     */
    describe("ButtonAtom Inheritance / ButtonAtom 継承", () => {
        it("ButtonAtom を継承していること", () => {
            const molecule = new TopBtnMolecule("Test");
            expect("buttonMode" in molecule).toBe(true);
        });
    });
});
