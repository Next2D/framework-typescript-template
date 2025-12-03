import { describe, it, expect, vi, beforeEach } from "vitest";

// 依存モジュールをモック
vi.mock("@next2d/framework", () => ({
    View: vi.fn().mockImplementation(function(this: any) {
        this.addChild = vi.fn();
        this.getChildByName = vi.fn();
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

vi.mock("@/ui/component/molecule/TopBtnMolecule", () => ({
    TopBtnMolecule: vi.fn().mockImplementation(function(this: any, text: string) {
        this.name = "";
        this.x = 0;
        this.y = 0;
        this.height = 20;
        this.mouseChildren = true;
        this.mouseEnabled = true;
        this.addEventListener = vi.fn();
        this.playEntrance = vi.fn();
    })
}));

vi.mock("@/ui/content/TopContent", () => ({
    TopContent: vi.fn().mockImplementation(function(this: any) {
        this.x = 0;
        this.y = 0;
        this.height = 100;
    })
}));

vi.mock("@next2d/events", () => ({
    PointerEvent: {
        POINTER_UP: "pointerUp"
    }
}));

import { TopView } from "./TopView";

/**
 * @description TopView のテスト
 *              Tests for TopView
 */
describe("TopView", () => {
    let mockViewModel: any;

    beforeEach(() => {
        vi.clearAllMocks();
        mockViewModel = {
            getTopText: vi.fn().mockReturnValue("Start"),
            onClickStartButton: vi.fn().mockResolvedValue(undefined)
        };
    });

    /**
     * @description コンストラクタのテスト
     *              Test for constructor
     */
    describe("Constructor / コンストラクタ", () => {
        it("インスタンスが正常に生成されること", () => {
            const view = new TopView(mockViewModel);
            expect(view).toBeInstanceOf(TopView);
        });
    });

    /**
     * @description initialize メソッドのテスト
     *              Test for initialize method
     */
    describe("initialize Method / initialize メソッド", () => {
        it("initialize メソッドが存在すること", () => {
            const view = new TopView(mockViewModel);
            expect(typeof view.initialize).toBe("function");
        });

        it("initialize が非同期で実行されること", async () => {
            const view = new TopView(mockViewModel);
            await expect(view.initialize()).resolves.toBeUndefined();
        });

        it("ViewModel の getTopText が呼び出されること", async () => {
            const view = new TopView(mockViewModel);
            await view.initialize();
            expect(mockViewModel.getTopText).toHaveBeenCalled();
        });
    });

    /**
     * @description onEnter メソッドのテスト
     *              Test for onEnter method
     */
    describe("onEnter Method / onEnter メソッド", () => {
        it("onEnter メソッドが存在すること", () => {
            const view = new TopView(mockViewModel);
            expect(typeof view.onEnter).toBe("function");
        });

        it("onEnter が非同期で実行されること", async () => {
            const view = new TopView(mockViewModel);
            await expect(view.onEnter()).resolves.toBeUndefined();
        });
    });

    /**
     * @description onExit メソッドのテスト
     *              Test for onExit method
     */
    describe("onExit Method / onExit メソッド", () => {
        it("onExit メソッドが存在すること", () => {
            const view = new TopView(mockViewModel);
            expect(typeof view.onExit).toBe("function");
        });

        it("onExit が非同期で実行されること", async () => {
            const view = new TopView(mockViewModel);
            await expect(view.onExit()).resolves.toBeUndefined();
        });
    });
});
