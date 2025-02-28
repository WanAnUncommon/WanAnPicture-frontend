/**
 * 空间等级
 */
export const SPACE_LEVEL_ENUM = {
  /**
   * 普通空间
   */
  COMMON: 0,
  /**
   * 高级空间
   */
  PROFESSIONAL: 1,
  /**
   * 超级空间
   */
  FLAGSHIP: 2,
} as const;
export const SPACE_LEVEL_MAP = {
  0: "普通空间",
  1: "高级空间",
  2: "超级空间",
};
export  const SPACE_LEVEL_OPTIONS = Object.keys(SPACE_LEVEL_MAP).map((key) => {
  const  value=Number(key);
  return {
    label: SPACE_LEVEL_MAP[key],
    value: key,
  };
})
