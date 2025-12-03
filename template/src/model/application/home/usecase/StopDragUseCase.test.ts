import { describe, it, expect, vi } from "vitest";
import { StopDragUseCase } from "./StopDragUseCase";
import type { IDraggable } from "@/interface/IDraggable";

/**
 * @description StopDragUseCase のテスト
 *              Tests for StopDragUseCase
 */
describe("StopDragUseCase", () => {
    /**
     * @description execute メソッドのテスト
     *              Test for execute method
     */
    describe("execute", () => {
        it("target の stopDrag メソッドが呼び出されること", () => {
            const mockDraggable: IDraggable = {
                startDrag: vi.fn(),
                stopDrag: vi.fn()
            };

            const useCase = new StopDragUseCase();
            useCase.execute(mockDraggable);

            expect(mockDraggable.stopDrag).toHaveBeenCalled();
            expect(mockDraggable.stopDrag).toHaveBeenCalledTimes(1);
        });

        it("startDrag メソッドは呼び出されないこと", () => {
            const mockDraggable: IDraggable = {
                startDrag: vi.fn(),
                stopDrag: vi.fn()
            };

            const useCase = new StopDragUseCase();
            useCase.execute(mockDraggable);

            expect(mockDraggable.startDrag).not.toHaveBeenCalled();
        });

        it("複数回呼び出した場合、その都度 stopDrag が呼び出されること", () => {
            const mockDraggable: IDraggable = {
                startDrag: vi.fn(),
                stopDrag: vi.fn()
            };

            const useCase = new StopDragUseCase();
            useCase.execute(mockDraggable);
            useCase.execute(mockDraggable);
            useCase.execute(mockDraggable);

            expect(mockDraggable.stopDrag).toHaveBeenCalledTimes(3);
        });
    });

    /**
     * @description インスタンス生成のテスト
     *              Test for instance creation
     */
    describe("Instance Creation / インスタンス生成", () => {
        it("インスタンスが正常に生成されること", () => {
            const useCase = new StopDragUseCase();
            expect(useCase).toBeInstanceOf(StopDragUseCase);
        });

        it("execute メソッドを持つこと", () => {
            const useCase = new StopDragUseCase();
            expect(typeof useCase.execute).toBe("function");
        });
    });
});
