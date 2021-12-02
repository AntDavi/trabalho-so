class Frame {
  constructor(nome, ref) {
    this.index = nome;
    this.isRef = ref;
  }

  zerarRef() {
    this.isRef = 0;
  }

  alterarRef() {
    if (this.isRef === 1) {
      this.isRef = 0;
    } else if (this.isRef === 0) {
      this.isRef = 1;
    }
  }
}

export default Frame;