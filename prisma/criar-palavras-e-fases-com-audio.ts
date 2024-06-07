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
            word: 'Frango',
            syllables: 'Fran-go',
            size: 6,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/frango.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/frango.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/frango.mp3',
            ),
          },
          {
            word: 'Macaco',
            syllables: 'Ma-ca-co',
            size: 6,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/macaco.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/macaco.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/macaco.mp3',
            ),
          },
          {
            word: 'Martelo',
            syllables: 'Mar-te-lo',
            size: 7,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/martelo.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/martelo.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/martelo.mp3',
            ),
          },
          {
            word: 'Sorvete',
            syllables: 'Sor-ve-te',
            size: 7,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/sorvete.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/sorvete.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/sorvete.mp3',
            ),
          },
          {
            word: 'Elefante',
            syllables: 'E-le-fan-te',
            size: 8,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/elefante.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/elefante.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/elefante.mp3',
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
