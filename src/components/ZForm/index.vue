<script>
export default {
  name: 'ZForm',
  props: {
    name: { type: String, default: 'form' },
    refName: { type: String, default: 'form' },
    Layout: Object,
    formItems: Array
  },
  data() {
    // const form = Form.create({})();
    const form = this.$form.createForm(this, { name: 'name' });
    return {
      form
    };
  },
  render(h) {
    console.log('form', this.form);
    console.log('slots', this.slots);
    console.log('this.formItems', this.formItems);

    const FormItemEl = (h, item) => {
      if (item.tag === 'a-button') {
        return h(item.tag, {
          attrs: { ...item.attrs },
          domProps: { ...item.domProps },
          on: {
            click: () => {
              this.form.validateFields((err, values) => {
                if (!err) {
                  console.log('Received values of form: ', values);
                  this.$emit('form-submit', values);
                }
              });
            }
          }
        });
      }
      console.log('value', [item.label, { rules: item.rules }]);
      return h(item.tag, {
        attrs: { ...item.attrs },
        directives: [
          {
            name: 'decorator',
            value: [item.label, { rules: item.rules }]
          }
        ]
      });
    };

    const FormItems = this.formItems.map(item =>
      h(
        'a-form-item',
        {
          attrs: {
            label: item.label
          }
        },
        [FormItemEl(h, item)]
      )
    );

    return h(
      'a-form',
      {
        ref: this.refName,
        attrs: {},
        props: {
          form: this.form
        }
      },
      FormItems
    );
  }
};
</script>
