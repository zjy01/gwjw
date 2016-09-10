# gwjw
广外教务查询app（使用react native），手机软件大作业

##环境要求
> nodejs  
> react-native  
> 安卓开发环境  
自行谷歌配置react-native开发环境即可  

## 运行
```
# 克隆仓库
git clone https://github.com/zjy01/gwjw.git
# 安装依赖
cd gwjw && npm install
# 安装开发包到设备（请先连接手机到电脑，或者开启模拟器）
react-native run-android
# 启动调试后台（如果没有自动启动的话）
react-native start
```

## 升级
   + v1.2.0 `react-native@0.33`，课表间隔样式修复，使用`react-native-scrollable-tab-view`作为tab切换组件 
   
## issue

+ 如果编译问题，请尝试更新 `Android Support Repository`
