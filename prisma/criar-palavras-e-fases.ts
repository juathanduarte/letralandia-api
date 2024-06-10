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
          // Novas palavras da Fase 5
          {
            word: 'Teclado',
            syllables: 'Te-cla-do',
            size: 7,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/teclado.jpg',
            ),
            audioMale: null,
            audioFemale: null,
          },
          {
            word: 'Tesoura',
            syllables: 'Te-sou-ra',
            size: 7,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/tesoura.jpg',
            ),
            audioMale: null,
            audioFemale: null,
          },
          {
            word: 'Médico',
            syllables: 'Mé-di-co',
            size: 6,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/medico.jpg',
            ),
            audioMale: null,
            audioFemale: null,
          },
          {
            word: 'Mochila',
            syllables: 'Mo-chi-la',
            size: 7,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/mochila.jpg',
            ),
            audioMale: null,
            audioFemale: null,
          },
          {
            word: 'Trator',
            syllables: 'Tra-tor',
            size: 6,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/trator.jpg',
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
