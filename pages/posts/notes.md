---
layout: post
title: 随笔
date: 2023-02-28
updated: 2023-02-28
categories: [笔记]
tags: [笔记]
cover: https://s21.ax1x.com/2024/03/14/pFgi4AJ.jpg
---

记录一些收获

## Windows 系统更改 VsCode 扩展安装位置
CMD 管理员模式运行，自行替换后面路径。
```cmd
mklink /d %userprofile%\.vscode D:\vsc\CodeExtensions
mklink /d %appdata%\Code D:\vsc\Code
``` 

## Windows 开机启动

### 启动路径

用户启动路径：Windows+R 打开运行，输入 `shell:startup` 打开下列路径
```txt
C:\Users\username\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
```
系统启动路径：Windows+R 打开运行，输入 `shell:common startup` 打开下列路径
```txt
C:\ProgramData\Microsoft\Windows\StartMenu\Programs\StartUp
```

### 注册表方式

用户启动项路径
```txt
计算机\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
```

系统启动项路径1
```txt
计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
```

系统启动项路径2
```txt
计算机\HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run
```

## Some windows commands

查看端口占用
```shell
netstat -ano | findstr port
```

查看占用线程的应用名称
```shell
tasklist | findstr processid
```

查看应用占用的线程(注意大小写)
```shell
tasklist | findstr msedge.exe
tasklist | findstr msedge
```

通过线程关闭应用进程
```shell
taskkill /f /pid processid
```

通过应用名关闭应用进程(注意大小写)
```shell
taskkill /f /im msedge.exe
taskkill /f /im msedge
```
>**`taskkill 参数`**
>`/f` 强制终止进程
>`/t` 终止进程及子进程
>`/pid` 指定的进程号
>`/im` 指定的进程名称

## Jupyter 生成默认配置

```bash
jupyter server --generate-config
```

## Jupyter应用中添加、删除虚拟环境

### Jupyter中添加虚拟环境步骤：

1. 打开Anaconda Prompt，用conda创建虚拟环境，可指定Python版本：
    ```bash
    conda create -n myenv python=3.6
    ```
2. 进入创建的虚拟环境：
    ```bash
    activate myenv
    ```
3. 安装ipykernel包：
    ```bash
    pip install --user ipykernel
    ```
4. 将虚拟环境加入Jupyter：
    ```bash
    python -m ipykernel install --user --name=myenv

    python -m ipykernel install --user --name myenv --display-name "Python [conda env:myenv]"
    ```
5. 运行jupyter notebook或jupyter lab，即可使用刚刚创建的虚拟环境

### Jupyter中删除虚拟环境步骤：

1. 查看安装了哪些虚拟环境kernel（在base或虚拟环境下运行都可以）：
    ```bash
    jupyter kernelspec list
    ```
2. 删除指定的kernel：
    ```bash
    jupyter kernelspec uninstall myenv
    ```

## 查看IP

```bash
curl cip.cc
```

```bash
curl -L ip.tool.lu
```

```bash
curl myip.ipip.net
```
