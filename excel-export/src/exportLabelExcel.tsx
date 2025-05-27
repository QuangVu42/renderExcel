import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type ExportLabelOptions = {
    text: string;
    quantity: number;
    col: number;
    colWidthMM: number;
    rowHeightMM: number;
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
    fontRatio = 1.7,
}: FontSizeParams): number {
    if (!text) return maxFontSize;

    let charsPerLine: number = Math.floor(colWidthMM / fontRatio);
    let maxLines: number = Math.floor(rowHeightMM / (maxFontSize * 0.35));
    let fontSize: number = maxFontSize;
    let lines: number = Math.ceil(text.length / charsPerLine);

    while (lines > maxLines && fontSize > minFontSize) {
        fontSize--;
        charsPerLine = Math.floor(colWidthMM / (fontSize > 0 ? fontRatio * (maxFontSize / fontSize) : fontRatio));
        maxLines = Math.floor(rowHeightMM / (fontSize * 0.35));
        lines = Math.ceil(text.length / charsPerLine);
    }
    if (fontSize < minFontSize) fontSize = minFontSize;
    return fontSize;
}

export const exportLabelExcel = async ({
    text,
    quantity,
    col,
    colWidthMM,
    rowHeightMM,
    fileName = "labels.xlsx",
}: ExportLabelOptions): Promise<void> => {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Labels");

    ws.columns = Array(col)
        .fill(null)
        .map(() => ({
            width: mmToColWidth(colWidthMM),
        }));

    const data: string[] = Array.from({ length: quantity }, () => text);

    let count = 0;
    while (count < data.length) {
        const rowValues: string[] = [];
        for (let c = 0; c < col; c++) {
            if (count < data.length) {
                rowValues.push(data[count]);
                count++;
            } else {
                rowValues.push("");
            }
        }
        const row = ws.addRow(rowValues);

        row.height = mmToPx(rowHeightMM);

        row.eachCell((cell) => {
            const cellText: string = String(cell.value || "");
            const fontSize: number = getFitFontSize({
                text: cellText,
                colWidthMM,
                rowHeightMM,
                maxFontSize: 13,
                minFontSize: 7,
                // minFontSize = 9,  
            });
            cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
            cell.font = { name: "Arial", size: fontSize };
        });
    }

    const buffer: ArrayBuffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), fileName);
};
