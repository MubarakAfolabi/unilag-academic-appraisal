const fs = require("fs");
const path = require("path");
const queries = require("../prisma/queries.js");

const downloadPublicationFile = async (req, res) => {
  const publicationId = parseInt(req.params.publicationId);

  try {
    const publication = await queries.getPublication(publicationId);
    const filePath = path.join(process.cwd(), publication.filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    res.download(filePath, publication.originalName);
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { downloadPublicationFile };
