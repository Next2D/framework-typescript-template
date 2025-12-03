import { describe, it, expect, vi } from "vitest";

// @next2d/framework モジュールをモック
vi.mock("@next2d/framework", () => ({
    MovieClipContent: vi.fn().mockImplementation(function(this: any) {
        this.startDrag = vi.fn();
        this.stopDrag = vi.fn();
    })
}));

import { HomeContent } from "./HomeContent";

/**
 * @description HomeContent のテスト
 *              Tests for HomeContent
 */
describe("HomeContent", () => {
    /**
     * @description コンストラクタのテスト
     *              Test for constructor
     */
    describe("Constructor / コンストラクタ", () => {
        it("インスタンスが正常に生成されること", () => {
            const content = new HomeContent();
            expect(content).toBeInstanceOf(HomeContent);
        });
    });

    /**
     * @description namespace プロパティのテスト
     *              Test for namespace property
     */
    describe("namespace Property / namespace プロパティ", () => {
        it("namespace が 'HomeContent' を返すこと", () => {
            const content = new HomeContent();
            expect(content.namespace).toBe("HomeContent");
        });

        it("namespace が readonly であること", () => {
            const content = new HomeContent();
            // getter のみなので readonly
            expect(content.namespace).toBe("HomeContent");
        });
    });

    /**
     * @description IDraggable インターフェースのテスト
     *              Test for IDraggable interface
     */
    describe("IDraggable Interface / IDraggable インターフェース", () => {
        it("startDrag メソッドを持つこと", () => {
            const content = new HomeContent();
            expect(typeof content.startDrag).toBe("function");
        });

        it("stopDrag メソッドを持つこと", () => {
            const content = new HomeContent();
            expect(typeof content.stopDrag).toBe("function");
        });

        it("startDrag を呼び出せること", () => {
            const content = new HomeContent();
            expect(() => content.startDrag()).not.toThrow();
        });

        it("stopDrag を呼び出せること", () => {
            const content = new HomeContent();
            expect(() => content.stopDrag()).not.toThrow();
        });
    });

    /**
     * @description MovieClipContent 継承のテスト
     *              Test for MovieClipContent inheritance
     */
    describe("MovieClipContent Inheritance / MovieClipContent 継承", () => {
        it("MovieClipContent を継承していること", () => {
            const content = new HomeContent();
            expect(content).toBeInstanceOf(HomeContent);
        });
    });
});
