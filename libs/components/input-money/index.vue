<template>
  <div>
    <el-input class="c-number" :value="showValue" :placeholder="placeholder" maxlength="15"
              :readonly="readonly" :disabled="disabled" @focus="handleFocus" @blur="handleBlur"
              @input="handleInput">
      <template v-if="showUnitName" slot="append">
        {{ unitName }}
      </template>
    </el-input>
  </div>
</template>

<script>
import eventHandle from '@/lit-form/form/mixins/eventHandle'
import parseCondition from '@/lit-form/form/mixins/parse-condition'
import showTooltip from '@/lit-form/form/mixins/show-tooltip'
import isNil from 'lodash/isNil'
import isFinite from 'lodash/isFinite'
import { validCustomReg } from '@/lit-form/common/const/validate'
import formStyle from '@/lit-form/form/mixins/form-style'
export default {
  name: 'CNumber',
  mixins: [parseCondition, eventHandle, showTooltip, formStyle],
  props: {
    placeholder: {
      type: String,
      default: '请填写数字'
    },
    enableDecimal: {
      type: Boolean,
      default: false
    },
    precision: { // 小数点后位数
      type: Number,
      default: 2
    },
    enableInt: {
      type: Boolean,
      default: false
    },
    intPrecision: { //
      type: Number,
      default: 0
    },
    showThousandth: { // 是否显示千分位
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default: () => ({})
    },
    unitName: { type: String }
  },
  data() {
    const val = this.model[this.modelId]
    return {
      showValue: val,
      watchHandle: null,
      componentType: 'CNumber'
    }
  },
  computed: {
    showUnitName() {
      return this.unitName && this.unitName !== '无'
    }
  },
  created() {
    // this.model[this.modelId] = 12345.1456
    this.$on('validate', (cb) => {
      this.validate(cb)
    })
    this.initFormatVal(this.model[this.modelId])
    this.watchHandle = this.$watch(
      () => {
        return this.model[this.modelId]
      },
      (val) => {
        const fVal = parseFloat(this.getFormateVal(this.showValue), 10)
        const showNum = isFinite(fVal) ? fVal : null
        if (!isFinite(val)) {
          this.showValue = null
        } else {
          if (val !== showNum) {
            this.initFormatVal(val)
          }
        }
      }
    )
  },
  beforeDestroy() {
    this.watchHandle && this.watchHandle()
  },
  methods: {
    // 金额添加千分位
    comdify(n) {
      if (!n) return n
      const str = `${n}`.split('.')
      const re = /\d{1,3}(?=(\d{3})+$)/g
      const n1 = str[0].replace(re, '$&,')
      return str.length > 1 && str[1] ? `${n1}.${str[1]}` : `${n1}`
    },

    initFormatVal(value) {
      if (parseFloat(value).toString() === 'NaN') {
        this.showValue = ''
        this.model[this.modelId] = null
      }
      if (isFinite(value)) {
        if (isNil(value)) {
          this.showValue = value
        } else {
          const val = `${value}`
          let num = value
          if (val.length > 15) {
            if (val.indexOf('.') !== -1) {
              num = Number(val.slice(0, 15))
            } else {
              num = 999999999999999
            }
          }
          this.formateShowValue(num)
        }
      }
    },

    handleFocus(e) {
      const value = parseFloat(this.model[this.modelId])
      this.showValue = !isFinite(value) ? null : value
      this.onCustomClick(e)
    },

    handleBlur() {
      const num = parseFloat(this.showValue, 10)
      if (!isFinite(num)) {
        this.showValue = null
      } else {
        // 数字最后存小数6位，后端限制
        const pre = this.enableDecimal ? this.precision : 6
        let newVal
        if (!isNil(num) && this.enableInt) {
          newVal = this.setIntpart(num)
        } else {
          newVal = num
        }
        const val = this.roundNum(newVal, pre)
        this.model[this.modelId] = val
        this.formateShowValue(val)
      }
    },

    getFormateVal(val) {
      if (!isNil(val) && this.enableInt) {
        val = this.setIntpart(val)
      }
      if (!isNil(val) && this.enableDecimal) {
        return this.roundNum(val, this.precision)
      }
      return val
    },

    formateShowValue(num) {
      let val = `${this.getFormateVal(num)}`
      if (this.enableInt) {
        val = this.setIntpart(val)
      }
      if (this.enableDecimal) {
        let decLen = 0
        let point = ''
        let zero = ''
        if (val.indexOf('.') !== -1) {
          decLen = val.split('.')[1].length
        } else {
          point = '.'
        }
        if (decLen !== this.precision) {
          zero = new Array(this.precision - decLen).fill('0').join('')
        }

        val = this.precision === 0 ? `${val}` : `${val}${point}${zero}`
      }
      if (this.showThousandth) {
        this.showValue = this.comdify(val)
      } else {
        this.showValue = val
      }
    },

    handleInput(val) {
      //
      if (`${val}`.trim() === '') {
        this.model[this.modelId] = null
        this.showValue = null
      } else if (val.length < 16) {
        const fVal = this.getFormateVal(parseFloat(val, 10))
        this.model[this.modelId] = !isFinite(fVal) ? null : fVal
        this.showValue = val
      }
    },

    roundNum(value, n = 0) {
      return Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
    },

    setIntpart(val) {
      let newVal = ''
      const strVal = val.toString()
      if (strVal.indexOf('.') !== -1) {
        const arr = strVal.split('.')
        const intNum = arr[0].substring(0, this.intPrecision)
        newVal = `${intNum}.${arr[1]}`
      } else {
        newVal = strVal.substring(0, this.intPrecision)
      }
      return newVal
    },

    validate(cb) {
      const promise = new Promise((resolve, reject) => {
        const val = this.model[this.modelId]
        if ((!isNil(val))) {
          const validParams = {
            regArr: this.regularList,
            value: val,
            label: this.label
          }
          const { status, msg } = validCustomReg(validParams)
          if (!status) {
            reject(msg)
            return
          } else {
            resolve()
          }
        } else {
          resolve()
        }
      })
      if (typeof cb === 'function') {
        cb(promise)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
