# cascader-multi

> 基于iView-Cascader的多选级联选择器

## 用法

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

属性  |  说明  |  类型  |  默认值
:-------: | -------  |  :-------:  |  :-------:
<small>data</small>|<small>用于渲染页面的数据</small>|Array|无
disabled|是否禁用选择器|Boolean|false
clearable|是否支持清除|Boolean|true
size|输入框大小，可选值为`large`和`small`或者不填|String|-
transfer|是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果|Boolean|false
placeholder|输入框占位符|String|-
element-id|给表单元素设置 id，详见 iView-Form 用法。|String|-
name|给表单元素设置 name，详见 iView-Form 用法。|String|-

事件  |  说明  |  返回值
:-------: | -------  |  :-------:
handleChangeEndCode|选择完成后的回调，返回值此时已选的数据数组|data

#### 补充说明
> - 传入data数据格式如下：
>   ```
>   [
>       {
>           value: 1000,
>           label: '接通',
>           children: {
>             label: "已报价",
>             value: 1100,
>             children: [
>             ],
>           }
>       },
>   ]
>   ```