import { describe, it, expect, vi, beforeEach } from "vitest";
import { HomeTextRepository } from "./HomeTextRepository";
import type { IHomeTextResponse } from "@/interface/IHomeTextResponse";

/**
 * @description HomeTextRepository のテスト
 *              Tests for HomeTextRepository
 */
describe("HomeTextRepository", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * @description get メソッドのテスト
     *              Test for get method
     */
    describe("get", () => {
        it("正常にデータを取得できること", async () => {
            const mockResponse: IHomeTextResponse = { word: "Hello, Next2D!" };

            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: vi.fn().mockResolvedValue(mockResponse)
            });

            const result = await HomeTextRepository.get();

            expect(result).toEqual(mockResponse);
            expect(result.word).toBe("Hello, Next2D!");
        });

        it("fetch が正しい URL で呼び出されること", async () => {
            const mockResponse: IHomeTextResponse = { word: "Test" };

            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: vi.fn().mockResolvedValue(mockResponse)
            });

            await HomeTextRepository.get();

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining("api/home.json")
            );
        });

        it("HTTP エラー時に Error をスローすること", async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 404
            });

            await expect(HomeTextRepository.get()).rejects.toThrow("HTTP error! status: 404");
        });

        it("500 エラー時に適切なメッセージでスローすること", async () => {
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 500
            });

            await expect(HomeTextRepository.get()).rejects.toThrow("HTTP error! status: 500");
        });

        it("ネットワークエラー時に Error をスローすること", async () => {
            global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

            await expect(HomeTextRepository.get()).rejects.toThrow("Network error");
        });

        it("静的メソッドであること", () => {
            expect(typeof HomeTextRepository.get).toBe("function");
        });
    });

    /**
     * @description クラス構造のテスト
     *              Test for class structure
     */
    describe("Class Structure / クラス構造", () => {
        it("get が静的メソッドとして定義されていること", () => {
            expect(HomeTextRepository.get).toBeDefined();
            expect(typeof HomeTextRepository.get).toBe("function");
        });
    });
});
