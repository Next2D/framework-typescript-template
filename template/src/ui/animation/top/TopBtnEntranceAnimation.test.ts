import { describe, it, expect, vi } from "vitest";

// 依存モジュールをモック
vi.mock("@next2d/ui", () => ({
    Tween: {
        add: vi.fn().mockReturnValue({
            addEventListener: vi.fn(),
            start: vi.fn()
        })
    },
    Easing: {
        inQuad: vi.fn()
    }
}));

vi.mock("@next2d/events", () => ({
    Event: {
        COMPLETE: "complete"
    }
}));

import { TopBtnEntranceAnimation } from "./TopBtnEntranceAnimation";
import { Tween } from "@next2d/ui";

/**
 * @description TopBtnEntranceAnimation のテスト
 *              Tests for TopBtnEntranceAnimation
 */
describe("TopBtnEntranceAnimation", () => {
    /**
     * @description コンストラクタのテスト
     *              Test for constructor
     */
    describe("Constructor / コンストラクタ", () => {
        it("インスタンスが正常に生成されること", () => {
            const mockSprite = { alpha: 1 };
            const callback = vi.fn();

            const animation = new TopBtnEntranceAnimation(mockSprite as any, callback);
            expect(animation).toBeInstanceOf(TopBtnEntranceAnimation);
        });

        it("sprite.alpha が 0 に設定されること", () => {
            const mockSprite = { alpha: 1 };
            const callback = vi.fn();

            new TopBtnEntranceAnimation(mockSprite as any, callback);
            expect(mockSprite.alpha).toBe(0);
        });

        it("Tween.add が呼び出されること", () => {
            const mockSprite = { alpha: 1 };
            const callback = vi.fn();

            new TopBtnEntranceAnimation(mockSprite as any, callback);
            expect(Tween.add).toHaveBeenCalled();
        });
    });

    /**
     * @description start メソッドのテスト
     *              Test for start method
     */
    describe("start Method / start メソッド", () => {
        it("start メソッドを持つこと", () => {
            const mockSprite = { alpha: 1 };
            const callback = vi.fn();

            const animation = new TopBtnEntranceAnimation(mockSprite as any, callback);
            expect(typeof animation.start).toBe("function");
        });

        it("start を呼び出せること", () => {
            const mockSprite = { alpha: 1 };
            const callback = vi.fn();

            const animation = new TopBtnEntranceAnimation(mockSprite as any, callback);
            expect(() => animation.start()).not.toThrow();
        });
    });

    /**
     * @description アニメーション設定のテスト
     *              Test for animation settings
     */
    describe("Animation Settings / アニメーション設定", () => {
        it("alpha のアニメーションが設定されること", () => {
            const mockSprite = { alpha: 1 };
            const callback = vi.fn();

            new TopBtnEntranceAnimation(mockSprite as any, callback);

            expect(Tween.add).toHaveBeenCalledWith(
                mockSprite,
                expect.objectContaining({ alpha: 0 }),
                expect.objectContaining({ alpha: 1 }),
                expect.any(Number),
                expect.any(Number),
                expect.anything()
            );
        });
    });
});
