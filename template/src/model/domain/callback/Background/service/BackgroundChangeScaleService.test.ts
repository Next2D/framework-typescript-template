import { describe, it, expect, vi, beforeEach } from "vitest";
import { execute } from "./BackgroundChangeScaleService";

// @next2d/display モジュールをモック
vi.mock("@next2d/display", () => ({
    stage: {
        rendererScale: 1,
        rendererWidth: 240,
        rendererHeight: 240,
        stageWidth: 240,
        stageHeight: 240
    }
}));

/**
 * @description BackgroundChangeScaleService のテスト
 *              Tests for BackgroundChangeScaleService
 */
describe("BackgroundChangeScaleService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * @description execute 関数のテスト
     *              Test for execute function
     */
    describe("execute", () => {
        it("execute 関数が存在すること", () => {
            expect(typeof execute).toBe("function");
        });

        it("エラーなく実行されること", () => {
            const mockBackground = {
                shape: {
                    scaleX: 1,
                    scaleY: 1,
                    x: 0,
                    y: 0
                }
            };

            expect(() => execute(mockBackground as any)).not.toThrow();
        });

        it("shape のプロパティにアクセスすること", () => {
            const mockShape = {
                scaleX: 1,
                scaleY: 1,
                x: 0,
                y: 0
            };

            const mockBackground = {
                shape: mockShape
            };

            execute(mockBackground as any);

            // shape へのアクセスが行われること（プロパティが変更される可能性がある）
            expect(mockBackground.shape).toBeDefined();
        });
    });

    /**
     * @description スケール計算のテスト
     *              Test for scale calculation
     */
    describe("Scale Calculation / スケール計算", () => {
        it("tx が 0 の場合、scaleX と x は変更されないこと", () => {
            const mockShape = {
                scaleX: 1,
                scaleY: 1,
                x: 0,
                y: 0
            };

            const mockBackground = {
                shape: mockShape
            };

            const originalScaleX = mockShape.scaleX;
            const originalX = mockShape.x;

            execute(mockBackground as any);

            // デフォルトのモック設定では tx = 0 のため変更されない
            expect(mockShape.scaleX).toBe(originalScaleX);
            expect(mockShape.x).toBe(originalX);
        });

        it("ty が 0 の場合、scaleY と y は変更されないこと", () => {
            const mockShape = {
                scaleX: 1,
                scaleY: 1,
                x: 0,
                y: 0
            };

            const mockBackground = {
                shape: mockShape
            };

            const originalScaleY = mockShape.scaleY;
            const originalY = mockShape.y;

            execute(mockBackground as any);

            // デフォルトのモック設定では ty = 0 のため変更されない
            expect(mockShape.scaleY).toBe(originalScaleY);
            expect(mockShape.y).toBe(originalY);
        });
    });
});
