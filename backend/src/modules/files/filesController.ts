import File from "./fileModel";

export const uploadFile = async (req: any, res: any) => {
    try {
        const { originalname, mimetype, buffer } = req.file;
        const file = new File({
            filename: originalname,
            contentType: mimetype,
            data: buffer,
            // uploadedBy: req.user._id
        });
        await file.save();
        res.status(201).json({ message: "success", file: file });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getFiles = async (req: any, res: any) => {
    try {
        // const files = await File.find({ uploadedBy: req.user._id });
        const files = await File.find();
        res.status(200).json({ files: files });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getFile = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ message: "Bad request" })
        }
        const file = await File.findById(id);
        res.status(200).json({ file: file });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteFile = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ message: "Bad request" })
        }
        await File.findByIdAndDelete(id);
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}