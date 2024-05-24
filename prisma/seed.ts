import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  // Primeiro, criar o jogo
  const game = await prisma.game.create({
    data: {
      type: 'Completar Letras Faltantes',
      phases: {
        create: [
          {
            words: {
              create: [
                {
                  word: 'Dado',
                  syllables: 'Da-do',
                  size: 4,
                  image: getImageBase64(
                    '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/dado.jpg',
                  ),
                },
                {
                  word: 'Lago',
                  syllables: 'La-go',
                  size: 4,
                  image: getImageBase64(
                    '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/lago.jpg',
                  ),
                },
                {
                  word: 'Pote',
                  syllables: 'Po-te',
                  size: 4,
                  image: getImageBase64(
                    '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/pote.jpg',
                  ),
                },
                {
                  word: 'Lua',
                  syllables: 'Lu-a',
                  size: 3,
                  image: getImageBase64(
                    '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/lua.jpg',
                  ),
                },
                {
                  word: 'Rato',
                  syllables: 'Ra-to',
                  size: 4,
                  image: getImageBase64(
                    '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/rato.jpg',
                  ),
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Game created:', game);
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
