export enum RoleEnum {
  /**
   * 超级管理员
   */
  Super = 0,
  /**
   * 管理员
   */
  Manager = 1,
  /**
   * 开发、测试、运营
   */
  Dev = 2,
  /**
   * 普通用户（只能查看）
   */
  Readonly = 3,
}
