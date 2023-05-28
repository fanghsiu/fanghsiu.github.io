---
title: yolov8 训练中的问题
---

> [nan report in box_class cls_class and dfl_loss when train custom dataset · Issue #280 · ultralytics/ultralytics](https://github.com/ultralytics/ultralytics/issues/280)
>
> [NaN tensor values problem for GTX16xx users (no problem on other devices) · Issue #7908 · ultralytics/yolov5](https://github.com/ultralytics/yolov5/issues/7908)

使用yolov8需要 python>=3.7.0 pytorch>=1.7

<hr>

我的环境：  
Windows 10 专业版 22H2 19045.2846  
显卡 NVIDIA GeForce GTX1650 4G
python 3.18.16  
pytorch                   1.13.1  
pytorch-cuda              11.7  

<hr>

第一次用yolo，结果GTX16系列显卡有大坑，NVIDIA对GTX16xx相关CUDA包有问题，要关闭amp。

```bash
yolo detect train data=wheat.yaml model=yolov8n.yaml pretrained=yolov8n.pt epochs=20 imgsz=640 workers=2 amp=False batch=4
```

```python
from ultralytics import YOLO

# Create a new YOLO model from scratch
model = YOLO('yolov8n.yaml')

# Load a pretrained YOLO model (recommended for training)
model = YOLO('yolov8n.pt')

# Train the model using the 'coco128.yaml' dataset for 3 epochs
results = model.train(data='coco128.yaml', epochs=3)
# amp=False: gtx16系显卡啊似乎有问题,参考此处 https://github.com/ultralytics/ultralytics/issues/280
# workers=2, batch=4: windows平台容易爆显存
# result = model.train(data=wheat.yaml, epochs=20, imgsz=640, workers=2, amp=False, batch=4)

# Evaluate the model's performance on the validation set
results = model.val()

# Perform object detection on an image using the model
results = model('https://ultralytics.com/images/bus.jpg')

# Export the model to ONNX format
success = model.export(format='onnx')

```