import models from "../../lib/models";

export default async (req, res) => {
  const {
    id,
    name,
    email,
    image,
  } = req.body;
  try {
    const updateUser = await models.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        image,
      },
    });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(403).json({ err: "Error occurred while updating user." });
  }
};