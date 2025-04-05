var Contrato = require('../models/contrato');

module.exports.getContratos = () => {
    return Contrato.find().exec();
}

module.exports.getContratoById = id => {
    return Contrato.findById(id).exec();
}

module.exports.getContratosByEntidade = entidade => {
    return Contrato.find({ entidade_comunicante: entidade }).exec();
}

module.exports.getContratosByTipo = tipo => {
    return Contrato.find({ tipoprocedimento: tipo }).exec();
}

module.exports.getEntidades = () => {
    return Contrato.distinct('entidade_comunicante')
        .then(d => d.sort());
}

module.exports.getTiposProcedimento = () => {
    return Contrato.distinct('tipoprocedimento')
        .then(d => d.sort());
}

module.exports.addContrato = contrato => {
    return Contrato.create(contrato);
}


module.exports.deleteContrato = id => {
    return Contrato.findByIdAndDelete(id).exec();
}

module.exports.updateContrato = (id, contrato) => {
    return Contrato.findByIdAndUpdate(id, contrato, { new: true }).exec();
}
