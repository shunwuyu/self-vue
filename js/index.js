class SelfVue {
  constructor(options) {
    this.data = options.data || {}
    Object
      .keys(this.data)
      .forEach(key => {
        this.proxyKeys(key)
      })
    new Compile(options.el, this);
  }
  proxyKeys (key) {
    var self = this;
      Object.defineProperty(this, key, {
          enumerable: false,
          configurable: true,
          get: function getter () {
            return self.data[key];
          },
          set: function setter (newVal) {
            console.log('fff')
            self.data[key] = newVal;
          }
      });
      this.data[key] = 'fff'
  }
}
