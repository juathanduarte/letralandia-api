import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  // Adicionar uma nova fase ao jogo existente
  const gameId = 2; // Substitua pelo ID do jogo existente

  const newPhase = await prisma.phase.create({
    data: {
      gameId: gameId,
      words: {
        create: [
          {
            word: 'Porta',
            syllables: 'Por-ta',
            size: 5,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/porta.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/porta.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/porta.mp3',
            ),
          },
          {
            word: 'Roda',
            syllables: 'Ro-da',
            size: 4,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/roda.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/roda.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/roda.mp3',
            ),
          },
          {
            word: 'Toro',
            syllables: 'To-ro',
            size: 4,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/toro.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/toro.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/toro.mp3',
            ),
          },
          {
            word: 'Vela',
            syllables: 'Ve-la',
            size: 4,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/vela.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/vela.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/vela.mp3',
            ),
          },
          {
            word: 'Piano',
            syllables: 'Pi-a-no',
            size: 5,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/piano.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/piano.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/piano.mp3',
            ),
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
