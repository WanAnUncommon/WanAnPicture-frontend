/**
 * 图片审核状态
 */
export const PICTURE_REVIEW_STATUS_ENUM = {
  /**
   * 待审核
   */
  REVIEWING: 0,
  /**
   * 审核通过
   */
  PASS: 1,
  /**
   * 审核不通过
   */
  REJECT: 2,
};
export const PICTURE_REVIEW_STATUS_MAP = {
  0: "待审核",
  1: "审核通过",
  2: "审核不通过",
};
export  const PICTURE_REVIEW_STATUS_OPTIONS = Object.keys(PICTURE_REVIEW_STATUS_MAP).map((key) => {
  return {
    label: PICTURE_REVIEW_STATUS_MAP[key],
    value: key,
  };
})
