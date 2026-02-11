import { describe, it, expect } from "vitest";
import { CenterTextFieldUseCase } from "./CenterTextFieldUseCase";
import type { ITextField } from "@/interface/ITextField";

/**
 * @description CenterTextFieldUseCase のテスト
 *              Tests for CenterTextFieldUseCase
 */
describe("CenterTextFieldUseCase", () => {
    /**
     * @description execute メソッドのテスト
     *              Test for execute method
     */
    describe("execute", () => {
        it("テキストフィールドが中央に配置されること", () => {
            const textField: ITextField = {
                width: 200,
                x: 0
            };

            const useCase = new CenterTextFieldUseCase();
            useCase.execute(textField, 800);

            // 中央位置: (800 - 200) / 2 = 300
            expect(textField.x).toBe(300);
        });

        it("幅が異なる場合でも正しく中央に配置されること", () => {
            const textField: ITextField = {
                width: 100,
                x: 0
            };

            const useCase = new CenterTextFieldUseCase();
            useCase.execute(textField, 500);

            // 中央位置: (500 - 100) / 2 = 200
            expect(textField.x).toBe(200);
        });

        it("テキストフィールドの幅がステージ幅と同じ場合、x は 0 になること", () => {
            const textField: ITextField = {
                width: 800,
                x: 100
            };

            const useCase = new CenterTextFieldUseCase();
            useCase.execute(textField, 800);

            // 中央位置: (800 - 800) / 2 = 0
            expect(textField.x).toBe(0);
        });

        it("テキストフィールドの幅がステージ幅より大きい場合、x は負の値になること", () => {
            const textField: ITextField = {
                width: 1000,
                x: 0
            };

            const useCase = new CenterTextFieldUseCase();
            useCase.execute(textField, 800);

            // 中央位置: (800 - 1000) / 2 = -100
            expect(textField.x).toBe(-100);
        });

        it("小数点を含む計算結果が正しいこと", () => {
            const textField: ITextField = {
                width: 101,
                x: 0
            };

            const useCase = new CenterTextFieldUseCase();
            useCase.execute(textField, 800);

            // 中央位置: (800 - 101) / 2 = 349.5
            expect(textField.x).toBe(349.5);
        });

        it("既存の x 座標が上書きされること", () => {
            const textField: ITextField = {
                width: 200,
                x: 999
            };

            const useCase = new CenterTextFieldUseCase();
            useCase.execute(textField, 800);

            expect(textField.x).toBe(300);
        });
    });

    /**
     * @description インスタンス生成のテスト
     *              Test for instance creation
     */
    describe("Instance Creation / インスタンス生成", () => {
        it("インスタンスが正常に生成されること", () => {
            const useCase = new CenterTextFieldUseCase();
            expect(useCase).toBeInstanceOf(CenterTextFieldUseCase);
        });

        it("execute メソッドを持つこと", () => {
            const useCase = new CenterTextFieldUseCase();
            expect(typeof useCase.execute).toBe("function");
        });
    });
});
