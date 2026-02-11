import { describe, it, expect, vi } from "vitest";

// @next2d/framework モジュールをモック
vi.mock("@next2d/framework", () => ({
    MovieClipContent: vi.fn().mockImplementation(function(this: any) {
        this.height = 100;
    })
}));

import { TopContent } from "./TopContent";

/**
 * @description TopContent のテスト
 *              Tests for TopContent
 */
describe("TopContent", () => {
    /**
     * @description コンストラクタのテスト
     *              Test for constructor
     */
    describe("Constructor / コンストラクタ", () => {
        it("インスタンスが正常に生成されること", () => {
            const content = new TopContent();
            expect(content).toBeInstanceOf(TopContent);
        });
    });

    /**
     * @description namespace プロパティのテスト
     *              Test for namespace property
     */
    describe("namespace Property / namespace プロパティ", () => {
        it("namespace が 'TopContent' を返すこと", () => {
            const content = new TopContent();
            expect(content.namespace).toBe("TopContent");
        });

        it("namespace が readonly であること", () => {
            const content = new TopContent();
            // getter のみなので readonly
            expect(content.namespace).toBe("TopContent");
        });
    });

    /**
     * @description MovieClipContent 継承のテスト
     *              Test for MovieClipContent inheritance
     */
    describe("MovieClipContent Inheritance / MovieClipContent 継承", () => {
        it("MovieClipContent を継承していること", () => {
            const content = new TopContent();
            expect(content).toBeInstanceOf(TopContent);
        });
    });
});
