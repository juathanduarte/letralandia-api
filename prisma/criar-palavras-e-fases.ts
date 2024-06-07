import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  // Adicionar uma nova fase ao jogo existente
  const gameId = 3; // Substitua pelo ID do jogo existente

  const newPhase = await prisma.phase.create({
    data: {
      gameId: gameId,
      words: {
        create: [
          {
            word: 'Estrela',
            syllables: 'Es-tre-la',
            size: 7,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/estrela.jpg',
            ),
            audioMale: null,
            audioFemale: null,
          },
          {
            word: 'Escada',
            syllables: 'Es-ca-da',
            size: 6,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/escada.jpg',
            ),
            audioMale: null,
            audioFemale: null,
          },
          {
            word: 'Caderno',
            syllables: 'Ca-der-no',
            size: 7,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/caderno.jpg',
            ),
            audioMale: null,
            audioFemale: null,
          },
          {
            word: 'Amarelo',
            syllables: 'A-ma-re-lo',
            size: 7,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/amarelo.jpg',
            ),
            audioMale: null,
            audioFemale: null,
          },
          {
            word: 'Carro',
            syllables: 'Car-ro',
            size: 5,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/carro.jpg',
            ),
            audioMale: null,
            audioFemale: null,
          },
        ],
      },
    },
  });

  console.log('New phase added:', newPhase);
}

// Função para converter arquivos para base64
function getFileBase64(filePath: string): string {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return fileBuffer.toString('base64');
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error.message);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
