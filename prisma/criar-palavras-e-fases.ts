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
            word: 'Lâmpada',
            syllables: 'Lâm-pa-da',
            size: 7,
            image: getImageBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/lampada.jpg',
            ),
          },
          {
            word: 'Coelho',
            syllables: 'Co-e-lho',
            size: 7,
            image: getImageBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/coelho.jpg',
            ),
          },
          {
            word: 'Ladrão',
            syllables: 'La-drão',
            size: 6,
            image: getImageBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/ladrao.jpg',
            ),
          },
          {
            word: 'Espelho',
            syllables: 'Es-pe-lho',
            size: 8,
            image: getImageBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/espelho.jpg',
            ),
          },
          {
            word: 'Planeta',
            syllables: 'Pla-ne-ta',
            size: 7,
            image: getImageBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/planeta.jpg',
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
