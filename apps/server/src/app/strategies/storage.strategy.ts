export const filename = (req, file, callback) => {
  const splitFilename = file.originalname.split('.');
  const ext = splitFilename.pop();
  const normalizedName = splitFilename
    .join('.')
    .toLowerCase()
    .replace(/\s/g, '_');
  callback(null, `${Date.now()}-${normalizedName}.${ext}`);
};

export const StorageDiskStrategy = {
  destination: `${__dirname}/var/uploads`,
  filename
};

export default StorageDiskStrategy;
