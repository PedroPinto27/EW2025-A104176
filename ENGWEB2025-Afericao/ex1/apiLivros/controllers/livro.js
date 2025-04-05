var Livro = require('../models/livro')

// GET /books
module.exports.getLivros = () => {
    return Livro.find().exec();
}
// GET /books/:id
module.exports.getLivroById = id => {
    return Livro.findById(id).exec();
}

// GET /books?charater=EEEE:
module.exports.getLivrosByCharacter = (character) => {
    return Livro.find({ characters: new RegExp(character, 'i') })  // 'i' para case-insensitive
                .exec();
}

// GET /books?genre=AAA
module.exports.getLivrosByGenre = (genre) => {
    return Livro.find({ genres: genre }).exec();
}

// GET /books/genres
module.exports.getGenres = () => {
    return Livro.distinct('genres')
                .sort()  // Ordena alfabeticamente
                .exec()
                .then(data => {
                    return data;
                })
                .catch(error => {
                    throw new Error('Erro ao obter géneros: ' + error.message);
                });
}

// GET /books/characters
module.exports.getCharacters = () => {
    return Livro.aggregate([
        { $unwind: "$characters" },
        { $group: { _id: "$characters" } },
        { $sort: { _id: 1 } }
    ])
    .exec()
    .then(data => {
        return data;
    })
    .catch(error => {
        throw new Error('Erro ao obter personagens: ' + error.message);
    });
}

// POST /books
module.exports.addLivro = livro => {
    return Livro.create(livro);
}

// DELETE /books/:id
module.exports.deleteLivro = id => {
    return Livro.findByIdAndDelete(id).exec();
}

// PUT /books/:id
module.exports.updateLivro = (id, livro) => {
    return Livro.findByIdAndUpdate(id, livro, { new: true }).exec();  // encontra e atualiza o livro com o ID
}

module.exports.getLivrosByAuthorId = id => {
    return Livro.find({ "author._id": id }).exec();
};
