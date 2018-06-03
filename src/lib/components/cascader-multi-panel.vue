<template>
  <div class="inline">
    <ul class="ivu-cascader-menu">
      <CheckboxGroup v-model="checkBoxGroup" @on-change="handleCheckBoxChange">
        <li class="ivu-cascader-menu-item" v-for="(item, index) in data" :key="index" :class="{'ivu-cascader-menu-item-active': (!item.parentId && selected == index )|| (!multiple && selected == index)}">
          <template v-if="(item.parentId && multiple) || item.multiple">
            <Checkbox :value="checkBoxGroup.indexOf(index) >= 0" @click.native.stop="handleCheckBoxClick" :label="index" class="w-full">{{item.label}}
              <i class="ivu-icon ivu-icon-ios-arrow-right" v-if="item.children && item.children.length"></i>
            </Checkbox>
          </template>
          <template v-else>
            <p @click="handleClick(index,true)" @mouseover="handleMouseOver(index)">
              {{item.label}}
              <i class="ivu-icon ivu-icon-ios-arrow-right" v-if="item.children && item.children.length"></i>
            </p>
          </template>
        </li>
      </CheckboxGroup>
    </ul>
    <casMultiPanel :value="value" @handleGetSelected="selectedData" v-if="children.length" :data="children.length && children" :multiple="multiple" @handleClose="handleClose"></casMultiPanel>
  </div>
</template>
<script>
import Emitter from 'iview/src/mixins/emitter';
export default {
  name: "casMultiPanel",
  mixins: [Emitter],
  props: {
    // 原始数据
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    // 触发方式: click | hover
    trigger: {
      type: String
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 默认绑定的值
    value: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data() {
    return {
      // 当前已选择项
      checkBoxGroup: [],
      // 子组件数据
      children: [],
      // 单选组件被选中高亮
      selected: -1,
      // 是否触发关闭级联选择
      isClose: true
    };
  },
  watch: {
    // 重新渲染组件
    data(val) {
      this.checkBoxGroup = [];
      this.handleCheckBoxChange([]);
      this.selected = -1;
    }
  },
  methods: {
    // 鼠标移上事件
    handleMouseOver(index){
      if(this.trigger == "hover"){
        this.handleClick(index,false);
      }
    },
    // 点击最后一级,关闭级联选择器
    handleClose() {
      this.$emit('handleClose');
    },
    // 获取选择项数据
    selectedData(val = []) {
      // 获取当前组件内选择的值
      const arr = this.checkBoxGroup.map((v, k) => {
        return {
          label: this.data[v].label,
          value: this.data[v].value,
          parentId: this.data[v].parentId,
        };
      });
      // 合并子组件传递的参数,并emit到父组件
      this.$emit("handleGetSelected", arr.concat(val));
    },
    // 防止时间冒泡到父组件handleClose事件
    handleCheckBoxClick() {},
    // checkGroup变更事件,返回已选中的数组
    handleCheckBoxChange(arr, close) {
      // 清空记录
      this.children = [];
      // 遍历选择的数据
      arr.map((k, v) => {
        // 存在children字段则记录
        if (this.data[k].children && this.data[k].children.length) {
          // 记录数据并渲染到子组件
          Array.prototype.push.apply(this.children, this.data[k].children);
        } else if (!this.multiple && this.isClose && ) {
          this.handleClose();
        }
      });
      // 触发父组件emit
      this.selectedData();
    },
    // 单选组件点击事件
    handleClick(index, close) {
      this.isClose = close;
      this.selected = index;
      this.checkBoxGroup = [index];
      this.handleCheckBoxChange([index]);
    }
  },
  created() {
    // 回填数据
    this.$nextTick(_ => {
      this.value.map(v => {
        this.data.map((val, k) => {
          if (v.value !== val.value) return;
          if ((v.parentId && this.multiple) || v.multiple) {
            Array.prototype.push.apply(this.checkBoxGroup, [k]);
            this.handleCheckBoxChange(this.checkBoxGroup);
          } else {
            this.handleClick(k);
          }
        })
      })
    })
  }
};

</script>
<style>
.inline {
  display: inline-block;
}

</style>
