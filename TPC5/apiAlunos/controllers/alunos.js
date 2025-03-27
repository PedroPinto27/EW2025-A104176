var Aluno = require('../models/aluno')

module.exports.list = () => {
    console.log("Consultando alunos na base de dados...");
    return Aluno.find().sort({ nome: 1 }).exec()
        .then(dados => {
            return dados;
        })
        .catch(err => {
            console.error("Erro ao buscar dados:", err);
            throw err;
        });
}


module.exports.findById = id => {
    return Aluno
        .findOne({_id : id})
        .exec()
}

module.exports.insert = aluno => {
    console.log(req.body);  // Verifica o conteúdo da requisição
    const alunoId = req.body.id;  // Tenta acessar o 'id' no corpo da requisição
    if (!alunoId) {
        return res.status(400).json({ message: "ID is required" });  // Verifica se 'id' foi passado
    }
    else if(Aluno.find({_id : aluno.id}).exec().length != 1){
        var newAluno = new Aluno(aluno)
        newAluno._id = aluno.id
        return newAluno.save()
    }
}

module.exports.update = (id, aluno) => {
    return Aluno.findByIdAndUpdate(id, aluno)
    .exec()
}

module.exports.delete = id => {
    return Aluno.findByIdAndDelete(id)
    .exec()
}

module.exports.inverteTpc = (id, idTpc) => {
    return Aluno
        .findOne({'_id' : id})
        .exec()
        .then (aluno => {
            var tpc = `tpc${idTpc}`
            if (aluno(tpc)) {
                aluno(tpc) = !aluno(tpc)
            }
            else {
                aluno(tpc) = true
            }
            return Aluno
                .findByIdAndUpdate(id, aluno)
                .exec()
        })
}