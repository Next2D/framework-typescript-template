import { describe, it, expect, vi, beforeEach } from "vitest";
import { NavigateToViewUseCase } from "./NavigateToViewUseCase";
import type { ViewName } from "@/interface/IViewName";

// @next2d/framework モジュールをモック
vi.mock("@next2d/framework", () => ({
    app: {
        gotoView: vi.fn().mockResolvedValue(undefined)
    }
}));

import { app } from "@next2d/framework";

/**
 * @description NavigateToViewUseCase のテスト
 *              Tests for NavigateToViewUseCase
 */
describe("NavigateToViewUseCase", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * @description execute メソッドのテスト
     *              Test for execute method
     */
    describe("execute", () => {
        it("app.gotoView が指定された viewName で呼び出されること", async () => {
            const useCase = new NavigateToViewUseCase();
            const viewName: ViewName = "home";

            await useCase.execute(viewName);

            expect(app.gotoView).toHaveBeenCalledWith("home");
            expect(app.gotoView).toHaveBeenCalledTimes(1);
        });

        it("'top' ビューに遷移できること", async () => {
            const useCase = new NavigateToViewUseCase();
            const viewName: ViewName = "top";

            await useCase.execute(viewName);

            expect(app.gotoView).toHaveBeenCalledWith("top");
        });

        it("非同期処理が正常に完了すること", async () => {
            const useCase = new NavigateToViewUseCase();

            await expect(useCase.execute("home")).resolves.toBeUndefined();
        });
    });

    /**
     * @description インスタンス生成のテスト
     *              Test for instance creation
     */
    describe("Instance Creation / インスタンス生成", () => {
        it("インスタンスが正常に生成されること", () => {
            const useCase = new NavigateToViewUseCase();
            expect(useCase).toBeInstanceOf(NavigateToViewUseCase);
        });

        it("execute メソッドを持つこと", () => {
            const useCase = new NavigateToViewUseCase();
            expect(typeof useCase.execute).toBe("function");
        });
    });
});
