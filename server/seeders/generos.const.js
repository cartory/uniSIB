const faker = require("faker");

const lirico = [
    ["Égloga", faker.lorem.sentence()],
    ["Elegía", faker.lorem.sentence()],
    ["Himno", faker.lorem.sentence()],
    ["Oda", faker.lorem.sentence()],
    ["Sátira", faker.lorem.sentence()],
    ["Epígrama", faker.lorem.sentence()],
    ["Madrigal", faker.lorem.sentence()],
];

const narrativo = [
    ["Novela", faker.lorem.sentence()],
    ["Cuento", faker.lorem.sentence()],
    ["Novela Corta", faker.lorem.sentence()],
    ["Leyenda", faker.lorem.sentence()],
];

const epica = [
    ["Epopeya", faker.lorem.sentence()],
    ["Poema Épico", faker.lorem.sentence()],
    ["Cantar de Gesta", faker.lorem.sentence()],
    ["Romances", faker.lorem.sentence()]
];

const dramatico = [
    ["Mayor", faker.lorem.sentence(), [
        ["Tragedia", faker.lorem.sentence()],
        ["Drama", faker.lorem.sentence()],
        ["Comedia", faker.lorem.sentence()],
    ]],
    ["Menor", faker.lorem.sentence(), [
        ["Sacremental", faker.lorem.sentence()],
        ["Sainete", faker.lorem.sentence()],
        ["Paso", faker.lorem.sentence()],
        ["Entremés", faker.lorem.sentence()],
    ]]
];

const didactido = [
    ["Ensayo", faker.lorem.sentence()],
    ["Fábula", faker.lorem.sentence()],
    ["Epístola", faker.lorem.sentence()],
    ["Diálogo", faker.lorem.sentence()],
];

const generos = [
    [
        "Lírico", faker.lorem.sentence(), lirico
    ],
    [
        "Narrativo", faker.lorem.sentence(), narrativo
    ],
    [
        "Épica", faker.lorem.sentence(), epica
    ],
    [
        "Dramático", faker.lorem.sentence(), dramatico
    ],
    [
        "Didáctico", faker.lorem.sentence(), didactido
    ]
];

module.exports = { generos };