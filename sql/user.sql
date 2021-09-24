------------------------------用户表--------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `account` varchar(24) NOT NULL COMMENT '用户账号',
  `name` varchar(20) NOT NULL COMMENT '真实姓名',
  `passwd` char(32) NOT NULL COMMENT '密码',
  `passwd_salt` char(6) NOT NULL COMMENT '密码盐',
  `tel` varchar(15) NOT NULL DEFAULT '0' COMMENT '手机号码',
  `role` tinyint(4) NOT NULL DEFAULT '3' COMMENT '用户角色：0-超级管理员|1-管理员|2-开发&测试&运营|3-普通用户（只能查看）',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：0-失效|1-有效|2-删除',
  `created_by` smallint(6) NOT NULL COMMENT '创建人ID',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_by` smallint(6) NOT NULL DEFAULT '0' COMMENT '修改人ID',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='用户表';

------------------------------用户表--------------------------------
