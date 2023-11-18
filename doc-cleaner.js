import fs from 'fs';
import path from 'path';

async function deleteFolderRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    const files = await fs.promises.readdir(dirPath);

    for (const file of files) {
      const curPath = path.join(dirPath, file);
      const stats = await fs.promises.lstat(curPath);

      if (stats.isDirectory()) {
        await deleteFolderRecursive(curPath);
      } else {
        await fs.promises.unlink(curPath);
      }
    }

    await fs.promises.rmdir(dirPath);
  }
}

async function renameFilesWithDuplicatedWords(folderPath) {
  const files = await fs.promises.readdir(folderPath);

  for (const file of files) {
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const words = baseName.split('.');
    const uniqueWords = [...new Set(words)];
    const newBaseName = uniqueWords.join('.');
    const newFileName = `${newBaseName}${ext}`;
    const currentFilePath = path.join(folderPath, file);
    const newFilePath = path.join(folderPath, newFileName);

    if (currentFilePath !== newFilePath) {
      await fs.promises.rename(currentFilePath, newFilePath);
    }
  }
}

deleteFolderRecursive('./src/docs/modules')
  .then(() => {
    const filesToDelete = ['./src/docs/modules.md', './src/docs/README.md'];
    return Promise.all(filesToDelete.map((file) => fs.promises.unlink(file)));
  })
  .then(() => {
    return Promise.all([
      renameFilesWithDuplicatedWords('./src/docs/functions'),
      renameFilesWithDuplicatedWords('./src/docs/classes'),
    ]);
  })
  .catch((err) => {
    console.error(err);
  });
