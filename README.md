# cascader-multi

> 基于[iView-Cascader](https://www.iviewui.com/components/cascader)的多选级联选择器

## 效果预览
![](https://blog.mrabit.com/Uploads/Picture/2018-03-21/1521601545.gif)

## install 安装
```shell
npm i cascader-multi --save
```

## use 使用

在main.js中写入下面的代码
``` javascript
import cascaderMulti from "cascader-multi";
Vue.use(cascaderMulti);
```

接下来，你就可以在页面中使用cascader-multi了
```html
<template>
    <cascaderMulti @on-change="array => end_code = array" :data="end_codes" placeholder="状态码"></cascaderMulti>
</template>
<script>
    export default {
        data () {
            return {
                end_code: [],
                end_codes: []
            }
        }
    }
</script>
```

属性  |  说明  |  类型  |  默认值
:-------: | -------  |  :-------:  |  :-------:
data|用于渲染页面的数据|Array|无
value|默认已选择数据项|Array|无
multiple|是否支持多选|Boolean|false
filterable|是否支持搜索|Boolean|true
disabled|是否禁用选择器|Boolean|false
clearable|是否支持清除|Boolean|true
size|输入框大小，可选值为`large`和`small`或者不填|String|-
transfer|是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果|Boolean|false
placeholder|输入框占位符|String|-
element-id|给表单元素设置 id，详见 iView-Form 用法。|String|-
name|给表单元素设置 name，详见 iView-Form 用法。|String|-

事件  |  说明  |  返回值
:-------: | -------  |  :-------:
on-change|选择完成后的回调，返回值此时已选的数据数组|data

#### 补充说明
> - 传入data数据格式如下：
>   ```javascript
>   [
>     {
>       value: 1000,
>       label: "接通",
>       children: [{
>         label: "已报价",
>         value: 1100,
>         children: [],
>         multiple: true //可忽略项，当为true时该项为多选
>       }]
>     }
>   ]
>   ```

### 文件目录
```
.
├── README.md
├── package.json
├── webpack.config.js
├── .gitignore
├── .gitattributes
├── .babelrc
├── src
│   ├── lib
│   │   ├── components
│   │   │   ├── index.js
│   │   │   ├── cascader-multi-panel.vue
│   │   │   └── cascader-multi.vue
│   │   └── utils
│   │       └── index.js
│   └── index.js
├── dist
│   ├── cascader-multi.js
│   └── cascader-multi.js.map
```