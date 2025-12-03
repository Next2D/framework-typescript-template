import { describe, it, expect, vi, beforeEach } from "vitest";

// 依存モジュールをモック
vi.mock("@next2d/framework", () => ({
    ViewModel: vi.fn().mockImplementation(function(this: any) {}),
    app: {
        getResponse: vi.fn().mockReturnValue({
            has: vi.fn().mockReturnValue(true),
            get: vi.fn().mockReturnValue({ word: "Hello, Next2D!" })
        })
    }
}));

vi.mock("@/model/application/home/usecase/StartDragUseCase", () => ({
    StartDragUseCase: vi.fn().mockImplementation(function(this: any) {
        this.execute = vi.fn();
    })
}));

vi.mock("@/model/application/home/usecase/StopDragUseCase", () => ({
    StopDragUseCase: vi.fn().mockImplementation(function(this: any) {
        this.execute = vi.fn();
    })
}));

vi.mock("@/model/application/home/usecase/CenterTextFieldUseCase", () => ({
    CenterTextFieldUseCase: vi.fn().mockImplementation(function(this: any) {
        this.execute = vi.fn();
    })
}));

vi.mock("@/config/Config", () => ({
    config: {
        stage: {
            width: 240
        }
    }
}));

import { HomeViewModel } from "./HomeViewModel";
import { app } from "@next2d/framework";

/**
 * @description HomeViewModel のテスト
 *              Tests for HomeViewModel
 */
describe("HomeViewModel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * @description コンストラクタのテスト
     *              Test for constructor
     */
    describe("Constructor / コンストラクタ", () => {
        it("インスタンスが正常に生成されること", () => {
            const vm = new HomeViewModel();
            expect(vm).toBeInstanceOf(HomeViewModel);
        });
    });

    /**
     * @description initialize メソッドのテスト
     *              Test for initialize method
     */
    describe("initialize Method / initialize メソッド", () => {
        it("initialize メソッドが存在すること", () => {
            const vm = new HomeViewModel();
            expect(typeof vm.initialize).toBe("function");
        });

        it("initialize が非同期で実行されること", async () => {
            const vm = new HomeViewModel();
            await expect(vm.initialize()).resolves.toBeUndefined();
        });

        it("app.getResponse が呼び出されること", async () => {
            const vm = new HomeViewModel();
            await vm.initialize();
            expect(app.getResponse).toHaveBeenCalled();
        });
    });

    /**
     * @description getHomeText メソッドのテスト
     *              Test for getHomeText method
     */
    describe("getHomeText Method / getHomeText メソッド", () => {
        it("getHomeText メソッドが存在すること", () => {
            const vm = new HomeViewModel();
            expect(typeof vm.getHomeText).toBe("function");
        });

        it("初期化前は空文字を返すこと", () => {
            const vm = new HomeViewModel();
            expect(vm.getHomeText()).toBe("");
        });

        it("初期化後はテキストを返すこと", async () => {
            const vm = new HomeViewModel();
            await vm.initialize();
            expect(vm.getHomeText()).toBe("Hello, Next2D!");
        });
    });

    /**
     * @description homeContentPointerDownEvent メソッドのテスト
     *              Test for homeContentPointerDownEvent method
     */
    describe("homeContentPointerDownEvent Method", () => {
        it("homeContentPointerDownEvent メソッドが存在すること", () => {
            const vm = new HomeViewModel();
            expect(typeof vm.homeContentPointerDownEvent).toBe("function");
        });

        it("イベントを受け取れること", () => {
            const vm = new HomeViewModel();
            const mockEvent = {
                currentTarget: {
                    startDrag: vi.fn(),
                    stopDrag: vi.fn()
                }
            };

            expect(() => vm.homeContentPointerDownEvent(mockEvent as any)).not.toThrow();
        });
    });

    /**
     * @description homeContentPointerUpEvent メソッドのテスト
     *              Test for homeContentPointerUpEvent method
     */
    describe("homeContentPointerUpEvent Method", () => {
        it("homeContentPointerUpEvent メソッドが存在すること", () => {
            const vm = new HomeViewModel();
            expect(typeof vm.homeContentPointerUpEvent).toBe("function");
        });

        it("イベントを受け取れること", () => {
            const vm = new HomeViewModel();
            const mockEvent = {
                currentTarget: {
                    startDrag: vi.fn(),
                    stopDrag: vi.fn()
                }
            };

            expect(() => vm.homeContentPointerUpEvent(mockEvent as any)).not.toThrow();
        });
    });

    /**
     * @description homeTextChangeEvent メソッドのテスト
     *              Test for homeTextChangeEvent method
     */
    describe("homeTextChangeEvent Method", () => {
        it("homeTextChangeEvent メソッドが存在すること", () => {
            const vm = new HomeViewModel();
            expect(typeof vm.homeTextChangeEvent).toBe("function");
        });

        it("イベントを受け取れること", () => {
            const vm = new HomeViewModel();
            const mockEvent = {
                currentTarget: {
                    width: 100,
                    x: 0
                }
            };

            expect(() => vm.homeTextChangeEvent(mockEvent as any)).not.toThrow();
        });
    });
});
