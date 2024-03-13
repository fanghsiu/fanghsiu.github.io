---
title: 修复 WinRE 环境
date: 2024-03-13
updated: 2024-03-13
---

Windows-10 KB5034441 更新失败，但是之前懒得搞，最近看着更新图标一直在托盘烦人，于是在今天决定解决它，最终在查找一众资料后，通过修复 WinRE 解决问题。不保证所有情况都可以。
<!-- more -->
## 我电脑的问题
适用情况：UEFI 引导，有恢复分区，容量足够。

我是一块硬盘，之前扩容 C 盘，把 C,D 盘中间的一个分区删了，导致在更新的时候虽然 D 盘后面还有一个 1000MB 恢复分区，但是由于缺少文件最终还是失败。

## 解决步骤
### 准备 WinRE 环境文件
可以从其他电脑拷一份，我是从虚拟机拷的。 
### 为恢复分区分配驱动器号
- win+r 输入 cmd，同时按住 ctrl+shift+enter 打开管理员模式，输入`diskpart`打开 DiskPart 工具。
- 首先，检查磁盘分区样式是 GUID 分区表 (GPT) 还是主启动记录 (MBR)。  为此，请运行 list disk。 检查 "**Gpt**" 列中是否有星号字符 (\*)。如果有星号字符(\*)，则驱动器为 GPT。否则，驱动器为 MBR。
- 列出电脑中的磁盘：
```cmd
DISKPART> list disk

磁盘 ###   状态           大小     可用     Dyn  Gpt
--------  -------------  -------  -------  ---  ---
磁盘 0     联机           476 GB      0 B        *
```
- 选择主硬盘：
```cmd
DISKPART> sel disk 0
```
- 查看分区：
```cmd
DISKPART> list partition

  分区 ###       类型                大小      偏移量
  -------------  ----------------   --------  --------
  分区      1    系统                 260 MB   1024 KB
  分区      2    保留                  16 MB    261 MB
  分区      3    主要                 100 GB    277 MB
  分区      4    主要                 375 GB    100 GB
  分区      5    恢复                1000 MB    475 GB
```
- 选择需要驱动器号的分区：(我这里恢复分区是5)
```cmd
DISKPART> sel partition 5
```
- 使用 assign letter 命令将一个字母分配给该分区。 例如，应用于对象的(之后,你可以在资源管理器中看到该磁盘)
```cmd
DISKPART> assign letter=S
```
- 输入 `exit` 退出 diskpart
### 拷贝 Recovery 文件夹
(隐藏文件夹,打开查看隐藏文件也看不到,所以用命令去除隐藏属性,方便拷贝)
```cmd
C:\Windows\system32> s:
```
```cmd
S:\> attrib -h -s Recovery
```
### 实机修复 WinRE
- 重复上述分配驱动器号步骤,为实机恢复分区设置驱动器号
- 将 Recovery 复制到恢复分区磁盘
- 恢复 Recovery 文件夹属性
```cmd
S:\> attrib +h +s Recovery
```
- 注册 WinRE 工具镜像
```cmd
reagentc /setreimage /path S:\Recovery\WindowsRE
```
- 准备 DiskPart 脚本以标识恢复分区并取消驱动器号
注意修改磁盘号和分区号,适用于UEFI. 保存为 txt 文件.(名字随意,路径随意,好输入就行)
:::tip
适用于 UEFI 引导, BIOS 请查看参考文章第二篇自行替换.
:::
```txt
rem == HideRecoveryPartitions-UEFI.txt
select disk 0
select partition 5
remove
set id=de94bba4-06d1-4d40-a16a-bfd50179d6ac
gpt attributes=0x8000000000000001
rem == If Push-button reset features are included, add the following commands:
rem    select partition 5
rem    remove
rem    set id=de94bba4-06d1-4d40-a16a-bfd50179d6ac
rem    gpt attributes=0x8000000000000001
list volume
```
- 运行 diskpart 脚本以标识并隐藏恢复分区：
```
diskpart /s C:\HideRecoveryPartitions-UEFI.txt
```
- 启用 WinRE
```cmd
reagentc /enable
```
- 到这就可以了

## 参考文章
- [KB5034441：适用于 Windows 10 版本 21H2 和 22H2 的 Windows 恢复环境更新：2024 年 1 月 9 日 - Microsoft 支持](https://support.microsoft.com/zh-cn/topic/kb5034441-%E9%80%82%E7%94%A8%E4%BA%8E-windows-10-%E7%89%88%E6%9C%AC-21h2-%E5%92%8C-22h2-%E7%9A%84-windows-%E6%81%A2%E5%A4%8D%E7%8E%AF%E5%A2%83%E6%9B%B4%E6%96%B0-2024-%E5%B9%B4-1-%E6%9C%88-9-%E6%97%A5-62c04204-aaa5-4fee-a02a-2fdea17075a8#%E6%91%98%E8%A6%81)
- [部署 Windows RE | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/deploy-windows-re?view=windows-10)
