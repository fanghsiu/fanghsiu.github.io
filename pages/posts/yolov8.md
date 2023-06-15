---
title: 记第一次 YOLOv8 检测训练
end: false
---

> [nan report in box_class cls_class and dfl_loss when train custom dataset · Issue #280 · ultralytics/ultralytics](https://github.com/ultralytics/ultralytics/issues/280)
>
> [NaN tensor values problem for GTX16xx users (no problem on other devices) · Issue #7908 · ultralytics/yolov5](https://github.com/ultralytics/yolov5/issues/7908)


## 环境准备
YOLOv8 包名为 ultralytics  

<hr>

我的环境：  
Windows 10 专业版 22H2 19045.2846  
显卡 NVIDIA GeForce GTX1650 4G  
python 3.18.16  
pytorch                   1.13.1  
pytorch-cuda              11.7  
ultralytics(YOLOv8)       8.0.93

<hr>

使用 YOLOv8 需要在 python>=3.7.0 且 pytorch>=1.7 的环境中，并满足[requirements.txt](https://github.com/ultralytics/ultralytics/blob/main/requirements.txt)文件中的要求。
:::details requirements.txt
```txt
# Ultralytics requirements
# Usage: pip install -r requirements.txt

# Base ----------------------------------------
matplotlib>=3.2.2
opencv-python>=4.6.0
Pillow>=7.1.2
PyYAML>=5.3.1
requests>=2.23.0
scipy>=1.4.1
torch>=1.7.0
torchvision>=0.8.1
tqdm>=4.64.0

# Logging -------------------------------------
# tensorboard>=2.4.1
# clearml
# comet

# Plotting ------------------------------------
pandas>=1.1.4
seaborn>=0.11.0

# Export --------------------------------------
# coremltools>=6.0  # CoreML export
# onnx>=1.12.0  # ONNX export
# onnxsim>=0.4.1  # ONNX simplifier
# nvidia-pyindex  # TensorRT export
# nvidia-tensorrt  # TensorRT export
# scikit-learn==0.19.2  # CoreML quantization
# tensorflow>=2.4.1  # TF exports (-cpu, -aarch64, -macos)
# tflite-support
# tensorflowjs>=3.9.0  # TF.js export
# openvino-dev>=2022.3  # OpenVINO export

# Extras --------------------------------------
psutil  # system utilization
thop>=0.1.1  # FLOPs computation
# ipython  # interactive notebook
# albumentations>=1.0.3
# pycocotools>=2.0.6  # COCO mAP
# roboflow
```
:::
### 新建环境
推荐使用 conda 新建一个 Python3.7 环境。  
```sh
conda create -n myenv python=3.7 
```
当时先安装的最新的 pytorch2.0 要求 python>=3.8 所以就是3.8版本了，结果后面发现opencv-python 4.6只针对3.6，3.7发布了包，4.7针对3.7发布了包，虽然可以安装使用，但是在pycharm中使用cv2包的函数时会没有提示并且有警告，如：`在 '__init__.py' 中找不到引用 'imshow'`。有点强迫症，很难受，但其他包已经安装完了，也就不好再改。
### 安装 Pytorch
查看 cuda 版本
```sh
nvidia-smi
```

安装 Pytorch。因为最新版本要求 Python 3.8-3.11，所以推荐选择 Pytorch<=1.13.1 并根据 cuda 版本选择安装命令。更多版本请参考官方文档[Previous PyTorch Versions | PyTorch](https://pytorch.org/get-started/previous-versions/)
```bash
# CUDA 11.6
conda install pytorch==1.13.1 torchvision==0.14.1 torchaudio==0.13.1 pytorch-cuda=11.6 -c pytorch -c nvidia
# CUDA 11.7
conda install pytorch==1.13.1 torchvision==0.14.1 torchaudio==0.13.1 pytorch-cuda=11.7 -c pytorch -c nvidia
# CPU Only
conda install pytorch==1.13.1 torchvision==0.14.1 torchaudio==0.13.1 cpuonly -c pytorch
```

安装验证：
```python
# -*- coding:utf-8 -*-
import torch  # 如果pytorch安装成功即可导入
print(torch.__version__)  # 查看 Pytorch 的版本号
print(torch.version.cuda)  # 查看 CUDA 的版本号
print(torch.cuda.is_available())  # 返回一个布尔值，指示 CUDA 当前是否可用。
print(torch.cuda.device_count())  # 返回可用的 GPU 数。
print(torch.cuda.current_device())  # 返回当前选定设备的索引。
print(torch.cuda.get_device_name(0))  # 返回设备的名称。默认参数为当前选定设备的索引<-torch.cuda.current_device。
```

### 安装YOLOv8
通过 pip 安装 ultralytics 包以获得最新的 YOLOv8 稳定版本
```sh
pip install ultralytics
```
通过克隆 https://github.com/ultralytics/ultralytics 最新版本的存储库安装 YOLOv8
```sh
git clone https://github.com/ultralytics/ultralytics
cd ultralytics
pip install -e .
```
请注意，pip会自动安装所有必需的依赖项。

## 数据准备
### 数据格式
我是做的目标检测，就说一下这个模式需要的数据集，其他格式参考官方文档  
用官方给的一个 coco8 数据集做例子，方便理解，主要体积只有 1MB。方便实验。下面是他的一个数据结构。
:::details coco8数据集结构
```txt
# parent
# ├── ultralytics
# └── datasets
#     └── coco8
#         ├─ images
#         │  ├─ train
#         │  │  ├─ 000000000009.jpg
#         │  │  ├─ 000000000025.jpg
#         │  │  ├─ 000000000030.jpg
#         │  │  └─ 000000000034.jpg
#         │  │
#         │  └─val
#         │     ├─ 000000000036.jpg
#         │     ├─ 000000000042.jpg
#         │     ├─ 000000000049.jpg
#         │     └─ 000000000061.jpg
#         │
#         └─ labels
#            ├─ train
#            │  ├─ 000000000009.txt
#            │  ├─ 000000000025.txt
#            │  ├─ 000000000030.txt
#            │  └─ 000000000034.txt
#            │
#            └─ val
#               ├─ 000000000036.txt
#               ├─ 000000000042.txt
#               ├─ 000000000049.txt
#               └─ 000000000061.txt
```
:::

:::details coco8.yaml数据集文件
```yaml
# Ultralytics YOLO 🚀, AGPL-3.0 license
# COCO8 dataset (first 8 images from COCO train2017) by Ultralytics
# Example usage: yolo train data=coco8.yaml
# parent
# ├── ultralytics
# └── datasets
#     └── coco8  ← downloads here (1 MB)

# Train/val/test sets as 1) dir: path/to/imgs, 2) file: path/to/imgs.txt, or 3) list: [path/to/imgs1, path/to/imgs2, ..]
path: ../datasets/coco8  # dataset root dir
train: images/train  # train images (relative to 'path') 4 images
val: images/val  # val images (relative to 'path') 4 images
test:  # test images (optional)

# Classes
names:
  0: person
  1: bicycle
  2: car
  3: motorcycle
  4: airplane
  5: bus
  6: train
  7: truck
  8: boat
  9: traffic light
  10: fire hydrant
  11: stop sign
  12: parking meter
  13: bench
  14: bird
  15: cat
  16: dog
  17: horse
  18: sheep
  19: cow
  20: elephant
  21: bear
  22: zebra
  23: giraffe
  24: backpack
  25: umbrella
  26: handbag
  27: tie
  28: suitcase
  29: frisbee
  30: skis
  31: snowboard
  32: sports ball
  33: kite
  34: baseball bat
  35: baseball glove
  36: skateboard
  37: surfboard
  38: tennis racket
  39: bottle
  40: wine glass
  41: cup
  42: fork
  43: knife
  44: spoon
  45: bowl
  46: banana
  47: apple
  48: sandwich
  49: orange
  50: broccoli
  51: carrot
  52: hot dog
  53: pizza
  54: donut
  55: cake
  56: chair
  57: couch
  58: potted plant
  59: bed
  60: dining table
  61: toilet
  62: tv
  63: laptop
  64: mouse
  65: remote
  66: keyboard
  67: cell phone
  68: microwave
  69: oven
  70: toaster
  71: sink
  72: refrigerator
  73: book
  74: clock
  75: vase
  76: scissors
  77: teddy bear
  78: hair drier
  79: toothbrush

# Download script/URL (optional)
download: https://ultralytics.com/assets/coco8.zip
```
:::

种类哪里可以换一种写法
```yaml
# Classes
nc: 80
names: ['person','bicycle','car','motorcycle','airplane','bus','train','truck','boat','traffic light','fire hydrant','stop sign','parking meter','bench','bird','cat','dog','horse','sheep','cow','elephant','bear','zebra','giraffe','backpack','umbrella','handbag','tie','suitcase','frisbee','skis','snowboard','sports ball','kite','baseball bat','baseball glove','skateboard','surfboard','tennis racket','bottle','wine glass','cup','fork','knife','spoon','bowl','banana','apple','sandwich','orange','broccoli','carrot','hot dog','pizza','donut','cake','chair','couch','potted plant','bed','dining table','toilet','tv','laptop','mouse','remote','keyboard','cell phone','microwave','oven','toaster','sink','refrigerator','book','clock','vase','scissors','teddy bear','hair drier','toothbrush']
```

### 数据转换
我用的是 [Global Wheat Detection  | Kaggle](https://www.kaggle.com/c/global-wheat-detection/data) 数据集，之所以不直接用官方给的 GlobalWheat2020 数据集，是因为大小有 7G，而kaggle上的只有 643.57 MB。

D:/gwd/wheat.yaml
```yaml
path: D:/gwd
train: images/train  # D:/gwd/images/train
val: images/val  # D:/gwd/images/val
test:  # D:/gwd/images/test

# nc: 1
# names: ['wheat']
names:
  0: wheat
```

第一次用yolo，结果GTX16系列显卡有大坑，NVIDIA对GTX16xx相关CUDA包有问题，在训练时需要将amp设置为False。

