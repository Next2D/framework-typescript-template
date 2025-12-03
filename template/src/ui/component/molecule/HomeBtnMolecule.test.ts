import { describe, it, expect, vi } from "vitest";

// 依存モジュールをモック
vi.mock("@/ui/content/HomeContent", () => ({
    HomeContent: vi.fn().mockImplementation(function(this: any) {
        this.scaleX = 1;
        this.scaleY = 1;
        this.startDrag = vi.fn();
        this.stopDrag = vi.fn();
    })
}));

vi.mock("@next2d/display", () => ({
    Sprite: vi.fn().mockImplementation(function(this: any) {
        this.buttonMode = false;
        this.addChild = vi.fn();
    })
}));

import { HomeBtnMolecule } from "./HomeBtnMolecule";

/**
 * @description HomeBtnMolecule のテスト
 *              Tests for HomeBtnMolecule
 */
describe("HomeBtnMolecule", () => {
    /**
     * @description コンストラクタのテスト
     *              Test for constructor
     */
    describe("Constructor / コンストラクタ", () => {
        it("インスタンスが正常に生成されること", () => {
            const molecule = new HomeBtnMolecule();
            expect(molecule).toBeInstanceOf(HomeBtnMolecule);
        });

        it("buttonMode が true に設定されること", () => {
            const molecule = new HomeBtnMolecule();
            expect(molecule.buttonMode).toBe(true);
        });
    });

    /**
     * @description IDraggable インターフェースのテスト
     *              Test for IDraggable interface
     */
    describe("IDraggable Interface / IDraggable インターフェース", () => {
        it("startDrag メソッドを持つこと", () => {
            const molecule = new HomeBtnMolecule();
            expect(typeof molecule.startDrag).toBe("function");
        });

        it("stopDrag メソッドを持つこと", () => {
            const molecule = new HomeBtnMolecule();
            expect(typeof molecule.stopDrag).toBe("function");
        });

        it("startDrag を呼び出せること", () => {
            const molecule = new HomeBtnMolecule();
            expect(() => molecule.startDrag()).not.toThrow();
        });

        it("stopDrag を呼び出せること", () => {
            const molecule = new HomeBtnMolecule();
            expect(() => molecule.stopDrag()).not.toThrow();
        });
    });

    /**
     * @description ButtonAtom 継承のテスト
     *              Test for ButtonAtom inheritance
     */
    describe("ButtonAtom Inheritance / ButtonAtom 継承", () => {
        it("ButtonAtom を継承していること", () => {
            const molecule = new HomeBtnMolecule();
            // ButtonAtom の機能を持っていること
            expect("buttonMode" in molecule).toBe(true);
        });
    });
});
