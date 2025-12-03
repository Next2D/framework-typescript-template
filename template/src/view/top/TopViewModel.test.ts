import { describe, it, expect, vi, beforeEach } from "vitest";

// 依存モジュールをモック
vi.mock("@next2d/framework", () => ({
    ViewModel: vi.fn().mockImplementation(function(this: any) {}),
    app: {
        getResponse: vi.fn().mockReturnValue({
            has: vi.fn().mockReturnValue(true),
            get: vi.fn().mockReturnValue({ word: "Start" })
        })
    }
}));

vi.mock("@/model/application/top/usecase/NavigateToViewUseCase", () => ({
    NavigateToViewUseCase: vi.fn().mockImplementation(function(this: any) {
        this.execute = vi.fn().mockResolvedValue(undefined);
    })
}));

import { TopViewModel } from "./TopViewModel";
import { app } from "@next2d/framework";

/**
 * @description TopViewModel のテスト
 *              Tests for TopViewModel
 */
describe("TopViewModel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * @description コンストラクタのテスト
     *              Test for constructor
     */
    describe("Constructor / コンストラクタ", () => {
        it("インスタンスが正常に生成されること", () => {
            const vm = new TopViewModel();
            expect(vm).toBeInstanceOf(TopViewModel);
        });
    });

    /**
     * @description initialize メソッドのテスト
     *              Test for initialize method
     */
    describe("initialize Method / initialize メソッド", () => {
        it("initialize メソッドが存在すること", () => {
            const vm = new TopViewModel();
            expect(typeof vm.initialize).toBe("function");
        });

        it("initialize が非同期で実行されること", async () => {
            const vm = new TopViewModel();
            await expect(vm.initialize()).resolves.toBeUndefined();
        });

        it("app.getResponse が呼び出されること", async () => {
            const vm = new TopViewModel();
            await vm.initialize();
            expect(app.getResponse).toHaveBeenCalled();
        });
    });

    /**
     * @description getTopText メソッドのテスト
     *              Test for getTopText method
     */
    describe("getTopText Method / getTopText メソッド", () => {
        it("getTopText メソッドが存在すること", () => {
            const vm = new TopViewModel();
            expect(typeof vm.getTopText).toBe("function");
        });

        it("初期化前は空文字を返すこと", () => {
            const vm = new TopViewModel();
            expect(vm.getTopText()).toBe("");
        });

        it("初期化後はテキストを返すこと", async () => {
            const vm = new TopViewModel();
            await vm.initialize();
            expect(vm.getTopText()).toBe("Start");
        });
    });

    /**
     * @description onClickStartButton メソッドのテスト
     *              Test for onClickStartButton method
     */
    describe("onClickStartButton Method / onClickStartButton メソッド", () => {
        it("onClickStartButton メソッドが存在すること", () => {
            const vm = new TopViewModel();
            expect(typeof vm.onClickStartButton).toBe("function");
        });

        it("onClickStartButton が非同期で実行されること", async () => {
            const vm = new TopViewModel();
            await expect(vm.onClickStartButton()).resolves.toBeUndefined();
        });
    });
});
