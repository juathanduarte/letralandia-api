import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const gameId = 2;

  const newPhase = await prisma.phase.create({
    data: {
      gameId: gameId,
      words: {
        create: [
          {
            word: 'Esquilo',
            syllables: 'Es-qui-lo',
            size: 7,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/esquilo.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/esquilo.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/esquilo.mp3',
            ),
          },
          {
            word: 'Hospital',
            syllables: 'Hos-pi-tal',
            size: 8,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/hospital.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/hospital.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/hospital.mp3',
            ),
          },
          {
            word: 'Formiga',
            syllables: 'For-mi-ga',
            size: 7,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/formiga.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/formiga.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/formiga.mp3',
            ),
          },
          {
            word: 'Envelope',
            syllables: 'En-ve-lo-pe',
            size: 8,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/envelope.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/envelope.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/envelope.mp3',
            ),
          },
          {
            word: 'Bicicleta',
            syllables: 'Bi-ci-cle-ta',
            size: 9,
            image: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/images/bicicleta.jpg',
            ),
            audioMale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/male/bicicleta.mp3',
            ),
            audioFemale: getFileBase64(
              '/home/juathan-coelho-duarte/Área de trabalho/letralandia-api/prisma/audios/female/bicicleta.mp3',
            ),
          },
        ],
      },
    },
  });

  console.log('New phase added:', newPhase);
}

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
