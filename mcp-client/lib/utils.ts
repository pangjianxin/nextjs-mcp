import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Helper method for creating a range of numbers.
 *
 * This function generates an array of numbers starting from the `from` parameter
 * and ending at the `to` parameter, inclusive.
 *
 * @param {number} from - The starting number of the range.
 * @param {number} to - The ending number of the range.
 * @returns {number[]} - An array containing the range of numbers.
 */
const range = (from: number, to: number): number[] => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i++;
  }

  return range;
};

/**
 * Generates an array of page numbers for pagination controls.
 *
 * This function creates an array of page numbers and spacers ('SPACER') for pagination
 * based on the total number of pages and the current active page. It ensures that the
 * pagination controls are concise and user-friendly.
 *
 * @param {number} totalPages - The total number of pages.
 * @param {number} currentPage - The current active page.
 * @returns {(number | 'SPACER')[]} - An array of page numbers and spacers.
 */
export const getPages = (
  totalPages: number,
  currentPage: number
): (number | "SPACER")[] => {
  const totalNumbers = 5;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    let pages: Array<number | "SPACER"> = range(startPage, endPage);

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 3);

    switch (true) {
      // handle: (1) ... {6} [7] (8)
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = ["SPACER", ...extraPages, ...pages];
        break;
      }

      // handle: (1) {2} [3] {4} ... (8)
      case !hasLeftSpill && hasRightSpill: {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, "SPACER"];
        break;
      }

      // handle: (1) ... {3} [4] {5} ... (8)
      case hasLeftSpill && hasRightSpill:
      default: {
        pages = ["SPACER", ...pages, "SPACER"];
        break;
      }
    }

    return [1, ...pages, totalPages];
  }

  return range(1, totalPages);
};

export function formatJSON(jsonString: string | undefined): string {
  try {
    if (!jsonString) return "";
    const parsedJSON = JSON.parse(jsonString);
    return JSON.stringify(parsedJSON, null, 2);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return jsonString ?? ""; // 如果解析失败，返回原始字符串
  }
}
