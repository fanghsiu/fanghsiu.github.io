---
layout: post
title: Windows 11 虚拟机
date: 2023-03-08
updated: 2023-03-08
categories: [笔记]
tags: [ssh, Windows]
---

随便写写

## 下载地址

[Download Windows 11](https://www.microsoft.com/zh-cn/software-download/windows11)  
[下载 VMware Workstation Pro | CN](https://www.vmware.com/cn/products/workstation-pro/workstation-pro-evaluation.html)

## 安装问题

>[Win11安装 (Win11 22H2) 不联网 跳过联网 激活 终极教程（解决：无法跳过联网，糟糕你已断开internet连接等问题）_win11联网激活一直提示网络中断_IU_不错哦的博客-CSDN博客](https://blog.csdn.net/chen20170325/article/details/127615233)

## ssh 连接到 Windows

### 在 Windows 上安装 OpenSSH 服务器。

<!-- - win7： -->
- win10：设置 > 应用 > 应用和功能 > 可选功能 > 添加功能 > 搜索 ssh 选择 OpenSSH 服务器安装
- win11：设置 > 应用 > 可选功能 > 添加可选功能-查看功能 > 搜索 ssh 选择 OpenSSH 服务器安装

### 启动 sshd 服务

```bash
net start sshd
```
设置开机自动启动
```bash
sc config sshd start= auto
```

### 免密设置 cmd 命令

>[使用 Windows 工具或 PowerShell 的适用于 Windows 的 OpenSSH 服务器密钥管理。](https://learn.microsoft.com/zh-cn/windows-server/administration/openssh/openssh_keymanagement)

>[ssh_config(5) - OpenBSD manual pages](https://man.openbsd.org/ssh_config)

:::details sshd config
```txt
# This is the sshd server system-wide configuration file.  See
# sshd_config(5) for more information.

# The strategy used for options in the default sshd_config shipped with
# OpenSSH is to specify options with their default value where
# possible, but leave them commented.  Uncommented options override the
# default value.

#Port 22
#AddressFamily any
#ListenAddress 0.0.0.0
#ListenAddress ::

#HostKey __PROGRAMDATA__/ssh/ssh_host_rsa_key
#HostKey __PROGRAMDATA__/ssh/ssh_host_dsa_key
#HostKey __PROGRAMDATA__/ssh/ssh_host_ecdsa_key
#HostKey __PROGRAMDATA__/ssh/ssh_host_ed25519_key

# Ciphers and keying
#RekeyLimit default none

# Logging
#SyslogFacility AUTH
#LogLevel INFO

# Authentication:

#LoginGraceTime 2m
#PermitRootLogin prohibit-password
#StrictModes yes
#MaxAuthTries 6
#MaxSessions 10

#PubkeyAuthentication yes

# The default is to check both .ssh/authorized_keys and .ssh/authorized_keys2
# but this is overridden so installations will only check .ssh/authorized_keys
AuthorizedKeysFile	.ssh/authorized_keys

#AuthorizedPrincipalsFile none

# For this to work you will also need host keys in %programData%/ssh/ssh_known_hosts
#HostbasedAuthentication no
# Change to yes if you don't trust ~/.ssh/known_hosts for
# HostbasedAuthentication
#IgnoreUserKnownHosts no
# Don't read the user's ~/.rhosts and ~/.shosts files
#IgnoreRhosts yes

# To disable tunneled clear text passwords, change to no here!
#PasswordAuthentication yes
#PermitEmptyPasswords no

# GSSAPI options
#GSSAPIAuthentication no

#AllowAgentForwarding yes
#AllowTcpForwarding yes
#GatewayPorts no
#PermitTTY yes
#PrintMotd yes
#PrintLastLog yes
#TCPKeepAlive yes
#UseLogin no
#PermitUserEnvironment no
#ClientAliveInterval 0
#ClientAliveCountMax 3
#UseDNS no
#PidFile /var/run/sshd.pid
#MaxStartups 10:30:100
#PermitTunnel no
#ChrootDirectory none
#VersionAddendum none

# no default banner path
#Banner none

# override default of no subsystems
Subsystem	sftp	sftp-server.exe

# Example of overriding settings on a per-user basis
#Match User anoncvs
#	AllowTcpForwarding no
#	PermitTTY no
#	ForceCommand cvs server

Match Group administrators
       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```
:::

根据上面 sshd 服务的默认配置，我们有两种方案，皆需要**管理员权限**。
- 不修改配置，在 `%ProgramData%\ssh`目录下建立 `administrators_authorized_keys` 文件实现免密登录。
- 修改配置，注释掉最后两行，在用户目录的 `.ssh` 文件夹下建立 `authorized_keys` 文件实现免密登录。

下列三种方法任选其一，为 CMD 命令，注意路径，需要管理员权限  
1. 上传公钥后读取输出到对应文件实现免密登录
```bash
more 公钥文件 >> administrators_authorized_keys # or authorized_keys
```
2. 直接输出公钥内容到对应文件
```bash
echo 公钥内容 >> administrators_authorized_keys # or authorized_keys
```
3. 上传公钥移动重命名为对应文件实现免密登录
```bash
move 公钥文件 administrators_authorized_keys # or authorized_keys
```
