// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Cria fases para o primeiro jogo
  await prisma.phase.createMany({
    data: [
      { gameType: 'FIRST_GAME' },
      { gameType: 'FIRST_GAME' },
      { gameType: 'FIRST_GAME' },
      { gameType: 'FIRST_GAME' },
      { gameType: 'FIRST_GAME' },
    ],
  });

  // Cria fases para o segundo jogo
  await prisma.phase.createMany({
    data: [
      { gameType: 'SECOND_GAME' },
      { gameType: 'SECOND_GAME' },
      { gameType: 'SECOND_GAME' },
      { gameType: 'SECOND_GAME' },
      { gameType: 'SECOND_GAME' },
    ],
  });

  // Cria fases para o terceiro jogo
  await prisma.phase.createMany({
    data: [
      { gameType: 'THIRD_GAME' },
      { gameType: 'THIRD_GAME' },
      { gameType: 'THIRD_GAME' },
      { gameType: 'THIRD_GAME' },
      { gameType: 'THIRD_GAME' },
    ],
  });

  // Palavras para cada fase do primeiro jogo
  const firstGameWords = [
    { word: 'maçã', incomplete: 'm çã', emoji: '🍎', phaseId: 1 },
    { word: 'banana', incomplete: 'b nana', emoji: '🍌', phaseId: 1 },
    { word: 'cereja', incomplete: 'c reja', emoji: '🍒', phaseId: 1 },
    { word: 'uva', incomplete: 'u a', emoji: '🍇', phaseId: 1 },
    { word: 'limão', incomplete: 'l mão', emoji: '🍋', phaseId: 1 },
    { word: 'laranja', incomplete: 'l ranja', emoji: '🍊', phaseId: 2 },
    { word: 'morango', incomplete: 'm rango', emoji: '🍓', phaseId: 2 },
    { word: 'abacaxi', incomplete: 'a bacaxi', emoji: '🍍', phaseId: 2 },
    { word: 'melancia', incomplete: 'm lancia', emoji: '🍉', phaseId: 2 },
    { word: 'pêssego', incomplete: 'p ssego', emoji: '🍑', phaseId: 2 },
    { word: 'tomate', incomplete: 't mate', emoji: '🍅', phaseId: 3 },
    { word: 'coco', incomplete: 'c co', emoji: '🥥', phaseId: 3 },
    { word: 'manga', incomplete: 'm nga', emoji: '🥭', phaseId: 3 },
    { word: 'kiwi', incomplete: 'k wi', emoji: '🥝', phaseId: 3 },
    { word: 'ameixa', incomplete: 'a meia', emoji: '🍈', phaseId: 3 },
    { word: 'pêra', incomplete: 'p ra', emoji: '🍐', phaseId: 4 },
    { word: 'framboesa', incomplete: 'f ramboesa', emoji: '🍇', phaseId: 4 },
    { word: 'mirtilo', incomplete: 'm rtilo', emoji: '🍇', phaseId: 4 },
    { word: 'groselha', incomplete: 'g roselha', emoji: '🍇', phaseId: 4 },
    { word: 'amora', incomplete: 'a mora', emoji: '🍇', phaseId: 4 },
    { word: 'pitanga', incomplete: 'p tanga', emoji: '🍒', phaseId: 5 },
    { word: 'carambola', incomplete: 'c rambola', emoji: '🍒', phaseId: 5 },
    { word: 'goiaba', incomplete: 'g oiaba', emoji: '🍒', phaseId: 5 },
    { word: 'jabuticaba', incomplete: 'j abuticaba', emoji: '🍒', phaseId: 5 },
    { word: 'mamão', incomplete: 'm mão', emoji: '🍒', phaseId: 5 },
  ];

  // Palavras para cada fase do segundo jogo
  const secondGameWords = [
    { word: 'cachorro', incomplete: 'c chorro', emoji: '🐶', phaseId: 6 },
    { word: 'gato', incomplete: 'g to', emoji: '🐱', phaseId: 6 },
    { word: 'rato', incomplete: 'r to', emoji: '🐭', phaseId: 6 },
    { word: 'leão', incomplete: 'l ão', emoji: '🦁', phaseId: 6 },
    { word: 'tigre', incomplete: 't gre', emoji: '🐯', phaseId: 6 },
    { word: 'elefante', incomplete: 'e lefante', emoji: '🐘', phaseId: 7 },
    { word: 'macaco', incomplete: 'm caco', emoji: '🐒', phaseId: 7 },
    { word: 'girafa', incomplete: 'g rafa', emoji: '🦒', phaseId: 7 },
    { word: 'zebra', incomplete: 'z bra', emoji: '🦓', phaseId: 7 },
    { word: 'hipopótamo', incomplete: 'h popótamo', emoji: '🦛', phaseId: 7 },
    { word: 'cavalo', incomplete: 'c valo', emoji: '🐴', phaseId: 8 },
    { word: 'porco', incomplete: 'p rco', emoji: '🐷', phaseId: 8 },
    { word: 'ovelha', incomplete: 'o velha', emoji: '🐑', phaseId: 8 },
    { word: 'galinha', incomplete: 'g linha', emoji: '🐔', phaseId: 8 },
    { word: 'pato', incomplete: 'p to', emoji: '🦆', phaseId: 8 },
    { word: 'sapo', incomplete: 's po', emoji: '🐸', phaseId: 9 },
    { word: 'cobra', incomplete: 'c bra', emoji: '🐍', phaseId: 9 },
    { word: 'jacaré', incomplete: 'j caré', emoji: '🐊', phaseId: 9 },
    { word: 'tartaruga', incomplete: 't rtaruga', emoji: '🐢', phaseId: 9 },
    { word: 'peixe', incomplete: 'p ixe', emoji: '🐟', phaseId: 9 },
    { word: 'tubarão', incomplete: 't barão', emoji: '🦈', phaseId: 10 },
    { word: 'polvo', incomplete: 'p lvo', emoji: '🐙', phaseId: 10 },
    { word: 'baleia', incomplete: 'b leia', emoji: '🐋', phaseId: 10 },
    { word: 'golfinho', incomplete: 'g lfinho', emoji: '🐬', phaseId: 10 },
    {
      word: 'estrela-do-mar',
      incomplete: 'e trela-do-mar',
      emoji: '🌟',
      phaseId: 10,
    },
  ];

  // Palavras para cada fase do terceiro jogo
  const thirdGameWords = [
    { word: 'carro', incomplete: 'c rro', emoji: '🚗', phaseId: 11 },
    { word: 'ônibus', incomplete: 'ô ibus', emoji: '🚌', phaseId: 11 },
    { word: 'bicicleta', incomplete: 'b cicleta', emoji: '🚲', phaseId: 11 },
    { word: 'avião', incomplete: 'a vão', emoji: '✈️', phaseId: 11 },
    { word: 'trem', incomplete: 't em', emoji: '🚆', phaseId: 11 },
    { word: 'moto', incomplete: 'm to', emoji: '🏍️', phaseId: 12 },
    { word: 'barco', incomplete: 'b rco', emoji: '🚤', phaseId: 12 },
    { word: 'navio', incomplete: 'n vio', emoji: '🚢', phaseId: 12 },
    {
      word: 'helicóptero',
      incomplete: 'h licóptero',
      emoji: '🚁',
      phaseId: 12,
    },
    { word: 'metrô', incomplete: 'm trô', emoji: '🚇', phaseId: 12 },
    { word: 'patinete', incomplete: 'p tnete', emoji: '🛴', phaseId: 13 },
    { word: 'patins', incomplete: 'p tins', emoji: '🛼', phaseId: 13 },
    { word: 'trator', incomplete: 't rator', emoji: '🚜', phaseId: 13 },
    { word: 'caminhão', incomplete: 'c minhão', emoji: '🚚', phaseId: 13 },
    { word: 'carroça', incomplete: 'c rroça', emoji: '🛒', phaseId: 13 },
    { word: 'bonde', incomplete: 'b nde', emoji: '🚋', phaseId: 14 },
    { word: 'foguete', incomplete: 'f guete', emoji: '🚀', phaseId: 14 },
    { word: 'submarino', incomplete: 's bmarino', emoji: '🚤', phaseId: 14 },
    { word: 'vagão', incomplete: 'v gão', emoji: '🚃', phaseId: 14 },
    { word: 'caiaque', incomplete: 'c iaque', emoji: '🚣', phaseId: 14 },
    {
      word: 'caminhonete',
      incomplete: 'c minhonete',
      emoji: '🚐',
      phaseId: 15,
    },
    {
      word: 'quadriciclo',
      incomplete: 'q uadriciclo',
      emoji: '🚲',
      phaseId: 15,
    },
    { word: 'jipão', incomplete: 'j ipão', emoji: '🚙', phaseId: 15 },
    { word: 'carreta', incomplete: 'c rreta', emoji: '🚛', phaseId: 15 },
    { word: 'hoverboard', incomplete: 'h verboard', emoji: '🛹', phaseId: 15 },
  ];

  // Insere todas as palavras no banco de dados
  await prisma.word.createMany({
    data: [...firstGameWords, ...secondGameWords, ...thirdGameWords],
  });

  console.log('Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
