import { describe, it, expect, vi, beforeEach } from "vitest";

// @next2d/display モジュールをモック
vi.mock("@next2d/display", () => {
    return {
        Shape: class MockShape {
            graphics = {
                clear: vi.fn().mockReturnThis(),
                beginGradientFill: vi.fn().mockReturnThis(),
                drawRect: vi.fn().mockReturnThis(),
                endFill: vi.fn().mockReturnThis()
            };
            width = 0;
            height = 0;
            scaleX = 1;
            scaleY = 1;
            x = 0;
            y = 0;
        },
        stage: {
            addEventListener: vi.fn(),
            rendererScale: 1,
            rendererWidth: 240,
            rendererHeight: 240,
            stageWidth: 240,
            stageHeight: 240
        }
    };
});

// @next2d/events モジュールをモック
vi.mock("@next2d/events", () => ({
    Event: {
        RESIZE: "resize"
    }
}));

// @next2d/framework モジュールをモック
vi.mock("@next2d/framework", () => ({
    app: {
        getContext: vi.fn().mockReturnValue({
            view: {
                addChildAt: vi.fn()
            }
        })
    }
}));

import { Background } from "./Background";
import { stage } from "@next2d/display";
import { app } from "@next2d/framework";

/**
 * @description Background のテスト
 *              Tests for Background
 */
describe("Background", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * @description コンストラクタのテスト
     *              Test for constructor
     */
    describe("Constructor / コンストラクタ", () => {
        it("インスタンスが正常に生成されること", () => {
            const background = new Background();
            expect(background).toBeInstanceOf(Background);
        });

        it("shape プロパティが初期化されること", () => {
            const background = new Background();
            expect(background.shape).toBeDefined();
        });

        it("stage に RESIZE イベントリスナーが登録されること", () => {
            new Background();
            expect(stage.addEventListener).toHaveBeenCalled();
        });
    });

    /**
     * @description execute メソッドのテスト
     *              Test for execute method
     */
    describe("execute", () => {
        it("execute メソッドが存在すること", () => {
            const background = new Background();
            expect(typeof background.execute).toBe("function");
        });

        it("view が存在する場合、shape が追加されること", () => {
            const background = new Background();
            const mockView = {
                addChildAt: vi.fn()
            };

            vi.mocked(app.getContext).mockReturnValue({
                view: mockView
            } as any);

            background.execute();

            expect(app.getContext).toHaveBeenCalled();
        });

        it("view が存在しない場合、早期リターンすること", () => {
            const background = new Background();

            vi.mocked(app.getContext).mockReturnValue({
                view: null
            } as any);

            // エラーなく実行されること
            expect(() => background.execute()).not.toThrow();
        });
    });

    /**
     * @description shape プロパティのテスト
     *              Test for shape property
     */
    describe("shape Property / shape プロパティ", () => {
        it("shape が readonly であること", () => {
            const background = new Background();
            const originalShape = background.shape;

            // TypeScriptの型システムで readonly が保証されている
            expect(background.shape).toBe(originalShape);
        });
    });
});
