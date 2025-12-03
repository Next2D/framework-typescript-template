import { describe, it, expect, vi, beforeEach } from "vitest";

// 依存モジュールをモック
vi.mock("@next2d/framework", () => ({
    View: vi.fn().mockImplementation(function(this: any) {
        this.addChild = vi.fn();
    })
}));

vi.mock("@/config/Config", () => ({
    config: {
        stage: {
            width: 240,
            height: 240
        }
    }
}));

vi.mock("@/ui/component/molecule/HomeBtnMolecule", () => ({
    HomeBtnMolecule: vi.fn().mockImplementation(function(this: any) {
        this.x = 0;
        this.y = 0;
        this.height = 100;
        this.addEventListener = vi.fn();
    })
}));

vi.mock("@/ui/component/atom/TextAtom", () => ({
    TextAtom: vi.fn().mockImplementation(function(this: any, text: string) {
        this.text = text;
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 20;
        this.addEventListener = vi.fn();
    })
}));

vi.mock("@next2d/events", () => ({
    PointerEvent: {
        POINTER_DOWN: "pointerDown",
        POINTER_UP: "pointerUp"
    },
    Event: {
        CHANGE: "change"
    }
}));

import { HomeView } from "./HomeView";

/**
 * @description HomeView のテスト
 *              Tests for HomeView
 */
describe("HomeView", () => {
    let mockViewModel: any;

    beforeEach(() => {
        vi.clearAllMocks();
        mockViewModel = {
            getHomeText: vi.fn().mockReturnValue("Hello"),
            homeContentPointerDownEvent: vi.fn(),
            homeContentPointerUpEvent: vi.fn(),
            homeTextChangeEvent: vi.fn()
        };
    });

    /**
     * @description コンストラクタのテスト
     *              Test for constructor
     */
    describe("Constructor / コンストラクタ", () => {
        it("インスタンスが正常に生成されること", () => {
            const view = new HomeView(mockViewModel);
            expect(view).toBeInstanceOf(HomeView);
        });
    });

    /**
     * @description initialize メソッドのテスト
     *              Test for initialize method
     */
    describe("initialize Method / initialize メソッド", () => {
        it("initialize メソッドが存在すること", () => {
            const view = new HomeView(mockViewModel);
            expect(typeof view.initialize).toBe("function");
        });

        it("initialize が非同期で実行されること", async () => {
            const view = new HomeView(mockViewModel);
            await expect(view.initialize()).resolves.toBeUndefined();
        });

        it("ViewModel の getHomeText が呼び出されること", async () => {
            const view = new HomeView(mockViewModel);
            await view.initialize();
            expect(mockViewModel.getHomeText).toHaveBeenCalled();
        });
    });

    /**
     * @description onEnter メソッドのテスト
     *              Test for onEnter method
     */
    describe("onEnter Method / onEnter メソッド", () => {
        it("onEnter メソッドが存在すること", () => {
            const view = new HomeView(mockViewModel);
            expect(typeof view.onEnter).toBe("function");
        });

        it("onEnter が非同期で実行されること", async () => {
            const view = new HomeView(mockViewModel);
            await expect(view.onEnter()).resolves.toBeUndefined();
        });
    });

    /**
     * @description onExit メソッドのテスト
     *              Test for onExit method
     */
    describe("onExit Method / onExit メソッド", () => {
        it("onExit メソッドが存在すること", () => {
            const view = new HomeView(mockViewModel);
            expect(typeof view.onExit).toBe("function");
        });

        it("onExit が非同期で実行されること", async () => {
            const view = new HomeView(mockViewModel);
            await expect(view.onExit()).resolves.toBeUndefined();
        });
    });
});
