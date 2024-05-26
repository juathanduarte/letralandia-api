import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  // Adicionar uma nova fase ao jogo existente
  const gameId = 1; // Substitua pelo ID do jogo existente

  const newPhase = await prisma.phase.create({
    data: {
      gameId: gameId,
      words: {
        create: [
          {
            word: 'Fita',
            syllables: 'Fi-ta',
            size: 4,
            image: getImageBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/fita.jpg',
            ),
          },
          {
            word: 'Mesa',
            syllables: 'Me-sa',
            size: 4,
            image: getImageBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/mesa.jpg',
            ),
          },
          {
            word: 'Casa',
            syllables: 'Ca-sa',
            size: 4,
            image: getImageBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/casa.jpg',
            ),
          },
          {
            word: 'Tatu',
            syllables: 'Ta-tu',
            size: 4,
            image: getImageBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/tatu.jpg',
            ),
          },
          {
            word: 'Ovo',
            syllables: 'O-vo',
            size: 3,
            image: getImageBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/ovo.jpg',
            ),
          },
        ],
      },
    },
  });

  console.log('New phase added:', newPhase);
}

// Função para converter a imagem para base64
function getImageBase64(imageFilePath: string): string {
  try {
    const imageBuffer = fs.readFileSync(imageFilePath);
    return imageBuffer.toString('base64');
  } catch (error) {
    console.error('Erro ao ler a imagem:', error.message);
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
