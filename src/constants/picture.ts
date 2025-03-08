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

export const PICTURE_EDIT_MESSAGE_TYPE_ENUM = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  ENTER_EDIT: 'ENTER_EDIT',
  EXIT_EDIT: 'EXIT_EDIT',
  EDIT_ACTION: 'EDIT_ACTION',
};

export const PICTURE_EDIT_MESSAGE_TYPE_MAP = {
  INFO: '发送通知',
  ERROR: '发送错误',
  ENTER_EDIT: '进入编辑状态',
  EXIT_EDIT: '退出编辑状态',
  EDIT_ACTION: '执行编辑操作',
};

export const PICTURE_EDIT_ACTION_ENUM = {
  ZOOM_IN: 'ZOOM_IN',
  ZOOM_OUT: 'ZOOM_OUT',
  ROTATE_LEFT: 'ROTATE_LEFT',
  ROTATE_RIGHT: 'ROTATE_RIGHT',
};

export const PICTURE_EDIT_ACTION_MAP = {
  ZOOM_IN: '放大操作',
  ZOOM_OUT: '缩小操作',
  ROTATE_LEFT: '左旋操作',
  ROTATE_RIGHT: '右旋操作',
};

