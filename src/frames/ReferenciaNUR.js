class Frame {
  constructor(nome, typeRef) {
    this.index = nome;
    this.isRefModificada = typeRef === 'W' ? 1 : 0;
    this.isRefAcessada = 1;
  }

  get classe() {
    return this.calcularClasse();
  }

  calcularClasse() {
    let classeAtual = 0;
    if (this.isRefAcessada === 0 && this.isRefModificada === 0) { classeAtual = 0 }
    if (this.isRefAcessada === 0 && this.isRefModificada === 1) { classeAtual = 1 }
    if (this.isRefAcessada === 1 && this.isRefModificada === 0) { classeAtual = 2 }
    if (this.isRefAcessada === 1 && this.isRefModificada === 1) { classeAtual = 3 }

    return classeAtual;
  }

  zerarRef() {
    this.isRefAcessada = 0;
  }

  alterarRef(typeRef) {
    this.isRefModificada = typeRef === 'W' ? 1 : this.isRefModificada;
    this.isRefAcessada = 1;
  }
}

export default Frame;