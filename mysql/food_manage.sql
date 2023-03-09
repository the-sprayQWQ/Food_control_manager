/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : food_manage

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 04/03/2023 02:48:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `goods_category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_delete` tinyint(1) NULL DEFAULT 0,
  `price` decimal(10, 2) NOT NULL,
  `goods_pic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  UNIQUE INDEX `name`(`goods_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, '包菜', '江西菜', 0, 20.00, '');
INSERT INTO `goods` VALUES (2, '西湖醋鱼', '杭州菜', 0, 120.00, '');
INSERT INTO `goods` VALUES (3, '锅包肉', '东北菜', 0, 30.00, '');
INSERT INTO `goods` VALUES (4, '麻婆豆腐', '川菜', 0, 30.00, '');
INSERT INTO `goods` VALUES (5, '11', '11', 1, 111.00, NULL);
INSERT INTO `goods` VALUES (6, '鱼香肉丝', '东北菜', 0, 50.00, '');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `order_num` int(0) NOT NULL,
  `order_price` decimal(10, 2) NOT NULL,
  `order_states` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `order_isdelete` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, '西湖醋鱼', 1, 20.00, '已完成', 0);
INSERT INTO `orders` VALUES (2, '西湖醋鱼', 2, 40.00, '待支付', 0);
INSERT INTO `orders` VALUES (3, '锅包肉', 2, 60.00, '已完成', 0);
INSERT INTO `orders` VALUES (4, '包菜', 1, 20.00, '已完成', 0);
INSERT INTO `orders` VALUES (5, '包菜', 2, 0.00, '', 1);
INSERT INTO `orders` VALUES (6, '西湖醋鱼', 2, 240.00, '已结算', 0);
INSERT INTO `orders` VALUES (7, '包菜', 2, 40.00, '已完成', 0);
INSERT INTO `orders` VALUES (8, '锅包肉', 2, 60.00, '待结算', 0);
INSERT INTO `orders` VALUES (9, '麻婆豆腐', 6, 180.00, '已完成', 0);

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  UNIQUE INDEX `status_name`(`status_name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of status
-- ----------------------------
INSERT INTO `status` VALUES (1, '待支付', 0);
INSERT INTO `status` VALUES (2, '待结算', 0);
INSERT INTO `status` VALUES (3, '已完成', 0);
INSERT INTO `status` VALUES (4, '待接单', 0);
INSERT INTO `status` VALUES (5, '已关闭', 0);
INSERT INTO `status` VALUES (8, '未完成', 0);

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  UNIQUE INDEX `category_name`(`category_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES (1, '东北菜', 0);
INSERT INTO `type` VALUES (2, '川菜', 0);
INSERT INTO `type` VALUES (3, '杭州菜', 0);
INSERT INTO `type` VALUES (4, '江西菜', 0);
INSERT INTO `type` VALUES (5, '粤菜', 0);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '123', 'ponyma', '10001@qq.com', 0, 0);
INSERT INTO `users` VALUES (2, 'admin1', '123', 'ponyma', '10001@qq.com', 0, 0);
INSERT INTO `users` VALUES (3, 'admin2', '123', 'ponyma', '10001@qq.com', 0, 0);
INSERT INTO `users` VALUES (4, 'admin3', '123', 'ponyma', '10001@qq.com', 0, 0);
INSERT INTO `users` VALUES (5, 'admin4', '123', 'ponyma', '10001@qq.com', 0, 0);
INSERT INTO `users` VALUES (6, 'admin5', '123', 'ponyma', '10001@qq.com', 0, 0);

SET FOREIGN_KEY_CHECKS = 1;
