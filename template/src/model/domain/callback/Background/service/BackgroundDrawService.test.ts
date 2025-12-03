import { describe, it, expect, vi } from "vitest";

// @next2d/geom モジュールをモック
vi.mock("@next2d/geom", () => {
    return {
        Matrix: class MockMatrix {
            createGradientBox = vi.fn();
        }
    };
});

import { execute } from "./BackgroundDrawService";

/**
 * @description BackgroundDrawService のテスト
 *              Tests for BackgroundDrawService
 */
describe("BackgroundDrawService", () => {
    /**
     * @description execute 関数のテスト
     *              Test for execute function
     */
    describe("execute", () => {
        it("execute 関数が存在すること", () => {
            expect(typeof execute).toBe("function");
        });

        it("background.shape.graphics のメソッドが呼び出されること", () => {
            const mockGraphics = {
                clear: vi.fn().mockReturnThis(),
                beginGradientFill: vi.fn().mockReturnThis(),
                drawRect: vi.fn().mockReturnThis(),
                endFill: vi.fn().mockReturnThis()
            };

            const mockBackground = {
                shape: {
                    graphics: mockGraphics
                }
            };

            execute(mockBackground as any);

            expect(mockGraphics.clear).toHaveBeenCalled();
            expect(mockGraphics.beginGradientFill).toHaveBeenCalled();
            expect(mockGraphics.drawRect).toHaveBeenCalled();
            expect(mockGraphics.endFill).toHaveBeenCalled();
        });

        it("beginGradientFill が正しいパラメータで呼び出されること", () => {
            const mockGraphics = {
                clear: vi.fn().mockReturnThis(),
                beginGradientFill: vi.fn().mockReturnThis(),
                drawRect: vi.fn().mockReturnThis(),
                endFill: vi.fn().mockReturnThis()
            };

            const mockBackground = {
                shape: {
                    graphics: mockGraphics
                }
            };

            execute(mockBackground as any);

            // linear グラデーションが使用されること
            expect(mockGraphics.beginGradientFill).toHaveBeenCalledWith(
                "linear",
                expect.any(Array),
                expect.any(Array),
                expect.any(Array),
                expect.any(Object)
            );
        });

        it("メソッドチェーンが正しく動作すること", () => {
            const mockGraphics = {
                clear: vi.fn().mockReturnThis(),
                beginGradientFill: vi.fn().mockReturnThis(),
                drawRect: vi.fn().mockReturnThis(),
                endFill: vi.fn().mockReturnThis()
            };

            const mockBackground = {
                shape: {
                    graphics: mockGraphics
                }
            };

            // エラーなく実行されること
            expect(() => execute(mockBackground as any)).not.toThrow();
        });
    });
});
