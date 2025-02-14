import {saveAs} from "file-saver";

/**
 * 格式化文件大小
 * @param size - 文件大小，单位为字节
 * @returns 格式化后的文件大小字符串
 */
export function formatSize(size: number | undefined | null): string {
    if (size === undefined || size === null) {
        return '--';
    }
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
        size /= 1024;
        i++;
    }
    return `${size.toFixed(2)} ${units[i]}`;
}

/**
 * 下载图片
 * @param url 图片链接
 * @param fileName 要保存的图片名称
 */
export function downloadImage(url?: string,fileName?:string) {
    if (!url){
        return
    }
    saveAs(url,fileName);
}
