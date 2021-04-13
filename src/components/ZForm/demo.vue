<template>
  <div class="zform-demo z-color-white">
    <a-form class="z-dark-form" :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="Note">
        <a-input v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" @click="handleSubmit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>

    <ZForm :form="form2" :form-items="formItems" class="z-dark-form" @form-submit="callback">
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" @click="handleSubmit">
          Submit
        </a-button>
      </a-form-item>
    </ZForm>
  </div>
</template>

<script>
import ZForm from './index';
export default {
  name: 'ZFormDemo',
  components: { ZForm },
  data() {
    return {
      formItems: [
        {
          label: 'name',
          tag: 'a-input',
          attrs: {
            placeholder: 'Select a option and change input text above'
          },
          rules: [{ required: true, message: 'Please input your name!' }]
        },
        {
          label: undefined,
          tag: 'a-button',
          attrs: {
            type: 'primary'
          },
          domProps: {
            innerHTML: 'submit'
          },
          on: {
            click: this.submit
          }
        }
      ],
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      form2: this.$form.createForm(this, { name: 'coordinated2' })
    };
  },
  methods: {
    callback(e) {
      console.log('callback', e);
    },
    submit(that) {
      console.log('submit', that);
      // that.form.validateFields((err, values) => {
      //   if (!err) {
      //     console.log('Received values of form: ', values);
      //   }
      // });
    },
    handleSubmit(e) {
      e.preventDefault();
      console.log('this.from', this.form);
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      });
    }
  }
};
</script>

<style></style>
