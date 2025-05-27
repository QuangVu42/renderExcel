import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type ExportLabelRowOptions = {
    rowTexts: string[];          // Mỗi phần tử sẽ vào 1 ô theo thứ tự cột
    colWidthMM?: number;
    rowHeightMM?: number;
    fileName?: string;
};

const mmToColWidth = (mm: number, dpi: number = 96): number => {
    const pxPerMm = dpi / 25.4;
    const px = mm * pxPerMm;
    const charWidth = px / 7;
    return Number(charWidth.toFixed(2));
};

const mmToPx = (mm: number, dpi: number = 96): number => {
    const pxPerMm = dpi / 25.4;
    return Number((mm * pxPerMm).toFixed(2));
};

type FontSizeParams = {
    text: string;
    colWidthMM: number;
    rowHeightMM: number;
    maxFontSize?: number;
    minFontSize?: number;
    fontRatio?: number;
};

function getFitFontSize({
    text,
    colWidthMM,
    rowHeightMM,
    maxFontSize = 13,
    minFontSize = 7,
    fontRatio = 1.5,
}: FontSizeParams): number {
    if (!text) return maxFontSize;
    const linesArr = text.split("\n");
    let maxLen = 0;
    for (const line of linesArr) {
        if (line.length > maxLen) maxLen = line.length;
    }
    let charsPerLine = Math.floor(colWidthMM / fontRatio);
    let lines = Math.max(linesArr.length, Math.ceil(maxLen / charsPerLine));
    let maxLines = Math.floor(rowHeightMM / (maxFontSize * 0.35));

    let fontSize = maxFontSize;
    while (lines > maxLines && fontSize > minFontSize) {
        fontSize--;
        charsPerLine = Math.floor(colWidthMM / (fontSize > 0 ? fontRatio * (maxFontSize / fontSize) : fontRatio));
        maxLines = Math.floor(rowHeightMM / (fontSize * 0.35));
        lines = Math.max(linesArr.length, Math.ceil(maxLen / charsPerLine));
    }
    if (fontSize < minFontSize) fontSize = minFontSize;
    return fontSize;
}

export const exportExcelSpecialThree = async ({
    rowTexts,
    colWidthMM = 28,
    rowHeightMM = 10,
    fileName = "labels.xlsx",
}: ExportLabelRowOptions): Promise<void> => {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Labels");

    // Tạo số cột đúng bằng số lượng text truyền vào
    ws.columns = Array(rowTexts.length)
        .fill(null)
        .map(() => ({
            width: mmToColWidth(colWidthMM),
        }));

    // Thêm 1 hàng duy nhất với mỗi ô là 1 text khác nhau
    const row = ws.addRow(rowTexts);

    row.height = mmToPx(rowHeightMM);

    row.eachCell((cell, colIdx) => {
        const cellText = String(cell.value || "");
        const fontSize = getFitFontSize({
            text: cellText,
            colWidthMM,
            rowHeightMM,
            maxFontSize: 13,
            minFontSize: 8,
            fontRatio: 1.5,
        });
        cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
        cell.font = { name: "Arial", size: fontSize };
    });

    const buffer: ArrayBuffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), fileName);
};
